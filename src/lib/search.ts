const synonymGroups: Record<string, string[]> = {
  sauna: ["sauna", "saun", "saunat", "saunominen", "savusauna", "loyly", "smoke", "steam", "bano"],
  wellbeing: ["wellbeing", "wellness", "hyvinvointi", "massage", "hieronta", "yoga", "jooga", "relaxation", "recovery", "spa"],
  food: ["food", "ruoka", "ravintola", "ravintolat", "kahvila", "kahvilat", "restaurant", "restaurants", "cafe", "cafes", "gastronomia", "comida", "restaurante"],
  cruise: ["cruise", "risteily", "risteilyt", "veneily", "vene", "purjehdus", "saaristo", "archipelago", "archipielago", "island", "islands", "boat", "boating", "sailing", "barco", "navegacion"],
  hiking: ["nature", "luonto", "retkeily", "vaellus", "hiking", "trail", "outdoors", "naturaleza", "senderismo", "forest", "metsa"],
  culture: ["culture", "kulttuuri", "museo", "museum", "historia", "history", "heritage", "ruukki", "cultura"],
  stay: ["stay", "majoitus", "majoitukset", "alojamiento", "accommodation", "hotel", "hotellit", "cabin", "cottage", "mokki", "guesthouse"],
  event: ["event", "events", "tapahtuma", "tapahtumat", "evento", "eventos"],
};
const tokenToGroup = new Map<string, string>();
for (const [group, aliases] of Object.entries(synonymGroups)) {
  for (const alias of aliases) {
    for (const token of normalizeSearchText(alias).split(" ")) {
      if (token.length > 1) tokenToGroup.set(token, group);
    }
  }
}
const ignoredQueryTokens = new Set(["and", "the", "for", "with", "from", "near", "in", "at", "on", "to", "by", "of", "ja", "tai", "sekä", "de", "del", "la", "el", "los", "las", "y", "en", "con", "para", "por"]);
export function normalizeSearchText(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
function valuesToTokens(values: readonly unknown[]): string[] {
  return normalizeSearchText(values.flat(Infinity).filter((value): value is string | number => typeof value === "string" || typeof value === "number").join(" ")).split(" ").filter(Boolean);
}
function tokenMatches(queryToken: string, haystackTokens: string[]): boolean {
  const group = tokenToGroup.get(queryToken);
  const candidates = group ? synonymGroups[group].flatMap((alias) => normalizeSearchText(alias).split(" ")) : [queryToken];
  return haystackTokens.some((haystackToken) => candidates.some((candidate) => haystackToken === candidate || (candidate.length >= 3 && haystackToken.startsWith(candidate)) || (haystackToken.length >= 4 && candidate.startsWith(haystackToken))));
}
/** Every meaningful query word must match, with accent-insensitive and multilingual aliases. */
export function matchesSearchQuery(query: string, searchableValues: readonly unknown[]): boolean {
  const queryTokens = normalizeSearchText(query).split(" ").filter((token) => token.length > 1 && !ignoredQueryTokens.has(token));
  if (queryTokens.length === 0) return true;
  const haystackTokens = valuesToTokens(searchableValues);
  return queryTokens.every((token) => tokenMatches(token, haystackTokens));
}
/** A service filter may match either the formal category or the item's actual searchable features. */
export function matchesServiceFilter(service: string, category: string | readonly string[], searchableValues: readonly unknown[]): boolean {
  const categoryTokens = valuesToTokens(Array.isArray(category) ? category : [category]);
  const searchableTokens = valuesToTokens(searchableValues);
  const requestedTokens = normalizeSearchText(service).split(" ").filter(Boolean);
  if (requestedTokens.length === 0) return true;
  return requestedTokens.every((token) => tokenMatches(token, [...categoryTokens, ...searchableTokens]));
}
export function matchesServiceFilters(services: readonly string[], category: string | readonly string[], searchableValues: readonly unknown[]): boolean {
  return services.every((service) => matchesServiceFilter(service, category, searchableValues));
}
