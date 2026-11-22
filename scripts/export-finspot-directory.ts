import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { saloProviders } from '../src/lib/salo.ts';
import { naantaliProviders } from '../src/lib/naantali.ts';
import { kimitoonProviders } from '../src/lib/kimitoon-providers.ts';

const SOURCE_PROJECT = 'Tontsa128/finland-experience-platform';
const SEASONS = ['kevat', 'kesa', 'syksy', 'talvi'];

function cleanText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function safeHttps(value: unknown): string {
  const text = cleanText(value);
  try {
    const parsed = new URL(text);
    return parsed.protocol === 'https:' ? parsed.toString() : '';
  } catch {
    return '';
  }
}

function localizedText(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .map(([locale, text]) => [locale, cleanText(text)])
      .filter(([, text]) => Boolean(text)),
  );
}

function categoryForSalo(category: string, name: string): string {
  if (category === 'stay') return 'majoitus';
  if (category === 'food') return 'ruoka';
  if (/sauna/i.test(name)) return 'sauna';
  return 'luonto';
}

function categoryForNaantali(category: string, name: string): string {
  if (category === 'stay') return 'majoitus';
  if (category === 'food') return 'ruoka';
  if (/sauna/i.test(name)) return 'sauna';
  return 'luonto';
}

function categoryForKimitoon(categories: string[], tags: string[], name: string): string {
  if (categories.includes('majoitus')) return 'majoitus';
  if (categories.includes('ruoka')) return 'ruoka';
  if (tags.some((tag) => /sauna|spa/i.test(tag)) || /sauna/i.test(name)) return 'sauna';
  return 'luonto';
}

function buildRecord(input: {
  sourceId: string;
  region: 'rannikko';
  municipality: string;
  name: Record<string, string>;
  description: Record<string, string>;
  bookingUrl: string;
  sourceUrl: string;
  imageUrl?: string;
  imageCredit?: string;
  imageSourceUrl?: string;
  category: string;
}) {
  const fiTitle = input.name.fi || input.name.en || input.name.es || '';
  const fiDescription = input.description.fi || input.description.en || input.description.es || '';
  const bookingUrl = safeHttps(input.bookingUrl);
  if (!fiTitle || !fiDescription || !bookingUrl) return null;

  const sourceUrl = safeHttps(input.sourceUrl) || bookingUrl;
  const imageUrl = safeHttps(input.imageUrl);
  const imageCredit = cleanText(input.imageCredit);
  const imageSourceUrl = safeHttps(input.imageSourceUrl) || sourceUrl;

  return {
    source_project: SOURCE_PROJECT,
    source_record_id: input.sourceId,
    source_url: sourceUrl,
    owner_id: null,
    region: input.region,
    category: input.category,
    seasons: SEASONS,
    municipality: input.municipality,
    title: { ...input.name, fi: fiTitle },
    description: { ...input.description, fi: fiDescription },
    opening_hours: {},
    booking_url: bookingUrl,
    tier: 'basic',
    status: 'draft',
    verified_at: null,
    media: imageUrl && imageCredit ? [{
      source_media_id: `${input.sourceId}:image:0`,
      image_url: imageUrl,
      image_credit: imageCredit,
      source_url: imageSourceUrl,
      sort_order: 0,
      overlay_title: {},
      overlay_badge: {},
      overlay_position: 'bottom-left',
      copyright_confirmed: false,
    }] : [],
  };
}

async function main() {
const records = [];
for (const provider of saloProviders) {
  const name = { fi: cleanText(provider.name) };
  const record = buildRecord({
    sourceId: `salo:${provider.id}`,
    region: 'rannikko',
    municipality: 'Salo',
    name,
    description: localizedText(provider.description),
    bookingUrl: provider.url,
    sourceUrl: provider.url,
    imageUrl: provider.image,
    imageCredit: provider.imageCredit,
    imageSourceUrl: provider.imageSource || provider.url,
    category: categoryForSalo(provider.category, provider.name),
  });
  if (record) records.push(record);
}

for (const provider of naantaliProviders) {
  const record = buildRecord({
    sourceId: `naantali:${provider.id}`,
    region: 'rannikko',
    municipality: 'Naantali',
    name: { fi: cleanText(provider.name) },
    description: localizedText(provider.description),
    bookingUrl: provider.url,
    sourceUrl: provider.url,
    imageUrl: provider.image,
    imageCredit: provider.imageCredit,
    imageSourceUrl: provider.url,
    category: categoryForNaantali(provider.category, provider.name),
  });
  if (record) records.push(record);
}

for (const provider of kimitoonProviders) {
  if (provider.categories.includes('tapahtumat')) continue;
  const localizedName = localizedText(provider.name);
  const name = { fi: localizedName.fi || localizedName.en || localizedName.es || '' };
  const record = buildRecord({
    sourceId: `kimitoon:${provider.id}`,
    region: 'rannikko',
    municipality: 'Kemiönsaari',
    name,
    description: localizedText(provider.description),
    bookingUrl: provider.websiteUrl,
    sourceUrl: provider.sourceUrl,
    imageUrl: provider.image,
    imageCredit: provider.imageCredit,
    imageSourceUrl: provider.imageSource || provider.sourceUrl,
    category: categoryForKimitoon(provider.categories, provider.tags, name.fi || ''),
  });
  if (record) records.push(record);
}

const unique = new Map();
for (const record of records) {
  const title = (record.title.fi || '').normalize('NFKC').toLocaleLowerCase('fi').trim().split(' ').filter(Boolean).join(' ');
  const key = `${record.municipality}| ${title}|${record.booking_url}`.toLocaleLowerCase('fi');
  if (!unique.has(key)) unique.set(key, record);
}

const output = {
  source_project: SOURCE_PROJECT,
  generated_at: new Date().toISOString(),
  import_policy: {
    status: 'draft',
    verified_at: null,
    owner_id: null,
    missing_translations: 'left empty; no automatic translations are invented',
    images: 'imported with copyright_confirmed=false and require administrator review',
    prices_and_opening_hours: 'not imported unless represented by dedicated Finspot fields',
    events: 'excluded from the destination listing import',
  },
  summary: {
    salo_source_records: saloProviders.length,
    naantali_source_records: naantaliProviders.length,
    kimitoon_source_records: kimitoonProviders.length,
    exported_unique_listings: unique.size,
    listings_with_reviewable_images: [...unique.values()].filter((record) => record.media.length > 0).length,
  },
  listings: [...unique.values()],
};

const outputPath = resolve('data/finspot-directory-export.json');
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
console.log(JSON.stringify(output.summary));
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
