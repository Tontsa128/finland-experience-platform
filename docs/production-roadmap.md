# Finland Experience – tuotantotilanne ja seuraavat vaiheet

## Käytössä

- FI/ES/EN CMS kohteille, majoituksille ja kokemuksille.
- Supabase Auth + roolipohjainen admin-hallinta.
- Supabase Storage -mediakirjasto ja palvelinpuolen upload.
- Provider-verkosto, toimituksellinen Verified-tarkistus ja partner-portaali.
- Liidien CRM ja partner-kohtainen liidien käsittely.
- AI Travel Advisor ja Concierge, jotka käyttävät vain julkaistua ja varmennettua katalogia.
- Trip Planner / Concierge-polku ja liidien tallennus.
- Julkinen sisältö, sitemap, robots ja monikielinen SEO-rakenne.
- Suora palveluntarjoajavaraus: alusta ei käsittele asiakkaan maksua eikä tee pakettimatkavarausta.

## Seuraavat tekniset hardening-vaiheet

1. Aja tuotannon Supabase-migraatiot loppuun ja varmista niiden tila.
2. Aseta Verceliin tuotannon Supabase- ja OpenAI-ympäristömuuttujat.
3. Testaa FI/ES/EN asiakaspolut sekä admin- ja partner-roolit tuotannossa.
4. Suorita Lighthouse-, Core Web Vitals-, saavutettavuus- ja mobiilitestaus.
5. Lisää tarvittaessa JSON-LD-strukturoidut tiedot tärkeimmille sisältösivuille.
6. Lisää GDPR-suostumus ennen analytiikka- ja markkinointiskriptejä.
7. Lisää sähköposti-/WhatsApp-ilmoitukset liideille.
8. Pidä Next.js-päivitys erillisenä hallittuna migraationa.
