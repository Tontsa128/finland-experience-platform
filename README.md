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
│   └── migrations/           # Tietokannan migraatiot
├── scripts/                  # Testi- ja apuskriptit
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
- Stripe-maksut
- GitHub Actions CI

## Käyttöönotto

### Vaatimukset

- Node.js 18+
- npm
- Supabase-projekti
- Stripe-tili, jos maksutoimintoja käytetään

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
npm start           # Tuotantopalvelin
npm run lint        # ESLint
npm run typecheck   # TypeScript-tarkistus
npm test            # Projektin testit
npm run db:push     # Supabase-migraatiot
npm run db:reset    # Supabase-tietokannan nollaus
```

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

## Stripe

Stripe-integraatio käyttää palvelinpuolella salaista API-avainta ja webhook-allekirjoituksen tarkistusta.

Lisätietoja:

- [Stripe-asetukset](./STRIPE_SETUP.md)
- [Stripe-toteutus](./STRIPE_IMPLEMENTATION.md)

## Tietoturva

- Palvelimen Supabase service-role -avain pidetään palvelinpuolella.
- Admin-reitit tarkistavat Supabase Auth -istunnon ja profiilin roolin.
- Kirjoitusoikeudet rajataan käyttäjän roolin perusteella.
- Stripe-webhookit varmennetaan allekirjoituksella.
- Oikeat ympäristömuuttujat ja salaisuudet pidetään pois Gitistä.

## Testaus ja CI

Paikallisesti:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

GitHub Actions suorittaa projektin CI-tarkistukset myös muutosten yhteydessä.

## Lisenssi

MIT License. Katso [LICENSE](./LICENSE).

---

**Finland Experience Platform 🇫🇮**
