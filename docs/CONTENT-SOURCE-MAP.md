# Sisältölähteiden kartta

Päivitetty 3.11.2026. Kartta kuvaa koodista tarkistetut julkisen sisällön lähteet ja erottaa ne CMS:n sekä kumppanirekisterin rooleista. Se on lähtötilanne ennen palveluntarjoajakatalogien CMS-kytkentää.

## Keskeinen havainto

Julkisen sivuston alueoppaat ja palveluntarjoajakatalogit eivät vielä muodosta yhtä hallittavaa sisältölähdettä. Yleiset kohteet, majoitukset ja elämykset luetaan Supabasesta julkaisurajapintojen kautta, mutta Salo- ja Kemiönsaari-oppaiden merkittävä sisältö on TypeScript-tiedostoissa. Supabasen `providers`-taulu palvelee suojattua kumppani- ja liiditoiminnallisuutta; nykyisen julkisen Salo- tai Kemiönsaari-katalogin sivut eivät lue listauksiaan siitä.

Tästä seuraa ylläpitoriski: julkisen profiilin muutos voi vaatia koodimuutoksen, ja saman yrityksen tiedot voivat esiintyä eri järjestelmissä eri tarkoituksiin.

## Julkisen sisällön lähteet nykytilassa

| Sisältö | Nykyinen lähde | Julkisen näkymän toteutus | CMS-yhteys |
| --- | --- | --- | --- |
| Yleiset kohdesivut | Supabasen `destinations` + käännös/media-taulut; osalle staattinen fallback tiedostossa `src/lib/data.ts` | `getPublishedDestinations()`, jonka perusteella kohdesivu muodostetaan | Kyllä, CMS- ja julkaisutietoihin kytketty; fallback voi kuitenkin esittää sisältöä ilman CMS-riviä |
| Majoitukset | Supabasen `properties` ja niihin liittyvät käännös/media-rivit; koodissa fallback-aineisto | `getPublishedProperties()`, majoitushakemisto ja detail-reitti | Kyllä, CMS-polku on olemassa; fallbackin ja tuotantodatan suhde pitää säilyttää näkyvänä |
| Elämykset | Supabasen `experiences`, kategoriat, käännökset ja media; lisäksi Salo-elämyksillä oma fallback | `getPublishedExperiences()`; osa oppaista käyttää Salo-kohtaista dataa | Osittain; tarkista erikseen, milloin fallback tulee käyttöön |
| Blogi, navigaatio, bannerit ja asetukset | Supabase-taulut kuten `blog_posts`, `site_navigation`, `site_banners` ja `site_settings` | `src/lib/public-content.ts` | Kyllä, niille on omat CMS/API-polut |
| Salo-alueet ja palvelut | `src/lib/salo.ts`, `src/lib/salo-areas.ts`, `src/lib/salo-categories.ts` sekä kuvakirjasto | Salo-kylä-, alue- ja kategoriakomponentit suodattavat näitä koodivakioita | Ei julkisen listausdatan osalta |
| Kemiönsaaren palvelut | `src/lib/kimitoon-providers.ts` | `KimitoonGuide`, kategoriakortit ja yleinen provider-detail-reitti | Ei julkisen listausdatan osalta |
| Palveluntarjoajan julkinen profiili | Salo- ja Kemiönsaari-katalogit sekä provider-detail-sivun aluekohtainen esityskoodi | `/[locale]/providers/[slug]` | Ei tällä hetkellä yhdenmukainen CMS-lukupolku |
| Tapahtumat | Supabasen CMS-tapahtuma- ja syötetiedot | tapahtumahallinta ja julkiset tapahtumatoiminnot | Kyllä, automaattisyötteiden julkaisu edellyttää tarkistusta |

## Koodista tarkistetut esimerkit

- `/[locale]/salo` ohjaa kanoniseen kylähakemistoon `/[locale]/salo/kylat`. Etusivun Salo-kortti vie tähän kylähakemistoon. Kyläkortit avaavat saman `/[locale]/salo/[area]`-alueoppaan ja sen palvelukategoriat; Mathildedal käyttää nyt samaa reittiä kuin muut alueet. Alueiden reitit käyttävät `saloProviders`-, `areaProviderIds`- ja `saloCategoryCopy`-vientejä suoraan.
- Salon kategoriakomponentti suodattaa `saloProviders`-taulukkoa alue- ja kategoriatunnisteilla. Sen julkinen korttilista ei hae Supabasen `providers`-taulua.
- Kemiönsaaren kategoriaroute renderöi `KimitoonGuide`-näkymän. Katalogi on `kimitoonProviders`-taulukossa, johon on tallennettu kieliversiot, lähde-URL:t, kuva- ja krediittitiedot sekä yhteystietoja.
- Yleinen kohdedetail käyttää `getPublishedDestinations()`-funktiota ja staattisia fallback-kohteita. Kemiönsaari käsitellään reitillä erikoistapauksena.
- `getPublishedExperiences()`- ja `getPublishedProperties()`-funktiot lukevat Supabasesta julkaistuja tietueita, mutta fallback-dataa on olemassa. Julkaisupolun pitää siksi kertoa selvästi, näytetäänkö tietokantasisältöä vai fallbackia.
- `src/app/api/admin/providers/route.ts` tarkistaa admin-roolin ja hakee suojatun provider-taulun. Migraatio `0014_provider_network_and_leads.sql` luo yritystiedot, yhteystiedot, FI/ES/EN-kuvaukset, kategoriat sekä liidien yhteydet. Migraatio `0030_protect_provider_directory.sql` estää suorat julkiset taululukemat.
- CMS:n kohde- ja mediarelaatiot ovat olemassa esimerkiksi migraatioissa `0006_cms_foundation.sql` ja `0010_destination_cms.sql`.

## Mitä tämä tarkoittaa jatkotyölle

1. **Älä poista katalogeja tai tee massamigraatiota ennen tuplien ja reittien kartoitusta.** Nykyisillä staattisilla tietueilla on tärkeää sisältöä, kuten kielikohtaiset kuvaukset, kuvien lähteet, krediitit, aluelinkitykset ja usean kategorian luokitukset.
2. **Yhdistä käsitteet ennen taulujen muuttamista.** `providers`-rekisteri, `properties` ja `experiences` sekä paikalliset resurssi-/kohdekortit eivät ole automaattisesti sama tietotyyppi. Määritä, mikä on yritys, mikä sen varattava tuote ja mikä toimituksellinen nähtävyys.
3. **Laajenna nykyistä CMS:ää, älä rakenna rinnakkaista.** Selvitä, voidaanko nykyiseen provider-malliin lisätä julkaistu lokalisoitu profiili, kuvat ja lähdetiedot sekä liittää samaan yritykseen useita tuotteita tai kategorioita.
4. **Säilytä lähde- ja tarkistustiedot.** Jokaiselle tuodulle kentälle tarvitaan lähde, viimeisin tarkistus, tarkistaja tai tarkistustapa ja julkaisutila. Kuvalle tarvitaan erikseen lähde, krediitti ja varmistus siitä, että kuva vastaa esitettyä palvelua.
5. **Siirrä vaiheittain ja vertaa ennen julkaisua.** Aloita pienestä Salo- ja Kemiönsaari-otannasta. Vertaa vanhaa ja uutta reittiä, kieliä, kuvia, provider-linkkejä sekä sitemapin tulosta. Vasta hyväksytyn vertailun jälkeen jatka koko katalogiin.
6. **Pidä varaus palveluntarjoajalla.** CMS-profiilin CTA ohjaa viralliseen ulkoiseen varaus- tai yhteydenottokanavaan; Finland Experience ei saa näyttää toteutumattomia saatavuus-, hinta- tai maksutoimintoja.

## Seuraava kartoitus

Ennen migraatiopäätöstä tarvitaan tietuekohtainen vertailu:

- nykyiset Salo-, Mathildedal- ja Kemiönsaari-ID:t sekä mahdolliset duplikaatit;
- CMS-provider-, property- ja experience-rivien todellinen kattavuus;
- lokalisointien, ulkoisten linkkien, kuvien ja lähde-URL:ien kattavuus;
- tuetut usean alueen ja usean kategorian suhteet;
- julkaisu-, verified- ja aktiivisuustilojen tarkka merkitys nykyisessä tietomallissa.

Tietokannan sisältöä ei tämän kartan laatimisessa luettu eikä muutettu. Kartta kuvaa repositoriossa näkyvää koodia ja migraatioita, ei tuotantotietokannan toteutunutta tilaa.
