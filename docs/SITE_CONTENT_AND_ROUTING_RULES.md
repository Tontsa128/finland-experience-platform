# Sivuston reititys- ja sisältösäännöt

Nämä ovat projektin pysyvät säännöt uusille sivuille, kohteille, majoituksille ja elämyksille.

## 1. Julkiset URL-osoitteet

- Kaikki julkiset sivut ovat lokalisoituja: `/[locale]/...`.
- Sallitut kielet ovat `fi`, `es`, `en`.
- Käytä aina nykyisen sivun localea linkkiä muodostettaessa.
- Älä kovakoodaa julkisissa komponenteissa `/fi`, `/es` tai `/en`, ellei kyse ole tarkoituksellisesta kielenvaihdosta.
- CMS:n käyttäjän syöttämät sisäiset linkit pitää normalisoida niin, ettei localea lisätä kahdesti.

## 2. Nykyiset pääreitit

- Etusivu: `/[locale]`
- Kohteet: `/[locale]/destinations`
- Kohteen sivu: `/[locale]/destinations/[slug]`
- Majoitukset: `/[locale]/accommodations`
- Majoituksen sivu: `/[locale]/accommodations/[slug]`
- Elämykset: `/[locale]/experiences`
- Elämyksen sivu: `/[locale]/experiences/[slug]`
- Kaupunkilomat: `/[locale]/city-breaks`
- Blogi: `/[locale]/blog`
- Blogiartikkeli: `/[locale]/blog/[slug]`
- Tapahtumat: `/[locale]/events`
- Maaseutu & saaristo -SEO-pilari: `/[locale]/rural-finland`
- Luxury & Authentic Finland -hakemisto: `/[locale]/luxury-finland`
- Yhteystiedot: `/[locale]/contact`
- Asiakastili: `/[locale]/account`
- Kirjautuminen: `/[locale]/account/login`
- Rekisteröityminen: `/[locale]/account/register`
- CMS:n omat sivut: `/[locale]/pages/[slug]`

## 3. Kohteet, majoitukset ja elämykset

Jokaisen uuden kohteen tulee sisältää:
- yksilöllinen slug
- FI/ES/EN-nimi
- FI/ES/EN-kuvaus
- pääkuva
- julkaisutila
- SEO-tiedot
- toimiva detail-sivun linkitys

Jokaisen uuden majoituksen tulee lisäksi sisältää:
- vuokraajan / palveluntarjoajan nimi
- vuokraajan verkkosivu tai varauslinkki
- selkeä CTA detail-sivulla: "Siirry vuokraajalle"
- linkin toimivuus pitää tarkistaa ennen julkaisua

Jokaisen varattavan elämyksen tulee sisältää:
- toimiva detail-sivu
- saatavuus/pricing-tiedot projektin nykyisen booking-arkkitehtuurin mukaisesti
- CTA:n pitää johtaa oikeaan varaus-/maksupolkuun, ei mock-onnistumiseen

### Ulkoinen palveluntarjoajahakemisto
- Luxury & Authentic Finland -hakemiston kohteissa Finland Experience Platform ei ota varausta eikä maksua.
- CTA johtaa aina palveluntarjoajan tai virallisen matkailusivuston omalle sivulle.
- Hinta näytetään vain silloin, kun se on tarkistettu palveluntarjoajan tai virallisen matkailulähteen sivulta.
- Hakemiston kuvissa käytetään ensisijaisesti palveluntarjoajan tai virallisen matkailutoimijan kuvia ja ilmoitetaan kuvalähde.

## 4. Linkityssääntö

Kun uusi sisältökortti luodaan:
1. kortti → detail-sivu
2. detail-sivu → takaisin listaukseen
3. detail-sivu → siihen liittyvät kohteet/majoitukset/elämykset
4. ulkoinen palveluntarjoaja → oikea ulkoinen URL
5. jokainen kieliversio → saman sisällön vastaava kieliversio

Älä jätä `href="#"`, tyhjiä linkkejä tai linkkejä olemattomiin vanhoihin reitteihin.

## 5. CMS-sääntö

Kaikki käyttäjän muokattava sisältö tehdään CMS:n kautta aina kun mahdollista:
- tekstit
- kuvat
- SEO
- julkaisu
- navigaatio
- bannerit
- blogiartikkelit
- uudet sivut
- majoittajien linkit

Uutta julkista sisältöä ei saa tehdä vain kovakoodattuna React-komponenttiin, jos sama sisältö on tarkoitettu ylläpidettäväksi CMS:stä.

## 6. Kielet

Uuden sivun tai sisällön julkaiseminen edellyttää FI/ES/EN-rakenteen huomioimista.
Jos käännös puuttuu, käyttöliittymän pitää näyttää hallittu fallback eikä tyhjää tai rikkinäistä sivua.

## 7. Ennen julkaisua tehtävä tarkistus

Jokaisesta uudesta sivusta/kohteesta tarkistetaan:
- mobiili
- desktop
- FI
- ES
- EN
- päävalikko
- sivupalkki / CTA
- footer
- kortista detail-sivulle
- detail-sivulta takaisin
- ulkoiset palveluntarjoajan linkit
- kuvat
- SEO
- 404-polku
- build/lint/typecheck

Näitä sääntöjä sovelletaan myös kaikkiin tuleviin sivuihin ja kohteisiin.
