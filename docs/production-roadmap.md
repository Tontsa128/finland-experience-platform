# Finland Experience – tuotantotilanne ja kasvun toteutussuunnitelma

Päivitetty 3.11.2026 Visit Finlandin vuoden 2026 kansainvälistymiskriteerien ja projektin GitHub-päähaaran tarkastelun perusteella.

Finland Experience on paikallisia kohteita ja matkailupalveluja esittelevä markkinointi- ja ohjausalusta. Matkailija löytää palveluntarjoajan ja siirtyy tämän omaan varaus- tai yhteydenottokanavaan. Alusta ei tee pakettimatkoja eikä käsittele kuluttajan varausta tai maksua.

Visit Finlandin kansainvälistymiskriteerit on tarkoitettu kansainvälisille markkinoille tähtäävän matkailuyrityksen suunnittelun tueksi. Niitä käytetään tässä kehitysrunkona, ei osoituksena Visit Finlandin hyväksynnästä tai sertifioinnista.

## Nykytilanne GitHubissa

- Päähaara: `1733b122` (3.11.2026).
- Viimeisin tarkastettu GitHub Actions -ajo läpäisi lintin, typecheckin, unit-testit ja tuotantobuildin.
- CI validoi lähdekoodin. GitHubin CI-workflow ei itsessään julkaise tuotantoon.
- Projektissa on Next.js 16 / React 19, Supabase/Auth, CMS-näkymiä, mediat, tapahtumahallinta, liidiominaisuuksia ja FI/EN/ES-reittejä.
- Reititys- ja tietomallikoodia on sekä tietokannan/CMS:n yhteydessä että aluekohtaisissa lähdekoodikatalogeissa. Sisällön ensisijainen hallintapaikka pitää inventoida sisältötyypeittäin.
- Salo- ja Kemiönsaari-sisältöjen luonnos-PR:t #60 ja #53 ovat keskeneräisiä. Niiden päällekkäisyydet ja sisältömäärät tarkistetaan nykyistä päähaaraa vasten ennen jatkoa.

### Julkaisun tilan varmistus

Päähaaran olemassaolo ja onnistunut build eivät yksin kerro, mikä sovellusversio on käyttäjille tuotannossa. Projektissa on Cloudflare Workers -konfiguraatio, ja GitHubin repository-metadata sisältää Vercel-osoitteen. Varmista ennen tuotantomuutoksia:

1. Mikä domain ja alusta ovat käyttäjien varsinainen tuotanto?
2. Mikä GitHub-haara ja commit siihen julkaistaan?
3. Onko nykyinen tuotantoversio sama kuin päähaaran commit?
4. Ovatko tuotannon Supabase-migraatiot, OAuth-paluuosoitteet ja ympäristömuuttujat ajan tasalla?
5. Miten julkaisu, palautus edelliseen versioon ja migraatioiden yhteensovitus tehdään?

Älä aja tuotantotietokannan migraatioita tai julkaise tuotantoa pelkän CI-tuloksen perusteella. Muutokset toteutetaan tarkistettavana PR:nä ja julkaisu varmistetaan kohdeympäristössä.

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

- Selvitä Visit Finland DataHubin ajantasainen API-dokumentaatio, käyttöehdot, versio ja käyttöoikeuksien hakutapa ennen toteutusta.
- Aloita rajatulla kokeilulla ja vertaa DataHubin tuotetietoa nykyisiin Salo/Kemiönsaari-tietueisiin.
- Säilytä Finland Experiencen omat kohdetarinat, käännökset, kuratoidut reitit ja paikallinen laadunvarmistus.
- Älä anna DataHub-synkronoinnin korvata manuaalisesti varmennettuja lähde- tai julkaisutiloja.
- Tee kumppaneille selkeä profiilin tarkistus- ja päivityspolku ennen maksullisten näkyvyyspakettien rakentamista.

**Valmis, kun:** tietojen alkuperä, päivitysaika, julkaisuoikeus ja ristiriitatilanteen käsittely ovat määriteltyjä.

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

1. Julkaisun nykytilan ja Supabase-migraatioiden read-only inventointi.
2. Sisältölähteiden kartta: Salo, Mathildedal ja Kemiönsaari – CMS vs. koodi vs. seed-data.
3. PR #60 ja #53:n sisältövertailu nykyiseen päähaaraan ja yksi yhdistetty, deduplikoitu sisältöjono.
4. Valitun aluepilotoinnin sisältö- ja linkkitarkistus FI/EN/ES.
5. Ensimmäinen ylläpidettävä reitti CMS:n tai nykyisen sisältöarkkitehtuurin kautta.

Lähtöoletuksia, kuten DataHub-API:n nykyistä saatavuutta, tuotantomigraatioiden tilaa, liikenteen määrää, markkinointibudjettia tai kumppanien maksuhalukkuutta, ei käsitellä faktoina ennen tarkistusta.
