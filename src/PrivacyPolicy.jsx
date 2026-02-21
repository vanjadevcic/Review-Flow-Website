import { useState, useEffect, useContext } from 'react'
import { createPortal } from 'react-dom'
import { LangContext } from './LangContext'

const pp = {
  hr: {
    link: 'Politika privatnosti',
    title: 'Politika privatnosti',
    close: 'Zatvori',
    intro: (
      <p>
        Ova Politika privatnosti opisuje kako RatingFlow (u nastavku: „mi", „nas", „naš") prikuplja,
        koristi i štiti vaše osobne podatke kada posjetite našu web stranicu <strong>www.ratingflow.net</strong> ili
        koristite naše usluge. Posvećeni smo zaštiti vaše privatnosti u skladu s Općom uredbom o zaštiti
        podataka (GDPR) — Uredba (EU) 2016/679.
      </p>
    ),
    s2title: 'Voditelj obrade podataka',
    s2body: 'Voditelj obrade osobnih podataka prikupljenih putem ove web stranice je:',
    s2items: ['Tvrtka', 'Sjedište', 'E-mail', 'Telefon'],
    s2values: ['RatingFlow', 'Republika Hrvatska, EU', 'vanja.devcic@gmail.com', '+385 91 595 9108'],
    s3title: 'Koje podatke prikupljamo',
    s3body: 'Putem kontaktnog obrasca na web stranici možemo prikupljati sljedeće osobne podatke:',
    s3items: ['Ime i prezime', 'Naziv tvrtke / biznisa', 'Grad', 'E-mail adresa', 'Telefonski broj', 'Vrsta biznisa', 'Poruka (opcionalno)'],
    s3note: (<><strong>Ne prikupljamo</strong> osobne podatke automatski — web stranica ne koristi kolačiće, analitiku, marketinške piksele niti bilo kakve tehnologije praćenja (vidjeti odjeljak „Kolačići i praćenje" u nastavku).</>),
    s4title: 'Svrha i pravna osnova obrade',
    s4body: 'Vaše podatke obrađujemo u sljedeće svrhe:',
    s4items: [
      { label: 'Odgovor na vaš upit', desc: 'kako bismo vas kontaktirali i odgovorili na vaše pitanje ili zahtjev.', legal: 'Pravna osnova: čl. 6(1)(b) GDPR — poduzimanje radnji prije sklapanja ugovora na vaš zahtjev.' },
      { label: 'Procjena poslovne suradnje', desc: 'kako bismo procijenili mogućnost pružanja naših usluga za vaš biznis.', legal: 'Pravna osnova: čl. 6(1)(f) GDPR — legitimni interes (komunikacija s potencijalnim klijentima).' },
    ],
    s5title: 'Naše uloge u obradi podataka',
    s5controller: 'Voditelj obrade (Data Controller)',
    s5controllerDesc: 'Za osobne podatke koje prikupljamo putem kontaktnog obrasca na ovoj web stranici, mi smo voditelj obrade. To znači da sami odlučujemo o svrsi i načinu obrade vaših podataka.',
    s5processor: 'Izvršitelj obrade (Data Processor)',
    s5processorDesc: 'Kada radimo s klijentima na implementaciji automatizacija (npr. sustavi za recenzije, WhatsApp obavijesti, automatski odgovori), možemo obrađivati osobne podatke krajnjih korisnika naših klijenata u njihovo ime. U tom slučaju naš klijent je voditelj obrade, a mi djelujemo kao izvršitelj obrade prema uputama klijenta i na temelju ugovora o obradi podataka (DPA).',
    s6title: 'Razdoblje čuvanja podataka',
    s6items: [
      { label: 'Upiti bez ugovora:', desc: (<>Ako nakon vašeg upita ne dođe do sklapanja ugovora, vaše ćemo podatke čuvati najduže <strong>12 mjeseci</strong> od datuma upita, nakon čega se brišu.</>)},
      { label: 'Klijenti s ugovorom:', desc: 'Podatke čuvamo za vrijeme trajanja ugovorne suradnje i u zakonski propisanim rokovima nakon završetka suradnje.' },
    ],
    s7title: 'Dijeljenje podataka i podizvršitelji',
    s7note: (<>Vaše osobne podatke <strong>ne prodajemo, ne iznajmljujemo i ne dijelimo</strong> s trećim stranama u marketinške svrhe.</>),
    s7body: 'U okviru pružanja naših usluga klijentima (ne posjetiteljima web stranice), možemo koristiti sljedeće alate i platforme trećih strana:',
    s7items: [
      { name: 'Make.com', desc: '— platforma za automatizaciju radnih tokova' },
      { name: 'OpenAI API', desc: '— za generiranje odgovora na recenzije i analizu povratnih informacija' },
      { name: 'WhatsApp Business API (Meta)', desc: '— za slanje obavijesti klijentima' },
      { name: 'Google Business Profile API', desc: '— za upravljanje recenzijama' },
    ],
    s7footer: 'Ovi alati se koriste isključivo u kontekstu pružanja usluga našim klijentima prema ugovorenim uvjetima, a ne za obradu podataka posjetitelja ove web stranice. Svi navedeni pružatelji usluga imaju vlastite politike privatnosti i usklađeni su s primjenjivim propisima o zaštiti podataka.',
    s8title: 'Vaša prava prema GDPR-u',
    s8body: 'Kao ispitanik imate sljedeća prava:',
    s8items: [
      { label: 'Pravo pristupa', desc: 'možete zatražiti informaciju o tome obrađujemo li vaše podatke i kopiju istih.' },
      { label: 'Pravo na ispravak', desc: 'možete zatražiti ispravak netočnih ili nepotpunih podataka.' },
      { label: 'Pravo na brisanje', desc: 'možete zatražiti brisanje vaših osobnih podataka („pravo na zaborav").' },
      { label: 'Pravo na ograničenje obrade', desc: 'možete zatražiti ograničenje obrade u određenim okolnostima.' },
      { label: 'Pravo na prenosivost podataka', desc: 'možete zatražiti prijenos vaših podataka u strukturiranom formatu.' },
      { label: 'Pravo na prigovor', desc: 'možete uložiti prigovor na obradu podataka temeljenu na legitimnom interesu.' },
      { label: 'Pravo na pritužbu', desc: (<>imate pravo podnijeti pritužbu nadzornom tijelu — Agencija za zaštitu osobnih podataka (AZOP), <a href="https://azop.hr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">azop.hr</a>.</>) },
    ],
    s9title: 'Sigurnost podataka',
    s9body: 'Primjenjujemo odgovarajuće tehničke i organizacijske mjere za zaštitu vaših osobnih podataka od neovlaštenog pristupa, gubitka, uništenja ili oštećenja. Ove mjere uključuju enkripciju podataka u prijenosu (HTTPS/TLS), ograničeni pristup podacima te redoviti pregled sigurnosnih praksi.',
    s10title: 'Kolačići i praćenje',
    s10highlight: 'Ova web stranica ne koristi kolačiće (cookies), analitičke alate, marketinške piksele niti bilo kakve druge tehnologije praćenja.',
    s10body: 'Ne pratimo vaše ponašanje na stranici, ne prikupljamo IP adrese u svrhe profiliranja i ne koristimo alate trećih strana za analitiku ili oglašavanje.',
    s11title: 'Kontakt za pitanja o privatnosti',
    s11body: 'Za sva pitanja vezana uz obradu vaših osobnih podataka, zahtjeve za brisanje podataka ili ostvarivanje bilo kojeg drugog prava iz ove politike, obratite nam se na:',
    s11email: 'E-mail',
    s11phone: 'Telefon',
    s11note: 'Odgovaramo na sve zahtjeve u roku od 30 dana, u skladu s GDPR-om.',
    s12title: 'Završne odredbe',
    s12body: 'Ova Politika privatnosti stupa na snagu danom objave na web stranici. Zadržavamo pravo ažuriranja ove politike u skladu s promjenama u zakonodavstvu ili poslovnim praksama. Sve promjene bit će objavljene na ovoj stranici.',
    s12date: 'Posljednje ažuriranje: veljača 2026.',
  },
  en: {
    link: 'Privacy Policy',
    title: 'Privacy Policy',
    close: 'Close',
    intro: (
      <p>
        This Privacy Policy explains how RatingFlow ("we", "us", "our") collects, uses and protects your
        personal data when you visit our website <strong>www.ratingflow.net</strong> or use our services.
        We are committed to protecting your privacy in accordance with the General Data Protection Regulation
        (GDPR) — Regulation (EU) 2016/679.
      </p>
    ),
    s2title: 'Data Controller',
    s2body: 'The data controller for personal data collected through this website is:',
    s2items: ['Company', 'Registered address', 'Email', 'Phone'],
    s2values: ['RatingFlow', 'Republic of Croatia, EU', 'vanja.devcic@gmail.com', '+385 91 595 9108'],
    s3title: 'What Data We Collect',
    s3body: 'Through the contact form on this website, we may collect the following personal data:',
    s3items: ['Full name', 'Business name', 'City', 'Email address', 'Phone number', 'Business type', 'Message (optional)'],
    s3note: (<><strong>We do not collect</strong> personal data automatically — this website does not use cookies, analytics tools, marketing pixels or any other tracking technologies (see the "Cookies and Tracking" section below).</>),
    s4title: 'Purpose and Legal Basis',
    s4body: 'We process your data for the following purposes:',
    s4items: [
      { label: 'Responding to your inquiry', desc: 'to contact you and respond to your question or request.', legal: 'Legal basis: Art. 6(1)(b) GDPR — taking steps prior to entering into a contract at your request.' },
      { label: 'Assessing business cooperation', desc: 'to evaluate the possibility of providing our services to your business.', legal: 'Legal basis: Art. 6(1)(f) GDPR — legitimate interest (communication with prospective clients).' },
    ],
    s5title: 'Our Roles in Data Processing',
    s5controller: 'Data Controller',
    s5controllerDesc: 'For personal data collected through the contact form on this website, we act as the data controller. This means we determine the purpose and means of processing your data.',
    s5processor: 'Data Processor',
    s5processorDesc: 'When working with clients to implement automations (e.g. review systems, WhatsApp notifications, automated replies), we may process personal data of our clients\' end-users on their behalf. In that case, our client is the data controller and we act as data processor under their instructions and pursuant to a Data Processing Agreement (DPA).',
    s6title: 'Data Retention',
    s6items: [
      { label: 'Inquiries without a contract:', desc: (<>If no contract follows your inquiry, we will retain your data for a maximum of <strong>12 months</strong> from the date of the inquiry, after which it will be deleted.</>)},
      { label: 'Active clients:', desc: 'We retain data for the duration of the contractual relationship and within the legally required periods after the end of cooperation.' },
    ],
    s7title: 'Data Sharing and Sub-processors',
    s7note: (<>We <strong>do not sell, rent or share</strong> your personal data with third parties for marketing purposes.</>),
    s7body: 'In the context of delivering services to our clients (not to website visitors), we may use the following third-party tools and platforms:',
    s7items: [
      { name: 'Make.com', desc: '— workflow automation platform' },
      { name: 'OpenAI API', desc: '— for generating review responses and analysing feedback' },
      { name: 'WhatsApp Business API (Meta)', desc: '— for sending notifications to clients' },
      { name: 'Google Business Profile API', desc: '— for managing reviews' },
    ],
    s7footer: 'These tools are used exclusively in the context of delivering services to our clients under agreed terms, and are not used to process data of this website\'s visitors. All listed providers have their own privacy policies and comply with applicable data protection regulations.',
    s8title: 'Your Rights Under GDPR',
    s8body: 'As a data subject, you have the following rights:',
    s8items: [
      { label: 'Right of access', desc: 'you may request confirmation of whether we process your data and obtain a copy.' },
      { label: 'Right to rectification', desc: 'you may request correction of inaccurate or incomplete data.' },
      { label: 'Right to erasure', desc: 'you may request deletion of your personal data ("right to be forgotten").' },
      { label: 'Right to restriction', desc: 'you may request restriction of processing in certain circumstances.' },
      { label: 'Right to data portability', desc: 'you may request transfer of your data in a structured format.' },
      { label: 'Right to object', desc: 'you may object to processing based on legitimate interest.' },
      { label: 'Right to lodge a complaint', desc: (<>you have the right to lodge a complaint with a supervisory authority — in Croatia: Agencija za zaštitu osobnih podataka (AZOP), <a href="https://azop.hr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">azop.hr</a>.</>) },
    ],
    s9title: 'Data Security',
    s9body: 'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, destruction or damage. These measures include encryption of data in transit (HTTPS/TLS), restricted access to data, and regular review of security practices.',
    s10title: 'Cookies and Tracking',
    s10highlight: 'This website does not use cookies, analytics tools, marketing pixels or any other tracking technologies.',
    s10body: 'We do not track your behaviour on the site, we do not collect IP addresses for profiling purposes, and we do not use any third-party tools for analytics or advertising.',
    s11title: 'Contact for Privacy Matters',
    s11body: 'For any questions regarding the processing of your personal data, requests for data deletion, or to exercise any right under this policy, please contact us at:',
    s11email: 'Email',
    s11phone: 'Phone',
    s11note: 'We respond to all requests within 30 days, in accordance with GDPR.',
    s12title: 'Final Provisions',
    s12body: 'This Privacy Policy takes effect from the date of publication on the website. We reserve the right to update this policy in line with changes in legislation or business practices. All changes will be published on this page.',
    s12date: 'Last updated: February 2026.',
  },
}

export default function PrivacyModal() {
  const [open, setOpen] = useState(false)
  const ctx = useContext(LangContext)
  const lang = ctx?.lang || 'hr'
  const t = pp[lang] || pp.hr

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-text-dim hover:text-text transition-colors text-xs cursor-pointer underline underline-offset-2"
      >
        {t.link}
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Politika privatnosti"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl border border-border bg-bg-card shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg-elevated/50 flex-shrink-0">
              <h2 className="font-display text-lg font-bold text-text">{t.title}</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-text-dim hover:text-text transition-colors p-1 cursor-pointer"
                aria-label={t.close}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="privacy-scroll overflow-y-auto px-6 py-5 text-sm text-text-muted leading-relaxed space-y-6">

                {/* 1. Introduction */}
                <section>{t.intro}</section>

                {/* 2. Data Controller */}
                <section>
                  <h3 className="text-base font-semibold text-text mb-2">{t.s2title}</h3>
                  <p>{t.s2body}</p>
                  <ul className="mt-2 space-y-1 pl-4">
                    {t.s2items.map((label, i) => (
                      <li key={i}>
                        <strong className="text-text">{label}:</strong>{' '}
                        {i === 2
                          ? <a href="mailto:vanja.devcic@gmail.com" className="text-accent hover:underline">{t.s2values[i]}</a>
                          : t.s2values[i]
                        }
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 3. What Data We Collect */}
                <section>
                  <h3 className="text-base font-semibold text-text mb-2">{t.s3title}</h3>
                  <p>{t.s3body}</p>
                  <ul className="mt-2 space-y-1 pl-4 list-disc list-inside">
                    {t.s3items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <p className="mt-2">{t.s3note}</p>
                </section>

                {/* 4. Purpose and Legal Basis */}
                <section>
                  <h3 className="text-base font-semibold text-text mb-2">{t.s4title}</h3>
                  <p>{t.s4body}</p>
                  <ul className="mt-2 space-y-2 pl-4">
                    {t.s4items.map((item, i) => (
                      <li key={i}>
                        <strong className="text-text">{item.label}</strong> — {item.desc}<br />
                        <span className="text-text-dim text-xs">{item.legal}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 5. Our Two Roles */}
                <section>
                  <h3 className="text-base font-semibold text-text mb-2">{t.s5title}</h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border border-border bg-bg-elevated/30">
                      <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">{t.s5controller}</p>
                      <p>{t.s5controllerDesc}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-bg-elevated/30">
                      <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">{t.s5processor}</p>
                      <p>{t.s5processorDesc}</p>
                    </div>
                  </div>
                </section>

                {/* 6. Data Retention */}
                <section>
                  <h3 className="text-base font-semibold text-text mb-2">{t.s6title}</h3>
                  <ul className="space-y-2 pl-4">
                    {t.s6items.map((item, i) => (
                      <li key={i}><strong className="text-text">{item.label}</strong> {item.desc}</li>
                    ))}
                  </ul>
                </section>

                {/* 7. Data Sharing and Processors */}
                <section>
                  <h3 className="text-base font-semibold text-text mb-2">{t.s7title}</h3>
                  <p>{t.s7note}</p>
                  <p className="mt-2">{t.s7body}</p>
                  <ul className="mt-2 space-y-1 pl-4 list-disc list-inside">
                    {t.s7items.map((item, i) => (
                      <li key={i}><strong className="text-text">{item.name}</strong> {item.desc}</li>
                    ))}
                  </ul>
                  <p className="mt-2">{t.s7footer}</p>
                </section>

                {/* 8. Your Rights Under GDPR */}
                <section>
                  <h3 className="text-base font-semibold text-text mb-2">{t.s8title}</h3>
                  <p>{t.s8body}</p>
                  <ul className="mt-2 space-y-2 pl-4">
                    {t.s8items.map((item, i) => (
                      <li key={i}><strong className="text-text">{item.label}</strong> — {item.desc}</li>
                    ))}
                  </ul>
                </section>

                {/* 9. Data Security */}
                <section>
                  <h3 className="text-base font-semibold text-text mb-2">{t.s9title}</h3>
                  <p>{t.s9body}</p>
                </section>

                {/* 10. Cookies and Tracking */}
                <section>
                  <h3 className="text-base font-semibold text-text mb-2">{t.s10title}</h3>
                  <div className="p-4 rounded-xl border border-accent/20 bg-accent/5">
                    <p><strong className="text-text">{t.s10highlight}</strong></p>
                    <p className="mt-2">{t.s10body}</p>
                  </div>
                </section>

                {/* 11. Contact for Privacy Matters */}
                <section>
                  <h3 className="text-base font-semibold text-text mb-2">{t.s11title}</h3>
                  <p>{t.s11body}</p>
                  <div className="mt-3 p-4 rounded-xl border border-border bg-bg-elevated/30">
                    <p><strong className="text-text">{t.s11email}:</strong>{' '}<a href="mailto:vanja.devcic@gmail.com" className="text-accent hover:underline">vanja.devcic@gmail.com</a></p>
                    <p className="mt-1"><strong className="text-text">{t.s11phone}:</strong> +385 91 595 9108</p>
                    <p className="mt-2 text-xs text-text-dim">{t.s11note}</p>
                  </div>
                </section>

                {/* 12. Final Provisions */}
                <section>
                  <h3 className="text-base font-semibold text-text mb-2">{t.s12title}</h3>
                  <p>{t.s12body}</p>
                  <p className="mt-3 text-xs text-text-dim">{t.s12date}</p>
                </section>

              </div>
            </div>
        </div>,
        document.body
      )}
    </>
  )
}
