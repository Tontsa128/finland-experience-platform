# Finland Experience Platform

Monikielinen suomalaisia matkakohteita, majoituksia ja elämyksiä esittelevä alusta.

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
├── docs/                     # Projektin ohjeistus
├── package.json
└── README.md
```

## Teknologiat

- Next.js 14 ja React 18
- TypeScript
- Tailwind CSS
- next-intl (suomi, espanja ja englanti)
- Supabase PostgreSQL + Auth
- Palveluntarjoajalle ohjaava varauspolku (ei omaa checkoutia)
- GitHub Actions CI

## Käyttöönotto

### Vaatimukset

- Node.js 20 LTS
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
npm test             # TypeScript-yksikkötestit
npm run test:watch   # Testit watch-tilassa
npm run db:push      # Supabase-migraatiot
npm run db:reset     # Supabase-tietokannan nollaus
```

## Testaus ja CI

Yksikkötestit käyttävät Node.js:n natiivia test runneria ja projektissa jo olevaa `tsx`-riippuvuutta. Testit löytyvät hakemistosta `src/__tests__/`.

Paikallinen tarkistus:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

GitHub Actions suorittaa samat neljä tarkistusta jokaisella main-haaran pushilla ja pull requestilla.

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

Projektissa on edelleen Stripeen liittyviä legacy/admin-tietorakenteita ja dokumentaatiota vanhaa maksupolkua varten. Niitä ei tule käyttää julkisessa varauspolussa ilman erillistä käyttöönottoa ja liiketoimintamallin muutosta.

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

```bash
supabase db reset
supabase db push
```

## Riippuvuudet

Projektissa käytetään npm:ää. Riippuvuudet tulee asentaa ja lock-tiedosto päivittää aina riippuvuuksia muutettaessa. CI käyttää Node 20 LTS:ää ja samaa npm-pohjaista asennusta.

## Reitit ja legacy-koodi

Julkisen sovelluksen ensisijaiset reitit ovat `src/app/[locale]/...`. Lokalisoimattomia vanhoja reittejä ei pidetä uutena toteutuksena; ennen poistamista ne tulee tarkistaa käytössä olevien linkkien ja redirectien osalta.

## Lisenssi

MIT License. Katso [LICENSE](./LICENSE).

---

**Finland Experience Platform 🇫🇮**
