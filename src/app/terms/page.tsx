export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Finland Experience</p>
      <h1 className="mt-2 text-4xl font-bold text-brand-950">Käyttöehdot</h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-brand-950">Palvelun tarkoitus</h2>
          <p className="mt-2">Finland Experience on inspiraatio-, kohde- ja palveluhakemisto. Sivusto esittelee matkakohteita, majoituksia ja elämyksiä sekä ohjaa käyttäjän tarvittaessa ulkoisen palveluntarjoajan omalle sivulle.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-brand-950">Varaukset ja maksut</h2>
          <p className="mt-2">Sivusto ei myy tässä palvelussa valmiita matkapaketteja eikä käsittele palveluntarjoajan varauksen maksua omassa checkout-järjestelmässä. Kun käyttäjä siirtyy palveluntarjoajalle, varaus, maksu, peruutukset ja sopimusasiat määräytyvät palveluntarjoajan omien järjestelmien ja ehtojen mukaan.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-brand-950">Tiedot ja hinnat</h2>
          <p className="mt-2">Kohteiden kuvaukset, hinnat, aukioloajat ja saatavuustiedot voivat muuttua. Käyttäjän tulee tarkistaa ajantasaiset tiedot palveluntarjoajalta ennen varausta.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-brand-950">Ulkoiset linkit</h2>
          <p className="mt-2">Sivustolla voi olla linkkejä kolmansien osapuolten verkkosivuille. Näiden sivujen sisältö, saatavuus, turvallisuus ja ehdot kuuluvat kyseisten palveluntarjoajien vastuulle.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-brand-950">Sisältö</h2>
          <p className="mt-2">Sivuston tekstejä, kuvia, tunnuksia ja muuta sisältöä saa käyttää vain voimassa olevien oikeuksien ja käyttöehtojen mukaisesti. Kuvien ja palveluntarjoajien materiaalien oikeudet kuuluvat niiden oikeudenhaltijoille.</p>
        </section>
        <p className="rounded-2xl bg-amber-50 p-5 text-sm leading-7 text-amber-900">Nämä ovat sivuston yleiset käyttöperiaatteet. Yrityskohtaiset yhteys- ja vastuuehdot on tarkistettava ja täydennettävä ennen lopullista tuotantojulkaisua.</p>
      </div>
    </main>
  );
}
