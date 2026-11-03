# Finland Experience Platform

Monikielinen suomalaisia matkakohteita, majoituksia ja elämyksiä esittelevä alusta. Finland Experience auttaa matkailijaa löytämään paikallisia kohteita ja palveluntarjoajia ja ohjaa varauksen palveluntarjoajan omaan kanavaan.

## Projektirakenne

```
finland-experience-platform/
├── src/
│   ├── app/                 # Next.js App Router, sivut ja API-reitit
│   ├── components/          # React-komponentit
│   ├── domain/              # Domain-logiikka
│   ├── i18n/                # FI/ES/EN-käännökset
│   ├── lib/                 # Yhteiset palvelut ja apufunktiot
│   ├── repositories/        # Tietokantakerros
│   ├── services/            # Liiketoimintalogiikka
│   └── types/               # TypeScript-tyypit
├── supabase/
│   └── migrations/           # Tietokannan ainoa migraatiolähde
├── public/                   # Staattiset resurssit
├── docs/                     # Projektin ohjeistus ja toteutussuunnitelmat
├── package.json
└── README.md
```

## Teknologiat

- Next.js 16 ja React 19
- TypeScript
- Tailwind CSS
- next-intl (suomi, espanja ja englanti)
- Supabase PostgreSQL + Auth
- Palveluntarjoajalle ohjaava varauspolku (ei omaa checkoutia)
- GitHub Actions CI

## Käyttöönotto

### Vaatimukset

- Node.js 24
- npm
- Supabase-projekti
- Palveluntarjoajien omat varaus- ja maksukanavat

### Asenna riippuvuudet

```bash
npm install
```

### Määritä ympäristömuuttujat

Kopioi `.env.example`:

```bash
cp .env.example .env.local
```

Täytä vähintään käytössä olevien palveluiden tarvittavat muuttujat.

### Käynnistä kehityspalvelin

```bash
npm run dev
```

Sovellus avautuu osoitteessa `http://localhost:3000`.

## Komennot

```bash
npm run dev         # Kehityspalvelin
npm run build       # Tuotantobuild
npm start            # Tuotantopalvelin
npm run lint        # ESLint
npm run typecheck   # TypeScript-tarkistus
npm test             # Yksikkötestit
npm run test:watch   # Testit watch-tilassa
npm run db:push      # Supabase-migraatiot
npm run db:reset     # Supabase-tietokannan nollaus
```

## Testaus ja CI

Yksikkötestit käyttävät Node.js:n natiivia test runneria ja projektissa olevaa `tsx`-riippuvuutta. Testit löytyvät hakemistosta `src/__tests__/`.

Paikalliset tarkistukset:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

GitHub Actions suorittaa lintin, TypeScript-tarkistuksen, testit ja tuotantobuildin main-haaran pushissa ja pull requesteissa. Vihreä CI-ajo todistaa koodin tarkistusten läpäisyn, ei tuotantoon julkaisua. Tuotannon julkaisualusta ja julkaistun version tarkistus kuvataan [tuotantotilanteen ja jatkotöiden tiekartassa](./docs/production-roadmap.md).

## CMS, mediat ja tapahtumasyöte

Uusien CMS-ominaisuuksien käyttöönotto edellyttää Supabase-migraatioiden ajamista ennen sovelluspäivitystä. Uusin migraatio lisää mediasisällön käyttöoikeus- ja sijaintitiedot, sivujen ajastuksen sekä tapahtumien, tapahtumapaikkojen ja syötteiden taulut. Tarkista kohdeprojekti ja migraatioiden tila ennen `npm run db:push` -komentoa.

CMS löytyy reitiltä `/admin/cms`. Sivujen editorilla voi tehdä luonnoksia, esikatsella sivuja, palauttaa tallennettuja versioita ja ajastaa julkaisuja. Kaikkien aluekohtaisten kohde- ja palveluntarjoajatietojen CMS-hallinta pitää varmistaa erikseen; lähdekoodissa olevia katalogeja ei saa olettaa CMS:n kautta hallittaviksi.

Tapahtumasyötteen käyttöönotto:

1. Lisää CMS:n Tapahtumat-näkymässä lähteen julkinen RSS- tai Atom-HTTPS-osoite sekä alue ja käyttöehtojen linkki.
2. Jätä automaattijulkaisu pois päältä, kunnes lähteen tietojen käyttö ja lisenssit on tarkistettu. Uudet tapahtumat tulevat tällöin tarkastettaviksi.
3. Cloudflare Worker tarvitsee salaisuuden `EVENT_SYNC_TOKEN`. Worker ajaa tapahtumien haun kuuden tunnin välein ja kutsuu suojattua `/api/cron/events`-reittiä.

Syötteen kuvia ei julkaista oletuksena. Automaattinen kuvien käyttö edellyttää lähteelle kirjattua lisenssiä, ja julkinen tapahtumakuva näytetään vain, kun kuvan oikeudet on merkitty tarkistetuiksi.

## Monikielisyys

Käyttöliittymä tukee seuraavia kieliä:

- 🇫🇮 Suomi: `fi`
- 🇪🇸 Espanja: `es`
- 🇬🇧 Englanti: `en`

Käännökset sijaitsevat hakemistossa `src/i18n/locales/`.

## Supabase ja tunnistautuminen

Hallintapaneeli käyttää Supabase Auth -tunnistautumista. Tuotannossa ei pidä käyttää vanhaa demo-istuntoa tai selaimen kautta asetettavaa roolieväitettä.

Lisätietoja:

- [Supabase Auth -asetukset](./docs/SUPABASE_AUTH_SETUP.md)
- [Supabase-ohje](./SUPABASE_SETUP.md)

## Varaus ja maksu

Julkinen sivusto ei myy matkapaketteja eikä käsittele asiakkaan varausta tai maksua omassa checkoutissa. Sivusto toimii inspiraatio- ja ohjauspalveluna: käyttäjä tutustuu kohteeseen ja siirtyy lopuksi suoraan palveluntarjoajan omalle sivulle, jossa varaus, sopimus ja maksu tehdään.

Projektissa on edelleen Stripeen liittyviä legacy/admin-tietorakenteita ja dokumentaatiota vanhaa maksupolkua varten. Niitä ei tule käyttää julkisessa varauspolussa ilman erillistä liiketoimintamallin muutosta.

## Tietoturva

- Palvelimen Supabase service-role -avain pidetään palvelinpuolella.
- Admin-reitit tarkistavat Supabase Auth -istunnon ja profiilin roolin.
- Kirjoitusoikeudet rajataan käyttäjän roolin perusteella.
- Julkinen varauspolku ei käsittele maksukorttitietoja.
- Mahdolliset legacy-maksutiedot käsitellään vain palvelinpuolen/admin-kontekstissa.
- Oikeat ympäristömuuttujat ja salaisuudet pidetään pois Gitistä.

## Migraatiot

Supabase CLI käyttää vain hakemistoa `supabase/migrations/`. Vanha erillinen `db/migrations/`-migraatiokokonaisuus on poistettu, jotta tietokannan lähde pysyy yksiselitteisenä.

Puhdas tietokantatarkistus tehdään paikallisessa Supabase-ympäristössä:

Supabase CLI ei ole sovelluksen asennusriippuvuus: tietokantakomennot lataavat version 1.226.4 vain silloin, kun komento suoritetaan paikallisesti. Cloudflare-sovelluksen build ei siksi suorita CLI:n GitHub-binäärilatausta.

```bash
npm run db:reset
npm run db:push
```

## Riippuvuudet

Projektissa käytetään npm:ää. Riippuvuudet tulee asentaa ja lock-tiedosto päivittää aina riippuvuuksia muutettaessa. CI käyttää Node 22:ta ja samaa npm-pohjaista asennusta.

## Reitit ja legacy-koodi

Julkisen sovelluksen ensisijaiset reitit ovat `src/app/[locale]/...`. Lokalisoimattomia vanhoja reittejä ei pidetä uutena toteutuksena; ennen poistamista ne tulee tarkistaa käytössä olevien linkkien ja redirectien osalta.

## Lisenssi

MIT License. Katso [LICENSE](./LICENSE).

---

**Finland Experience Platform 🇫🇮**
