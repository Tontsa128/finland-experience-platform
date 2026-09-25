# Stripe-asetukset

## Riippuvuudet

Projektissa käytetään:

- `stripe` – palvelinpuolen Stripe SDK
- `@stripe/stripe-js` – selaimen Stripe-kirjasto

React Stripe Elements -pakettia ei ole tällä hetkellä mukana, joten dokumentaatio ei väitä sen olevan asennettuna.

## Ympäristömuuttujat

Aseta tarvittaessa `.env.local`-tiedostoon:

```text
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Salaisia avaimia ei saa julkaista Gitissä.

## Käyttöönotto

```bash
npm install
npm run dev
```

Stripe CLI:n avulla webhookeja voi testata paikallisesti:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Maksuvirta

1. Asiakas aloittaa varauksen.
2. Palvelin laskee hinnan.
3. Palvelin luo Stripe Payment Intentin.
4. Asiakas vahvistaa maksun selaimessa.
5. Stripe lähettää webhook-tapahtuman.
6. Palvelin tarkistaa webhookin allekirjoituksen ja päivittää varauksen.

## Turvallisuus

- Hintaa ei pidä hyväksyä selaimesta sellaisenaan.
- Webhookit varmennetaan `STRIPE_WEBHOOK_SECRET`-avaimella.
- Stripe-palvelimen salainen avain pidetään vain palvelimella.
- Korttitietoja ei tallenneta tähän sovellukseen.

## Testaus

Testaa ennen tuotantoon siirtymistä:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```
