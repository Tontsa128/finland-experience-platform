# Supabase-asetukset

## Käytössä olevat paketit

- `@supabase/supabase-js` – Supabase-asiakas
- `@supabase/ssr` – palvelin- ja selainistuntojen käsittely
- `supabase` – Supabase CLI

## Migraatiot

Tietokannan migraatiot ovat hakemistossa `supabase/migrations/`. Suorita ne järjestyksessä:

```bash
supabase db push
```

Nykyinen kokonaisuus sisältää perusskeeman, maksukentät, CMS/SEO-rakenteet ja Supabase Auth -hallinnan.

## Ympäristömuuttujat

Kopioi ensin:

```bash
cp .env.example .env.local
```

Aseta tarvittaessa:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_MODE=mock
```

`SUPABASE_SERVICE_ROLE_KEY` on palvelinsalaisuus. Sitä ei saa käyttää selaimessa eikä julkaista Gitissä.

## Tietokantatila

`DATABASE_MODE=mock` käyttää paikallisia mock-/tiedostopohjaisia tietolähteitä kehitykseen.

`DATABASE_MODE=supabase` käyttää Supabasea.

## Admin-tunnistautuminen

Hallinta käyttää Supabase Auth -tunnistautumista. Vanhaa `demo_session`-evästettä ei enää käytetä.

Roolit ovat:

- `SUPER_ADMIN`
- `ADMIN`
- `CONTENT_MANAGER`
- `BOOKING_MANAGER`
- `EDITOR`

Lue ensimmäisen ylläpitäjän luominen ja roolien käyttöohjeesta:

[docs/SUPABASE_AUTH_SETUP.md](./docs/SUPABASE_AUTH_SETUP.md)

## Repository-kerros

Repositoryt erottavat tietokantariippuvuudet liiketoimintalogiikasta. Projektissa on sekä mock-/tiedostopohjaisia että Supabase-toteutuksia.

Esimerkki:

```ts
import { getExperienceRepository } from "@/repositories/factory";

const repository = getExperienceRepository();
const experiences = await repository.getAll();
```

## Turvallisuus

- Service-role-avain pidetään vain palvelimella.
- Julkisen selaimen Supabase-asiakkaan käytössä on vain anon-avain.
- RLS suojaa Supabase-tauluja.
- Admin-sivujen ja admin-APIen käyttö edellyttää Supabase Auth -istuntoa ja sallittua profiiliroolia.
- Tuotantoympäristössä Auth-käyttäjien luominen on rajattava tarkoituksenmukaisesti, koska admin-roolien myöntäminen tapahtuu profiilitiedon perusteella.
