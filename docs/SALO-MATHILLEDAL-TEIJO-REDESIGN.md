# Salo, Mathildedal ja Teijo – uudistuksen lähtöauditointi

Päivitetty: 30.10.2026  
Työhaara: `feat/salo-mathildedal-teijo-redesign`

Tämä dokumentti erottaa nykyisestä repositoriosta varmennetut tekniset havainnot, virallisista matkailulähteistä löydetyt palvelut sekä asiat, jotka pitää vielä tarkistaa palveluntarjoajan omasta lähteestä. Se ei ole julkaistava palveluhakemisto eikä väitä luetteloa täydelliseksi.

## 1. Nykyinen tekninen lähtötilanne

- Etusivun rannikkokohteiden aiempi järjestys oli Salo, Naantali, Turku, Hanko ja Ahvenanmaa. Kemiönsaari esitettiin erillisenä suurena nostona alempana sivulla.
- Tässä työhaarassa etusivun ensimmäinen kohderivi on muutettu järjestykseen Salo, Kemiönsaari, Hanko, Naantali, Turku ja Ahvenanmaa. Salo-kortti johtaa Salon alueoppaaseen; muut kortit johtavat kohteiden omille reiteille.
- Erillinen suuri Kemiönsaari-nosto poistettiin, jotta sama kohde ei toistu heti ensimmäisen korttirivin jälkeen. Kansakoulun oma etusivun nosto säilyy erillisenä sisältönostona.
- Salon alueopas on reitillä `/[locale]/salo`. Se sisältää jo aluekuvauksen, reitti-ideoita ja palvelukortit.
- Mathildedalin vanha reitti `/[locale]/mathildedal` tekee pysyvän uudelleenohjauksen reitille `/[locale]/destinations/salo-mathildedal`. Tämä ei vielä ole erillinen, täysin uudistettu Mathildedal-alueopas.
- Teijon ruukkikylällä on oma reitti `/[locale]/destinations/teijon-ruukkikyla`, joka käyttää yhteistä `RuukkikylaGuide`-komponenttia.
- Uudistushaaran `saloProviders`-luettelo sisältää nyt 69 yksilöllistä tietuetta: 30 majoitusta, 12 elämystä, 8 ruoka- ja ravintolakohdetta, 7 ostos- ja käsityökohdetta, 4 luontokohdetta, 2 kulttuurikohdetta, 2 hyvinvointikohdetta, 2 tapahtuma-/juhlatilakohdetta ja 2 matkailuinfoa. Monipalveluyritykset voidaan lisäksi näyttää useassa kategoriassa saman kanonisen tietueen avulla.
- Kolme päällekkäistä tietuetta yhdistettiin kanonisiksi profiileiksi: Vuohensaari Camping, Katiskanmäki ja Meri-Ruukin lomakylä. Hakemistossa on nyt 69 yksilöllistä tietuetta, joista 68:lla on kuva ja lähdemerkintä. Yhdeltä tietueelta puuttuu edelleen korttikuva: Chill Out Fishing. Villa Viktorian palvelukuvaus tarkistettiin Lomalaperlan omalta kohdesivulta, ja sen korttiin lisättiin kyseisen sivun virallinen kuva sekä lähdemerkintä. Teijon Kammari, Villa Kruuva ja Meri-Veikko saivat virallisista lähteistä löytyneet kuvat ja lähdemerkinnät.
- Salon korttimalli tuntee nyt kahdeksan pääluokkaa: matkailuinfo, majoitus, elämykset, luonto, ruoka, ostokset, kulttuuri ja hyvinvointi. Tapahtumat, meri/saaristo, kylät ja muut paikalliset palvelut tarvitsevat vielä oman kattavan luokittelunsa.
- Nykyiset Salon palvelutiedot ovat pääosin koodissa tiedostossa `src/lib/salo.ts`. Palvelukortin oma sivu rakentuu yleisestä provider-reitistä, mutta Salon tietomallissa ei ole vastaavaa rakenteista kuvagalleriaa ja lähde-/tarkistustietoa kuin Kemiönsaaren uudistetussa mallissa.
- Yläpalkin nykyinen `site_navigation`-malli palauttaa litteän listan (tunniste, kieli, nimi, URL ja järjestys). Siinä ei ole valmista vanhempi–lapsi- tai ryhmä-rakennetta Ruukkikylät-alavalikolle.

## 2. Viralliset lähteet ja niiden käyttötarkoitus

### Salo

- Visit Salo – majoitus: https://visitsalo.fi/majoitus/
- Visit Salo – aktiviteetit ja elämykset: https://visitsalo.fi/aktiviteetit-ja-elamykset/
- Visit Salo – kulttuuri ja nähtävyydet: https://visitsalo.fi/kulttuuri-ja-nahtavyydet/
- Visit Salo – tapahtumat: https://visitsalo.fi/tapahtumat/
- Visit Salo – ostokset ja lähiruoka: https://visitsalo.fi/ostokset/
- Visit Salo – Mathildedalin ruukkikylä ja alueen kohteita: https://visitsalo.fi/mathildedalin-ruukkikyla/
- Lomalaperla – Villa Viktoria (palvelun kuvaus ja kohdekuva): https://www.lomalaperla.com/moumlkki-3.html
- Visit Salo – Pieni Rannikkoreitti: https://kohteet.visitsalo.fi/pieni-rannikkoreitti/

### Mathildedal

- Visit Mathildedal – majoitus: https://www.visitmathildedal.fi/fi/majoitus
- Visit Mathildedal – ravintolat ja kahvilat: https://www.visitmathildedal.fi/fi/ravintolatjakahvilat
- Visit Mathildedal – ostokset: https://www.visitmathildedal.fi/fi/ostokset
- Visit Mathildedal – tapahtumat: https://visitmathildedal.fi/fi/tapahtumat
- Visit Mathildedal – aukioloajat: https://www.visitmathildedal.fi/fi/aukioloajat

### Teijo, Kirjakkala ja Mutainen

- Teijon Ruukkikylät – alueen kylät ja historia: https://www.teijo.fi/tervetuloakyliin/teijon-alueen-ruukkikylat/
- Kirjakkalan Ruukkikylä / Extreme Fun – virallinen kohdekuvaus: https://kohteet.visitsalo.fi/kirjakkalan-ruukkikyla-melontakeskus/
- Ravintola Teijon Arkki – virallinen kohdekuvaus: https://kohteet.visitsalo.fi/ravintola-teijon-arkki/
- Teijon Ruukkikylät – palvelut: https://www.teijo.fi/palveluja/
- Teijon Ruukkikylät – majoitus: https://www.teijo.fi/palveluja/majoitusta/
- Teijon Ruukkikylät – kahvilat ja ravintolat: https://www.teijo.fi/palveluja/kahvilat-ja-ravintolat/
- Teijon Ruukkikylät – erikoisliikkeet ja palvelut: https://www.teijo.fi/palveluja/erikoisliikkeita-ja-palveluita/
- Teijon Ruukkikylät – hyvinvointipalvelut: https://www.teijo.fi/palveluja/hyvinvointipalveluja/
- Luontoon.fi – Teijon kansallispuiston reitit: https://www.luontoon.fi/fi/kohteet/teijon-kansallispuisto/aktiviteetit-ja-reitit/retkeily-ja-ulkoilu

**Lähdekriittinen huomio:** Teijon Ruukkikylät -sivusto ilmoittaa itse, että kaikkien palveluntarjoajien tietoja ei ole voitu tarkistaa ja mukana saattaa olla vanhentunutta tietoa. Sen luetteloita käytetään löytämiseen, ei sellaisenaan julkaistavien aukioloaikojen, yhteystietojen tai palvelukuvausten lähteenä. Jokainen julkaistava yritystieto varmennetaan yrityksen omalta sivulta tai muusta ajantasaisesta ensisijaisesta lähteestä.

## 3. Virallisista hakemistoista löydettyjä lisäehdokkaita

Alla olevat nimet ovat lähteistä löydettyjä tarkistettavia kohteita. Niitä ei lisätä julkaistaviksi ennen kuin nykyinen toiminta, virallinen osoite/linkki, alue, kuva ja palvelukuvaus on tarkistettu.

### Majoitus – Teijon Ruukkikylien hakemisto

- Kirjakkalan Ruukkikylä
- Kullanpuu
- Mariannen maatila
- Teijon Kammari
- Masuunin Majatalo
- Teijon Metsänvartija B&B
- Villa Jukola
- Villa Seaview
- Anttipoffi ja Anttipoff as. 5
- Mathildan Marina
- Meri-Ruukin lomakylä
- Teijon Luontokeskuksen matkailuvaunualue ja vuokrattavat majoituspalvelut

Osa näistä esiintyy jo Salon nykyisessä luettelossa eri nimellä tai osana toista palvelua. Ennen lisäystä tehdään duplikaattitarkistus ja päätetään yksi kanoninen palveluntarjoajatietue.

### Ruoka ja kahvilat – viralliset Mathildedal- ja Teijo-lähteet

- Kyläravintola Terho
- Mathildan Marina
- Café Mathildedal
- Bistro Bruket
- Mathildedalin Keskuspuiston kahvila ja Street Food
- Viettelysten Vaunu / Vuorovetten Jäätelö
- Meri-Teijo Golf Café & Bistro
- Ravintola Teijon Arkki ja Teijo Cafe & Bakery
- Metsäravintola
- Terho Hills

Nämä ja nykyiset tietueet yhdistetään yhdeksi ravintola- ja kahvilaluetteloksi. Esimerkiksi Meri-Teijo Golf voi näkyä sekä aktiviteeteissa että ravintoloissa, mutta sillä on vain yksi palveluntarjoajan kanoninen profiili.

### Ostokset, käsityö ja lähiruoka – Mathildedal ja Salo

- Aate Clothing
- Dock Helsinki (sesonkiluonteinen kesäpuoti)
- Kaarnalaiva
- Kyläpanimo / olutpuoti
- Matildan kesäkauppa
- Ruukin Kehräämö
- VinttiPuoti
- Visit Salon ostokset-sivulla listatut paikalliset tuottajat, myymälät ja lähiruokakohteet

Sesonkiluonteisuus ja toiminnan tämänhetkinen tila tarkistetaan ennen julkaisua. Vanhoja aukioloaikoja ei kopioida pysyviksi tiedoiksi.

### Aktiviteetit, luonto ja hyvinvointi

Visit Salon ja Luontoon.fi:n lähteistä löytyy muun muassa Teijon kansallispuiston reitistö, Matildanjärven vuokrauspalvelut, Teijo Ski & Action Park, Meri-Teijo Bike Park, Mathildedalin Keskuspuisto, meriuimapaikka, Matildanjärven sauna, Vicksbäckinlahden kota, melonta- ja kalastuspalvelut sekä paikalliset hyvinvointipalvelut. Jokainen palvelu luokitellaan sen todellisen toiminnan mukaan eikä vain sen mukaan, millä hakemistosivulla se esiintyy.

## 4. Uudistettava tietomalli ja sivurakenne

### Salon pääopas

Salon sivu toimii koko alueen pääsisäänkäyntinä. Se ei saa olla vain Mathildedalin sivu toisella nimellä.

Pääoppaassa esitellään:
- Salon keskusta, tori ja kaupunkikulttuuri
- Ruukkikylät omana ryhmänään
- Särkisalo ja meri
- Perniö ja maaseutu
- Halikko ja Wiurila
- Kisko, Muurla, Vaskio ja muut lähteissä varmennetut alueet
- Luonto ja retkeily
- Majoitus
- Ruoka ja kahvilat
- Aktiviteetit ja elämykset
- Kulttuuri ja historia
- Ostokset ja lähiruoka
- Tapahtumat

### Ruukkikylät-ryhmä

Ruukkikylät on oma yläpalkin ryhmänsä. Alueen lähteissä ryhmään kuuluvat Mathildedal, Teijo ja Kirjakkala; lisäksi Teijon alueen kyläyhdistyksen lähde kuvaa Mutaisen osaksi aluetta. Ryhmän laskeutumissivu ja alavalikko eivät saa sekoittaa kylien historiaa Teijon kansallispuiston reitteihin.

### Mathildedal

Oma kohdesivu, jossa on:
- kylän historia ja ruukkimiljöö
- majoitus
- ravintolat ja kahvilat
- ostokset, käsityö ja design
- aktiviteetit ja elämykset
- meri, uimapaikat ja lähiluonto
- tapahtumat ja sesongit
- palveluntarjoajien omat profiilisivut

### Teijo

Oma kohdesivu, jossa on:
- Teijon ruukkikylän historia ja nykyinen kyläelämä
- kulttuuri, kirkko, kartanomiljöö ja Masuuni
- majoitus
- ravintolat ja kahvilat
- paikalliset palvelut ja hyvinvointi
- Teijon kansallispuisto omana, selvästi erotettuna kokonaisuutenaan
- Matildanjärvi, retkeily ja vuokrauspalvelut
- tapahtumat

Teijon ruukkikylä ja Teijon kansallispuisto linkitetään toisiinsa, mutta niitä ei esitetä samana paikkana tai samana palveluntarjoajana.

## 5. Pakolliset laatukriteerit

- Kaikki julkiset sivut ja palveluntarjoajaprofiilit suomeksi, englanniksi ja espanjaksi.
- Jokaisella palveluntarjoajalla yksi kanoninen profiili; sama profiili voidaan näyttää useassa relevantissa kategoriassa.
- Jokaisessa kortissa oikea kuva, kuvaan liittyvä lähde/tekijä ja oikea palvelukategoria.
- Jokaisessa palveluntarjoajan profiilissa todellinen palvelukuvaus, kuvagalleria, lähdetiedot, vahvistettu sijainti/yhteystieto silloin kun saatavilla sekä suora linkki palveluntarjoajalle.
- Ei keksittyjä hintoja, aukioloaikoja, tapahtumia, kapasiteetteja tai palveluja.
- Tapahtumat ovat ajantasaisia, päivämäärätarkistettuja ja vanhentuneet tapahtumat poistetaan tulevien tapahtumien näkymästä.
- Nykyistä Supabase CMS:ää laajennetaan tarvittaessa; rinnakkaista CMS:ää tai kovakoodattua uutta hakemistoa ei rakenneta.
- Kaikki reitit, metatiedot, canonical/hreflang, saavutettavuus, mobiili, kuvat ja ulkoiset linkit tarkistetaan ennen julkaisua.
- Muutokset tehdään ominaisuushaarassa, testataan CI:ssä ja julkaistaan vasta hyväksynnän jälkeen.

## 6. Kirjakkala osana Ruukkikyliä

Virallisen Visit Salo -kohdekuvauksen mukaan Teijon alueen kolme ruukkikylää ovat **Kirjakkala, Teijo ja Mathildedal**. Siksi Ruukkikylät-ryhmä ei saa rajoittua vain kahteen kylään.

- Kirjakkalan ruukki perustettiin vuonna 1686.
- Kylä sijaitsee Hamarijärven rannalla Teijon kansallispuiston reittiverkoston yhteydessä.
- Kirjakkalan Ruukkikylä / Extreme Fun tarjoaa virallisen kohdekuvauksen mukaan majoitus-, kokous- ja saunapalveluja sekä outdoor- ja melontakeskuksen palveluja.
- Kirjakkalalle lisätään oma FI/EN/ES-kohdesivu, yksi kanoninen palveluntarjoajaprofiili sekä linkit Teijon ja Mathildedalin oppaisiin.
- Kirjakkala pidetään omana kylänään eikä sitä yhdistetä Teijon ruukkikylän profiiliin, vaikka molemmat kuuluvat samaan laajempaan Teijon alueeseen.

## 7. Toteutusjärjestys

1. Viimeistele nykyisten Salo-tietueiden ja virallisten hakemistojen vertailu; tunnista duplikaatit ja puuttuvat kohteet.
2. Määrittele kanoninen palveluntarjoaja- ja kategoriarakenne nykyisen Supabase CMS:n päälle.
3. Rakenna Ruukkikylät-ryhmä navigaatioon ja sen reitit.
4. Uudista Salon pääopas ja kategoriakortit.
5. Rakenna Mathildedalin erillinen kohdesivu ja kategoriat.
6. Rakenna Teijon erillinen kohdesivu ja kategoriat.
7. Lisää ja varmista palveluntarjoajaprofiilit, kuvat, kuvagalleriat ja lähdetiedot.
8. Tarkista FI/EN/ES, SEO, saavutettavuus, mobiili ja kaikki linkit.
9. Aja lint, typecheck, testit ja production build.
10. Avaa PR tarkistettavaksi. Tuotantoon julkaisu ja merge tehdään vasta hyväksynnän jälkeen.
