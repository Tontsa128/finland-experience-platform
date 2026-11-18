import { passesSlideImageFilters } from "./lib/slide-image-filters.mjs";
import fs from "node:fs/promises";
const API = "https://commons.wikimedia.org/w/api.php";
const USER_AGENT = "FinlandExperienceSlideCurator/1.0 (homepage editorial review)";
const briefs = JSON.parse(await fs.readFile("data/slide-briefs.json", "utf8"));
const prompt = await fs.readFile("scripts/prompts/slide-image-judge.md", "utf8");
await fs.mkdir("reports", { recursive: true });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function commons(params) {
  const url = new URL(API);
  for (const [key, value] of Object.entries({ format: "json", ...params })) url.searchParams.set(key, String(value));
  let attempt = 0;
  while (true) {
    const response = await fetch(url, { headers: { "User-Agent": USER_AGENT, Accept: "application/json" } });
    if (response.status === 429 || response.status >= 500) {
      if (attempt++ >= 5) throw new Error("Commons API failed: HTTP " + response.status);
      await sleep(Math.min(30000, 1000 * 2 ** attempt));
      continue;
    }
    if (!response.ok) throw new Error("Commons API failed: HTTP " + response.status);
    await sleep(300);
    return response.json();
  }
}
function metaText(info, key) {
  return String(info.extmetadata?.[key]?.value ?? "").replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").trim();
}
async function searchTitles(brief) {
  const terms = [...new Set(brief.searchTerms ?? brief.aliases.flatMap((place) => brief.mustShow.map((subject) => place + " " + subject)).slice(0, 8))].slice(0, 8);
  const found = new Set();
  for (const term of terms) {
    const data = await commons({ action: "query", generator: "search", gsrsearch: term, gsrnamespace: 6, gsrlimit: 30, prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: 1280 });
    for (const page of Object.values(data.query?.pages ?? {})) found.add(page.title);
  }
  for (const alias of brief.aliases) {
    const categories = await commons({ action: "query", list: "allcategories", acprefix: alias, aclimit: 8 });
    for (const category of categories.query?.allcategories ?? []) {
      const data = await commons({ action: "query", generator: "categorymembers", gcmtitle: "Category:" + category["*"], gcmtype: "file", gcmlimit: 30, prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: 1280 });
      for (const page of Object.values(data.query?.pages ?? {})) found.add(page.title);
    }
  }
  return [...found];
}
async function fetchInfo(title) {
  const data = await commons({ action: "query", titles: title, prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: 1280 });
  return Object.values(data.query?.pages ?? {})[0]?.imageinfo?.[0];
}
async function judge(brief, info, slideId) {
  const key = process.env.OPENAI_API_KEY, model = process.env.OPENAI_VISION_MODEL;
  if (!key || !model) throw new Error("Set OPENAI_API_KEY and OPENAI_VISION_MODEL.");
  const content = [
    { type: "input_text", text: JSON.stringify({ slideId, copy: brief.copy, brief, imageTitle: info.title, imageDescription: metaText(info, "ImageDescription"), task: prompt }) },
    { type: "input_image", image_url: info.thumburl, detail: "high" }
  ];
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
    body: JSON.stringify({ model, input: [{ role: "user", content }] })
  });
  if (!response.ok) throw new Error("Vision API failed: HTTP " + response.status + " " + (await response.text()).slice(0, 500));
  const body = await response.json();
  const output = body.output_text ?? body.output?.flatMap((item) => item.content ?? []).find((item) => item.type === "output_text")?.text;
  if (!output) throw new Error("Vision model returned no output_text.");
  const json = output.match(/\{[\s\S]*\}/)?.[0];
  if (!json) throw new Error("Vision model did not return JSON.");
  return JSON.parse(json);
}
const allCandidates = [], used = new Set(), summary = [];
for (const [id, brief] of Object.entries(briefs)) {
  console.log("Curating " + id + "...");
  const titles = await searchTitles(brief), candidates = [];
  for (const title of titles) {
    const info = await fetchInfo(title);
    if (passesSlideImageFilters(info, brief) && !used.has(info.thumburl)) candidates.push({ title, info });
  }
  const judged = [];
  for (const candidate of candidates.slice(0, 8)) {
    const info = candidate.info, verdict = await judge(brief, info, id);
    const row = {
      slideId: id, title: candidate.title, thumbUrl: info.thumburl,
      sourcePage: info.descriptionurl, width: info.width, height: info.height,
      author: metaText(info, "Artist"), license: metaText(info, "LicenseShortName"),
      verdict,
      qualifies: Number(verdict.score) >= 8 && verdict.verdict === "use" && verdict.seasonOk === true &&
        brief.mustShow.every((item) => verdict.mustShow?.some((entry) => entry.item === item && entry.visible === true))
    };
    judged.push(row); allCandidates.push(row);
  }
  judged.sort((a, b) => Number(b.verdict.score) - Number(a.verdict.score));
  const winner = judged.find((row) => row.qualifies);
  if (winner) used.add(winner.thumbUrl);
  summary.push({ id, status: winner ? "candidate_ready_for_human_review" : "needs_better_image", winner: winner ?? null, top: judged.slice(0, 3) });
}
await fs.writeFile("reports/slide-image-candidates.json", JSON.stringify({ generatedAt: new Date().toISOString(), slides: summary, candidates: allCandidates }, null, 2));
const lines = ["# Homepage slide image curation report", "", "Generated: " + new Date().toISOString(), "", "> Candidates are not published. A human must inspect each image and approve it in the CMS.", ""];
for (const item of summary) {
  lines.push("## " + item.id + " — " + item.status, "");
  for (const row of item.top) {
    lines.push("### Score " + row.verdict.score + "/10 — " + row.verdict.verdict, "");
    lines.push("![Candidate](" + row.thumbUrl + ")", "");
    lines.push("- What is visible: " + row.verdict.sees);
    lines.push("- Why: " + row.verdict.why);
    lines.push("- Unsupported claims: " + ((row.verdict.unsupportedClaims ?? []).join(", ") || "none reported"));
    lines.push("- Author: " + row.author);
    lines.push("- License: " + row.license);
    lines.push("- [Wikimedia source](" + row.sourcePage + ")", "");
  }
  if (!item.top.length) lines.push("No candidates passed metadata filters.", "");
}
await fs.writeFile("reports/slide-image-report.md", lines.join("\n"));
console.log("Wrote report for " + summary.length + " slides.");
