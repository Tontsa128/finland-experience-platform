# Stripe-toteutus

Stripe-integraation palvelinpuolen toteutus sijaitsee pääasiassa seuraavissa tiedostoissa:

- `src/lib/stripe.ts` – Stripe-asiakkaan alustaminen
- `src/services/payment.service.ts` – maksuihin liittyvä liiketoimintalogiikka
- `src/app/api/checkout/create-payment-intent/` – Payment Intent -rajapinta
- `src/app/api/webhooks/stripe/` – Stripe-webhookit
- `src/app/api/bookings/refund/` – hyvitysten käsittely
- `supabase/migrations/0002_add_payment_fields.sql` – maksuihin liittyvät tietokantakentät

## Tärkeät periaatteet

### Palvelin laskee hinnan

Maksun määrää ei pidä ottaa luotettuna arvona selaimelta. Palvelin laskee lopullisen hinnan ennen Payment Intentin luomista.

### Webhookin varmennus

Stripe-webhookin allekirjoitus tarkistetaan ennen tapahtuman käsittelyä. Ilman kelvollista `STRIPE_WEBHOOK_SECRET`-avainta webhookia ei pidä hyväksyä.

### Maksutilan päivitys

Maksun onnistuminen välitetään tietokantaan Stripe-tapahtuman perusteella. Näin selain ei yksin päätä, että varaus on maksettu.

## Tuotantoon siirtyminen

1. Määritä tuotannon Stripe-avaimet palveluntarjoajan salaisuuksiksi.
2. Määritä tuotannon webhook-osoite.
3. Suorita Supabase-migraatiot.
4. Testaa onnistunut, epäonnistunut ja hyvitetty maksu.
5. Tarkista lokit ja webhookien toimitukset.
6. Aja ennen julkaisua `npm run lint`, `npm run typecheck`, `npm test` ja `npm run build`.
