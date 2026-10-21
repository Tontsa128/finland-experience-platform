import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src/app");
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) files.push(full);
  }
}

walk(root);

let changed = 0;
for (const file of files) {
  let source = fs.readFileSync(file, "utf8");
  const original = source;
  const isClient = /^\s*["']use client["'];/m.test(source);

  // Next.js 15: route params/searchParams are Promises.
  source = source.replace(/params\s*:\s*\{\s*([^{}\n]+)\s*\}/g, "params: Promise<{$1}>");
  source = source.replace(/searchParams\s*:\s*\{\s*([^{}\n]+)\s*\}/g, "searchParams: Promise<{$1}>");

  if (isClient && /\bparams\s*:\s*Promise</.test(source)) {
    if (!/\buse\s*\(/.test(source) && !/import\s*\{[^}]*\buse\b/.test(source)) {
      source = source.replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+["']react["'];/, (m, imports) => {
        if (/\buse\b/.test(imports)) return m;
        return `import { ${imports.trim()}, use } from "react";`;
      });
      if (!/\buse\b/.test(source.match(/from\s+["']react["']/)?.[0] ?? "")) {
        source = `import { use } from "react";\n${source}`;
      }
    }
    // Client components cannot await params; resolve once with React use().
    source = source.replace(/(export\s+default\s+function\s+[^\n]*\{\n)/, "$1  const resolvedParams = use(params);\n");
    source = source.replace(/\bparams\.(locale|slug|path|id)\b/g, "resolvedParams.$1");
    source = source.replace(/\bconst\s+\{\s*([^}]+)\s*\}\s*=\s*params\s*;/g, "const { $1 } = resolvedParams;");
  } else if (/\bparams\s*:\s*Promise</.test(source)) {
    // Server components and metadata functions can await the Promise.
    source = source.replace(/\bconst\s+\{\s*([^}]+)\s*\}\s*=\s*params\s*;/g, "const { $1 } = await params;");
    source = source.replace(/\bparams\.(locale|slug|path|id)\b/g, "(await params).$1");
    source = source.replace(/export\s+function\s+generateMetadata\s*\(/g, "export async function generateMetadata(");
    source = source.replace(/export\s+function\s+generateViewport\s*\(/g, "export async function generateViewport(");
    source = source.replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\(\s*\{\s*params\b/g, "export default async function $1({ params");
  }

  if (source !== original) {
    fs.writeFileSync(file, source);
    changed++;
    console.log(`repaired ${path.relative(process.cwd(), file)}`);
  }
}

console.log(`Next.js 15 async request repair changed ${changed} files.`);
