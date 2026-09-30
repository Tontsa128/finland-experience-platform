export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Finland Experience</p>
      <h1 className="mt-2 text-4xl font-bold text-brand-950">Tietosuoja</h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
        <p>Tämä sivu kuvaa Finland Experience -sivuston keskeiset tietojen käsittelytavat. Lopulliseen julkaisuversioon on lisättävä palvelun ylläpitäjän virallinen nimi, yhteystiedot ja muut yrityskohtaiset rekisterinpitäjätiedot.</p>
        <section>
          <h2 className="text-xl font-bold text-brand-950">Mitä tietoja palvelu voi käsitellä?</h2>
          <p className="mt-2">Yhteydenottolomakkeella annettuja tietoja, kuten nimeä, sähköpostiosoitetta ja viestiä voidaan käsitellä yhteydenoton hoitamista varten. Matkasuunnittelun ja concierge-palvelun lomakkeilla voidaan lisäksi käsitellä esimerkiksi matkan pituutta, henkilömäärää, budjettia, kiinnostuksen kohteita ja matkatoivetta.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-brand-950">AI-palvelut</h2>
          <p className="mt-2">Matka-avustaja ja käännöstoiminnot käyttävät ulkoista AI-palvelua silloin, kun toiminto on ympäristömuuttujilla otettu käyttöön. Palveluun lähetetään kyseisen toiminnon vaatima sisältö. Henkilötietoja ei pitäisi syöttää AI-kenttiin, ellei sitä ole erikseen tarkoitettu kyseisen toiminnon käyttöön.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-brand-950">Evästeet</h2>
          <p className="mt-2">Sivusto käyttää tällä hetkellä välttämätöntä asetusevästettä, jolla muistetaan evästevalintasi. Erillisiä analytiikka- tai markkinointievästeitä ei oteta käyttöön ilman, että ne toteutetaan ja kuvataan tässä selosteessa.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-brand-950">Palveluntarjoajien varaukset</h2>
          <p className="mt-2">Finland Experience ohjaa käyttäjän ulkoisen palveluntarjoajan omalle sivulle. Varaus, maksu ja sopimus tehdään palveluntarjoajan kanssa tämän omien järjestelmien ja ehtojen mukaisesti.</p>
        </section>
        <p className="rounded-2xl bg-amber-50 p-5 text-sm leading-7 text-amber-900">Ennen tuotantojulkaisua tähän sivuun on täydennettävä yrityskohtaiset rekisterinpitäjä-, yhteydenotto-, säilytys- ja oikeustiedot asiantuntevan tarkistuksen perusteella.</p>
      </div>
    </main>
  );
}
