# Finland Experience Platform

Platform suomalaisista elämyksistä ja kokemuksista.

## 📁 Projektirakenteen yleiskatsaus

```
finland-experience-platform/
├── src/                          # Next.js sovellus
│   ├── app/                      # Next.js App Router
│   ├── components/               # React-komponentit
│   ├── lib/                      # Palvelut ja apufunktiot
│   ├── repositories/             # Tietokanta-kerros
│   ├── services/                 # Liiketoimintalogiikka
│   └── types/                    # TypeScript-tyypit
├── admin_dashboard/              # Streamlit-dashboard
│   ├── app.py                    # Pääsovellus
│   ├── requirements.txt          # Python-riippuvuudet
│   └── .env.example              # Ympäristömuuttujat
├── supabase/                     # Tietokannan migraatiot
│   └── migrations/               # SQL-migraatiot
├── scripts/                      # Apuskriptit
├── public/                       # Staattiset tiedostot
├── SUPABASE_SETUP.md            # Supabase-ohje
├── STRIPE_SETUP.md              # Stripe-ohje
├── STRIPE_IMPLEMENTATION.md     # Stripe-toteutus
├── package.json                  # Next.js-riippuvuudet
└── README.md                     # Tämä tiedosto
```

## 🚀 Pika-aloitus

### Vaatimukset
- Node.js 18+
- Python 3.8+
- Supabase-projekti
- Stripe-tili (optional)

### 1. Next.js Sovellus

```bash
# Asenna riippuvuudet
npm install

# Konfiguroi ympäristö
cp .env.example .env.local
# Lisää Supabase ja Stripe -avaimet

# Käynnistä kehityspalvelin
npm run dev
```

Avautuu: **http://localhost:3000**

### 2. Streamlit Admin Dashboard

```bash
# Siirry admin_dashboard-kansioon
cd admin_dashboard

# Asenna riippuvuudet
pip install -r requirements.txt

# Konfiguroi
cp .env.example .env
# Lisää Supabase-avaimet

# Käynnistä dashboard
streamlit run app.py
```

Avautuu: **http://localhost:8501**

## 🏗️ Arkkitehtuuri

### Frontend (Next.js)
- TypeScript + React 18
- Tailwind CSS styling
- Supabase Real-time
- Stripe payment integration

### Backend (Next.js API Routes)
- Payment processing
- Webhook handling
- Database operations
- Authentication

### Database (Supabase PostgreSQL)
- Experiences & Destinations
- Bookings & Customers
- Payments & Refunds
- Reviews & Ratings

### Admin (Streamlit)
- Analytiikka ja raportointi
- Varausten hallinta
- Maksutapahtumien seuranta
- Elämysten hallinta

## 📚 Dokumentaatio

### Supabase Integraatio
👉 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- Projektipystytys
- Tietokantamallista
- Repository-kuvio
- Mock vs. Supabase

### Stripe Maksujen Integraatio
👉 [STRIPE_SETUP.md](./STRIPE_SETUP.md)
- Stripe-konfiguraatio
- Webhook-asennus
- Testikorttinumerot
- Vianmääritys

👉 [STRIPE_IMPLEMENTATION.md](./STRIPE_IMPLEMENTATION.md)
- Täydellinen toteutuskuvaus
- Maksuvirta
- Turvallisuusominaisuudet
- Seuraavat vaiheet

### Admin Dashboard
👉 [admin_dashboard/README.md](./admin_dashboard/README.md)
- Dashboard-ominaisuudet
- Käyttöönotto-ohjeet
- Teknologiapiino

## 🔑 Ympäristömuuttujat

### Frontend (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

DATABASE_MODE=mock  # tai 'supabase'
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Admin Dashboard (.env)
```
SUPABASE_URL=
SUPABASE_KEY=
```

## 📦 Teknologiat

### Frontend
- **Next.js 13** - React framework
- **TypeScript** - Kielityökalut
- **Tailwind CSS** - Styling
- **Supabase JS** - Database client
- **Stripe** - Payment processing

### Backend
- **Next.js API Routes** - Serverless functions
- **Supabase** - PostgreSQL + Auth + Real-time
- **Stripe SDK** - Payment API

### Admin
- **Streamlit** - Web framework
- **Pandas** - Data analysis
- **Plotly** - Visualizations
- **Supabase Python** - Database client

## 🗂️ Pääominaisuudet

### ✅ Valmis
- [x] Supabase integraatio
- [x] PostgreSQL-skeema
- [x] Repository-kuvio (mock & Supabase)
- [x] Stripe maksujärjestelmä
- [x] Payment Intent -virta
- [x] Webhook-käsittely
- [x] Checkout UI
- [x] Admin maksunhallinta
- [x] Streamlit-dashboard

### ⏳ Tulossa
- [ ] Email-ilmoitukset (SendGrid/Resend)
- [ ] Käyttäjäautentikointi
- [ ] Laskujen luonti
- [ ] Advanced analytiikka
- [ ] Mobile app
- [ ] Monialueiset maksut

## 🔐 Turvallisuus

✅ Backend-hintalaskenta  
✅ Webhook-allekirjoituksen tarkistus  
✅ Row-Level Security (RLS)  
✅ CORS-konfiguraatio  
✅ Environment variables  
✅ PCI-vaatimustenmukaisuus  

## 🧪 Testaus

### Frontend
```bash
npm run test
```

### Admin Dashboard
```bash
cd admin_dashboard
pytest
```

## 📊 Tietokannan kaavio

```
destinations ─┐
              ├─→ experiences ─→ bookings
destination_  │    experience_   booking_
translations  │    translations  items
              └────────────────→ reviews

availability → seasonal_pricing
             → pricing_rules
             → addons
             → inclusions
             → exclusions
             → faqs
             → experience_media → media
             → experience_tags → tags

customers → bookings
          → reviews
          
coupons

payments (Stripe) → payment_intents
```

## 🚀 Käyttöönotto

### Development
```bash
npm run dev
cd admin_dashboard && streamlit run app.py
```

### Production
```bash
npm run build
npm start

# Admin dashboard
streamlit run admin_dashboard/app.py --logger.level=error
```

## 📞 Tuki ja Yhteystiedot

- **GitHub**: [GitHub Repository](https://github.com/Tontsa128/finland-experience-platform)
- **Issues**: [GitHub Issues](https://github.com/Tontsa128/finland-experience-platform/issues)

## 📄 Lisenssit

MIT License - Katso LICENSE-tiedosto

## 🎯 Seuraavat Vaiheet

1. ✅ Supabase-tietokannan pystytys
2. ✅ Stripe-maksujärjestelmä
3. ⏳ Email-palvelu
4. ⏳ Käyttäjäautentikointi
5. ⏳ Advanced analytiikka
6. ⏳ Mobile app

---

**Kehitetty Suomalaisten elämysten alustaksi! 🇫🇮**



