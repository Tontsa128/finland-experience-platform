# Supabase-asetukset

## Käytössä olevat paketit

- `@supabase/supabase-js` – palvelinpuolen Supabase-asiakas
- `@supabase/ssr` – Auth-istuntojen käsittely
- `supabase` – Supabase CLI

## Migraatiot

Tietokannan migraatiot ovat hakemistossa `supabase/migrations/`. Suorita ne järjestyksessä:

```bash
supabase db push
```

Nykyinen schema sisältää CMS-sisällöt, asiakas-/admin-tunnistautumisen, palveluntarjoajat, varmennukset, liidit, partner-portaalin ja Concierge-metatiedot.

## Ympäristömuuttujat

Kopioi ensin:

```bash
cp .env.example .env.local
```

Aseta vähintään:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

AI-toimintoja varten:

```text
OPENAI_API_KEY=
OPENAI_TRANSLATION_MODEL=gpt-5.6-luna
OPENAI_ADVISOR_MODEL=
```

`SUPABASE_SERVICE_ROLE_KEY` ja `OPENAI_API_KEY` ovat palvelinsalaisuuksia. Niitä ei saa käyttää selaimessa eikä julkaista Gitissä.

## Tietokantamalli

Tuotantokoodi käyttää Supabasea. Vanha mock-/tiedostopohjainen tietokantakerros on poistettu käytöstä.

## Admin-tunnistautuminen

Hallinta käyttää Supabase Auth -tunnistautumista. Roolit ovat:

- `SUPER_ADMIN`
- `ADMIN`
- `CONTENT_MANAGER`
- `BOOKING_MANAGER`
- `EDITOR`

Admin-API:t tarkistavat Auth-istunnon ja roolin ennen palvelinpuolen service-role-operaatioita.

Ensimmäisen ylläpitäjän luominen ja roolien hallinta on kuvattu tiedostossa `docs/SUPABASE_AUTH_SETUP.md`.

## Turvallisuus

- Service-role-avain pidetään vain palvelimella.
- Julkisen selaimen Supabase-asiakas käyttää publishable/anon-avainta.
- RLS suojaa julkisia Supabase-tauluja.
- Julkinen liidien lähetys tapahtuu vain palvelin-API:n kautta.
- Partnerit näkevät vain omaan palveluntarjoajaansa liittyvät liidit.
- Provider-varmennus on Finland Experience Platformin oma toimituksellinen tarkistus, ei viranomaissertifikaatti.
