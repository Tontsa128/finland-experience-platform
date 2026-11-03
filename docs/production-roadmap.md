# Finland Experience – tuotantotilanne ja kasvun toteutussuunnitelma

Päivitetty 3.11.2026 Visit Finlandin vuoden 2026 kansainvälistymiskriteerien ja projektin GitHub-päähaaran tarkastelun perusteella.

Finland Experience on paikallisia kohteita ja matkailupalveluja esittelevä markkinointi- ja ohjausalusta. Matkailija löytää palveluntarjoajan ja siirtyy tämän omaan varaus- tai yhteydenottokanavaan. Alusta ei tee pakettimatkoja eikä käsittele kuluttajan varausta tai maksua.

Visit Finlandin kansainvälistymiskriteerit on tarkoitettu kansainvälisille markkinoille tähtäävän matkailuyrityksen suunnittelun tueksi. Niitä käytetään tässä kehitysrunkona, ei osoituksena Visit Finlandin hyväksynnästä tai sertifioinnista.

## Nykytilanne GitHubissa

- Päähaara tarkistettu 3.11.2026: `2096ae1f` (PR #67:n jälkeen).
- PR:ien #66 ja #67 tarkastetut CI-ajot läpäisivät lintin, typecheckin, unit-testit ja tuotantobuildin.
- Vercelissä on READY-tilassa oleva main-julkaisu ja tuotantodomain; se on vahvistettu julkisen sivuston ensisijaiseksi julkaisuksi. PR #67:n jälkeen nykyinen main on `2096ae1f`.
- Vercel ja pääasiallinen CI käyttävät Node 24:ää. Erillinen manuaalinen Next.js-parametrien korjausworkflow käyttää edelleen Node 20:tä ja arvioidaan erikseen ennen kuin sitä käytetään.
- Cloudflare-tilillä on aktiivinen `finland-experience-platform`-Worker, jossa on `fetch`- ja `scheduled`-käsittelijät sekä kuuden tunnin cron (`0 */6 * * *`). `workers.dev` on käytössä, mutta Workerillä ei ole custom domainia tai zone-reittiä. Tämä tukee apu-Workerin roolia tapahtumasyötteessä, mutta käyttöliittymän koodin vastaavuutta Vercelin mainiin ei ole vielä varmennettu.
- Projektissa on Next.js 16 / React 19, Supabase/Auth, CMS-näkymiä, mediat, tapahtumahallinta, liidiominaisuuksia ja FI/EN/ES-reittejä.
- Reititys- ja tietomallikoodia on sekä tietokannan/CMS:n yhteydessä että aluekohtaisissa lähdekoodikatalogeissa. Sisällön ensisijainen hallintapaikka pitää inventoida sisältötyypeittäin.
- Salo- ja Kemiönsaari-sisältöjen luonnos-PR:t #60 ja #53 ovat keskeneräisiä. Niiden päällekkäisyydet ja sisältömäärät tarkistetaan nykyistä päähaaraa vasten ennen jatkoa.

### Julkaisun seuraavat varmistukset

Vercelin nykyinen main-julkaisu on vahvistettu, joten jäljellä oleva julkaisu- ja tietokantariskin tarkistus rajataan seuraaviin:

1. Vercel on kanoninen julkinen sivusto. Varmista Worker-lähdekoodista, ettei sen `fetch`-reitti tarjoa vanhaa tai erillistä verkkosivua; pidä kuuden tunnin tapahtumasynkronointi Cloudflare Workerissä, jos sen lähdekoodi ja lokit vahvistavat tehtävän.
2. Tarkista tuotannon Supabase-migraatioiden tila ennen uusia skeemamuutoksia.
3. Varmista OAuth-paluuosoitteet ja tuotannon ympäristömuuttujat kanoniselle domainille.
4. Kirjaa julkaisu- ja palautusmenettely sekä tietokantamuutosten järjestys.

Älä aja tuotantotietokannan migraatioita pelkän CI-tuloksen perusteella. Muutokset tehdään tarkistettavana PR:nä ja julkaisu tarkistetaan siinä ympäristössä, joka on päätetty kanoniseksi.


## Toteutusjärjestys

### Vaihe 0 – Tuotantoperusta ja lähdetotuus

- Dokumentoi tuotannon domain, hosting, GitHub-haara, julkaisutapa ja nykyinen commit.
- Tarkista Supabasen migraatioiden toteutunut tila ja vertaile sitä versionhallinnan migraatioihin.
- Inventoi sisältölähteet: CMS-taulut, staattiset katalogit, JSON/seed-data ja ulkoiset syötteet.
- Määritä kullekin tietotyypille yksi ensisijainen muokkauspaikka ja julkaisutapa.
- Yhdenmukaista README, ympäristömuuttujaohjeet ja julkaisudokumentaatio todennettua tuotantotapaa vastaaviksi.

**Valmis, kun:** tuotantoympäristö, migraatiot ja sisältöjen omistajuus voidaan osoittaa ilman oletuksia.

### Vaihe 1 – Luotettava paikallinen kohdeopas

Viimeistele Salo–Mathildedal–Kemiönsaari-alueelta rajattu pilotti samalla sisältöhierarkialla:

Etusivu → alue → kylä/kohde → palvelukategoria → palveluntarjoajan oma profiili → palveluntarjoajan varaus- tai yhteydenottokanava.

- Sovita PR:ien #60 ja #53 sisältö nykyiseen päähaaraan: tunnista kaksoiskappaleet, ristiriitaiset profiilimäärät, puuttuvat kohteet ja vanhentuneet reitit.
- Tarkista jokaisen listauksen nimi, kategoria, lähde, yhteystiedot ja ulkoinen linkki.
- Näytä palveluntarjoajan detail-sivu ennen ulkoista varaussivua.
- Julkaise kuvat vain, kun ne kuvaavat oikeaa kohdetta ja niiden lähde sekä tarvittavat krediitit on kirjattu.
- Tarjoa FI/EN/ES-sisällöille luontevat, erilliset tekstit ja kielikohtaiset metadata-arvot.

**Valmis, kun:** otannalla ja reittikierroksella ei löydy väärään kohteeseen meneviä linkkejä, virheellisiä kuvia tai locale-aukkoja.

### Vaihe 2 – Inspiraatiosta suunnitteluun

- Nosta etusivulla esiin kausi, alueen tarina ja paikalliset teemat, ei pelkästään hakemistoa.
- Tee kuratoidut, ylläpidettävät reitit esimerkiksi päiväretkille ja viikonlopuille.
- Koosta reitti olemassa olevista kohde- ja palveluntarjoajatietueista; älä kopioi samaa sisältöä uusiin irrallisiin listauksiin.
- Näytä siirtymät, kestot, kausitiedot ja saapumisohjeet vain tarkistetuista lähteistä.
- Lisää kohteisiin ja reitteihin käytännölliset “miten pääsen / miten varaan” -osiot.

**Valmis, kun:** reitin jokainen pysähdys johtaa oikeaan lokalisoituun tietueeseen ja palveluntarjoajan omaan kanavaan.

### Vaihe 3 – Haku, saavutettavuus ja vastuullisuus

- Kehitä alue-, kategoria-, kausi- ja kiinnostuksenkohdesuodattimia todellisten profiilitietojen perusteella.
- Lisää saavutettavuustiedot kenttinä, joiden tila voi olla vahvistettu, ei saatavilla tai tarkistamatta.
- Näytä STF-merkki vain tarkistetulle ja voimassa olevalle toimijalle; vastuullisuusväitteet kirjataan lähteineen.
- Nosta puuttuva tai vanhentunut tieto sisällön ylläpidon tehtävälistalle.

**Valmis, kun:** haku ei lupaa ominaisuuksia, joita tietolähteet eivät tue, ja tietojen tarkistustila näkyy ylläpidossa.

### Vaihe 4 – DataHub ja kumppaniverkosto

**Ajantasainen selvitystila 3.11.2026:** Visit Finlandin 20.11.2025 päivätty DataHub-ohje kertoi vanhan DataHub-rajapinnan alasajosta 31.1.2026 ja ohjasi rekisteröitymään Business Finlandin API-portaaliin. Uusimman API-dokumentaation pitäisi löytyä DataHubin API-käyttäjän ohjesivulta, mutta sivu vaatii JavaScriptin ja Business Finlandin portaali kirjautumisen. Uutta API-versiota, endpointia, tunnistautumista ja ehtoja ei siksi ole tässä vahvistettu. Älä rakenna integraatiota vanhan rajapinnan tai vanhentuneiden esimerkkien varaan.

- Hanki yrityksen/organisaation oikeuksilla pääsy Business Finlandin API-portaaliin ja nykyiseen DataHub API -dokumentaatioon; tallenna versionumero, endpoint, tunnistautuminen, käyttöehdot ja käyttöönottotapa.
- Vahvista DataHubilta, saako tuoterivejä hakea Finland Experiencen kaupalliseen verkkopalveluun ja miten attribuutio sekä kuvat tulee näyttää.
- Aloita rajatulla kokeilulla ja vertaa DataHubin tuotetietoa nykyisiin Salo/Kemiönsaari-tietueisiin.
- Säilytä Finland Experiencen omat kohdetarinat, käännökset, kuratoidut reitit ja paikallinen laadunvarmistus.
- Älä anna DataHub-synkronoinnin korvata manuaalisesti varmennettuja lähde- tai julkaisutiloja.
- Tee kumppaneille selkeä profiilin tarkistus- ja päivityspolku ennen maksullisten näkyvyyspakettien rakentamista.

**Valmis, kun:** nykyinen API-sopimus ja pääsy on varmistettu, tietojen alkuperä/päivitysaika/julkaisuoikeus on mallinnettu ja rajattu tiedonhaku on validoitu.

### Vaihe 5 – Kansainvälisen kysynnän validointi

- Aloita espanjasta nykyisen kielivalikoiman ja aiemman painotuksen perusteella; käsittele sitä testattavana hypoteesina.
- Kirjoita matkailijan kysymyksiin vastaavia laskeutumissivuja: milloin tulla, kuinka kauan viipyä, mitä tehdä ja miten varata.
- Testaa rajatulla alue- ja sisältöjoukolla orgaanista löydettävyyttä ja pieniä kampanjoita.
- Mittaa palveluntarjoajalle siirtymistä ja laadukkaita yhteydenottoja ennen markkinointipanostusten kasvattamista.
- Päätä seuraava kieli tai alue tulosten, kumppanivalmiuden ja ylläpitokapasiteetin perusteella.

**Valmis, kun:** vähintään yhden kampanjan tai orgaanisen sisältöpolun tulokset voidaan yhdistää palveluntarjoajille syntyneisiin ohjauksiin.

### Vaihe 6 – Analytiikka, ansainta ja jatkuva kehitys

Seuraa vähintään:

- kävijöitä kielen, alueen ja kauden mukaan;
- reitin ja kategorian käyttöä;
- palveluntarjoajan profiilin avauksia ja ulkoisia klikkauksia;
- yhteydenottoja ja niiden käsittelyä kumppanilla;
- tietojen viimeisintä tarkistusajankohtaa ja puutteita;
- kumppanien pysyvyyttä ja mahdollisia maksetun näkyvyyden tuloksia.

Lisää analytiikka yksityisyyttä kunnioittavasti ja tarkista suostumusten tarve ennen ei-välttämättömiä seurantoja. Esitä maksettu näkyvyys selvästi erillään toimituksellisesta valinnasta. Arvioi jäsenyydet, kampanjapalvelut ja liidihinnoittelu vasta, kun kumppaneille syntyvä hyöty on mitattavissa.

## Seuraavat konkreettiset työpaketit

1. Supabase-migraatioiden toteutuneen tilan read-only inventointi.
2. DataHub API -portaaliin kirjautuminen ja uuden API-version sekä kaupallisen käytön ehtojen varmistaminen; toteutusta ei aloiteta ennen näitä tietoja.
3. Sisältölähteiden kartta on tehty PR:ssä #67; seuraavaksi vertaa tietueet PR:ien #60/#53 sisältöön.
4. PR #60:n ja #53:n sisältövertailu nykyiseen päähaaraan ja deduplikoitu sisältöjono.
5. Salo-hierarkian selainkierros on vahvistettu FI/EN/ES:ssä tuotannossa Teijo-otannalla; laajenna tarkistus muiden kylien ja linkkien kattavuuteen.
5. Ensimmäinen ylläpidettävä reitti CMS:n tai nykyisen sisältöarkkitehtuurin kautta.

Lähtöoletuksia, kuten DataHub-API:n nykyistä saatavuutta, tuotantomigraatioiden tilaa, liikenteen määrää, markkinointibudjettia tai kumppanien maksuhalukkuutta, ei käsitellä faktoina ennen tarkistusta.
