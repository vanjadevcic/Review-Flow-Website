import { useState, useEffect, useRef, createContext, useContext, Fragment } from 'react'
import { translations } from './translations'

const WHATSAPP_NUMBER = '385915959108'

const LangContext = createContext()

function useLang() {
  return useContext(LangContext)
}

const Icon = {
  Star: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Check: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ArrowRight: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Phone: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Shield: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  BarChart: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  MessageCircle: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  QrCode: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="3" height="3" /><line x1="21" y1="14" x2="21" y2="14.01" /><line x1="21" y1="21" x2="21" y2="21.01" /><line x1="17" y1="21" x2="17" y2="21.01" /><line x1="21" y1="17" x2="21" y2="17.01" />
    </svg>
  ),
  Repeat: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  X: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Menu: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  ChevronDown: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  TrendingUp: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Clock: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Share: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  Play: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  WhatsApp: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
}

const Stars = ({ count = 5, size = 'w-4 h-4' }) => (
  <span className="inline-flex gap-0.5">
    {[...Array(count)].map((_, i) => (
      <Icon.Star key={i} className={`${size} text-accent`} />
    ))}
  </span>
)

function BrandedText({ text }) {
  if (!text || !text.includes('ReviewFlow')) return text
  return text.split(/(ReviewFlow™?)/g).map((part, i) => {
    if (part === 'ReviewFlow') return <Fragment key={i}>Review<span className="text-accent">Flow</span></Fragment>
    if (part === 'ReviewFlow™') return <Fragment key={i}>Review<span className="text-accent">Flow</span>™</Fragment>
    return <Fragment key={i}>{part}</Fragment>
  })
}

const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`px-5 md:px-8 py-20 md:py-28 ${className}`}>
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
)

const SectionLabel = ({ children }) => (
  <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">{children}</p>
)

const SectionTitle = ({ children, className = '' }) => (
  <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-text ${className}`}>{children}</h2>
)

function StickyMobileCTA() {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const kontakt = document.getElementById('kontakt')
      const hero = document.querySelector('section')
      if (!kontakt || !hero) return
      const scrollY = window.scrollY
      const heroBottom = hero.offsetTop + hero.offsetHeight
      const kontaktTop = kontakt.offsetTop - window.innerHeight
      setVisible(scrollY > heroBottom && scrollY < kontaktTop)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="bg-bg/95 backdrop-blur-xl border-t border-border px-5 py-3">
        <a href="#kontakt" className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-bg font-semibold rounded-lg text-sm">
          <Icon.ArrowRight className="w-4 h-4" />
          {t.nav.cta}
        </a>
      </div>
    </div>
  )
}

function LangSwitcher() {
  const { lang, setLang } = useLang()
  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      <button onClick={() => setLang('hr')} className={`px-2 py-1 rounded transition-colors cursor-pointer ${lang === 'hr' ? 'bg-accent/15 text-accent' : 'text-text-muted hover:text-text'}`}>HR</button>
      <span className="text-border">|</span>
      <button onClick={() => setLang('en')} className={`px-2 py-1 rounded transition-colors cursor-pointer ${lang === 'en' ? 'bg-accent/15 text-accent' : 'text-text-muted hover:text-text'}`}>EN</button>
    </div>
  )
}

function Navbar() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 md:px-8 h-16">
        <a href="#" className="font-display text-2xl text-text tracking-tight font-extrabold">Review<span className="text-accent">Flow</span></a>
        <div className="hidden md:flex items-center gap-8">
          {t.nav.links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-text-muted hover:text-text transition-colors">{l.label}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <LangSwitcher />
          <a href="#kontakt" className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors">
            {t.nav.cta}
          </a>
        </div>
        <div className="flex md:hidden items-center gap-3">
          <LangSwitcher />
          <button onClick={() => setOpen(!open)} className="text-text-muted" aria-label={t.nav.menuLabel}>
            {open ? <Icon.X className="w-6 h-6" /> : <Icon.Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-xl">
          <div className="px-5 py-6 flex flex-col gap-4">
            {t.nav.links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-text-muted hover:text-text transition-colors py-1">{l.label}</a>
            ))}
            <a href="#kontakt" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent text-bg text-sm font-semibold rounded-lg">
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const { t, lang } = useLang()
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === 'hr' ? 'Pozdrav, zanima me ReviewFlow za moj lokal.' : 'Hi, I\'m interested in ReviewFlow for my venue.')}`
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-5 md:px-8 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-4xl text-center">
        <SectionLabel>{t.hero.label}</SectionLabel>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6">
          {t.hero.titleLine1Start}<span className="text-accent">★</span>{t.hero.titleLine1End}<br />
          {t.hero.titleLine2}<br />
          {t.hero.titleLine3}
        </h1>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          <BrandedText text={t.hero.desc} />
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.hero.ctaPrimary}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20bd5a] transition-colors text-base shadow-lg shadow-[#25D366]/20"
          >
            <Icon.WhatsApp className="w-5 h-5" />
            {t.hero.ctaPrimary}
          </a>
          <a href="#kontakt" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-text-muted font-medium rounded-lg hover:border-border-hover hover:text-text transition-colors text-base">
            {t.hero.ctaSecondary}
            <Icon.ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <p className="text-xs text-text-dim mb-8">{t.whatsapp.heroSub}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-3 text-sm text-text-muted">
          {t.hero.badges.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-2"><Icon.Check className="w-4 h-4 text-accent" />{b}</span>
          ))}
        </div>
      </div>
      <div className="mt-16 border-t border-border pt-8">
        <div className="mx-auto max-w-4xl flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-dim tracking-wide uppercase">
          {t.hero.bottomBar.map((item, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="hidden sm:inline text-border">•</span>}
              <span>{item}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

function Problem() {
  const { t } = useLang()
  return (
    <Section id="problem" className="border-t border-border">
      <div className="max-w-3xl">
        <SectionLabel>{t.problem.label}</SectionLabel>
        <SectionTitle>{t.problem.title}</SectionTitle>
        <p className="text-text-muted mt-4 mb-10 text-lg leading-relaxed">{t.problem.subtitle}</p>
        <ul className="space-y-5">
          {t.problem.painPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-4 text-text-muted">
              <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full border border-danger/30 bg-danger/10 flex items-center justify-center text-danger text-xs font-bold">{i + 1}</span>
              <span className="text-base leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
        {t.problem.businessImpact && (
          <div className="mt-10 p-5 md:p-6 rounded-xl border border-warning/20 bg-warning/5">
            <p className="text-sm text-text leading-relaxed">{t.problem.businessImpact}</p>
          </div>
        )}
      </div>
    </Section>
  )
}

function Solution() {
  const { t } = useLang()
  const cardIcons = [
    <Icon.QrCode className="w-6 h-6" />,
    <Icon.MessageCircle className="w-6 h-6" />,
    <Icon.Phone className="w-6 h-6" />,
    <Icon.BarChart className="w-6 h-6" />,
  ]

  return (
    <Section id="rjesenje" className="border-t border-border">
      <div className="text-center mb-14">
        <SectionLabel>{t.solution.label}</SectionLabel>
        <SectionTitle className="max-w-3xl mx-auto"><BrandedText text={t.solution.title} /></SectionTitle>
        <p className="text-text-muted mt-4 max-w-2xl mx-auto text-lg leading-relaxed">{t.solution.subtitle}</p>
      </div>
      <div className="mb-16 p-6 md:p-8 rounded-2xl border border-border bg-bg-card">
        <p className="text-sm text-text-dim uppercase tracking-wider mb-6 font-medium">{t.solution.processHeader}</p>
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          <div className="flex-1 p-5 rounded-xl bg-bg-elevated border border-border text-center">
            <Icon.QrCode className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="text-sm font-semibold text-text mb-1">{t.solution.qrTitle}</p>
            <p className="text-xs text-text-muted">{t.solution.qrDesc}</p>
          </div>
          <div className="flex items-center justify-center text-text-dim">
            <Icon.ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
          </div>
          <div className="flex-1 p-5 rounded-xl bg-bg-elevated border border-border text-center">
            <Stars count={5} size="w-4 h-4" />
            <p className="text-sm font-semibold text-text mt-2 mb-1">{t.solution.rateTitle}</p>
            <p className="text-xs text-text-muted">{t.solution.rateDesc}</p>
          </div>
          <div className="flex items-center justify-center text-text-dim">
            <Icon.ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
          </div>
          <div className="flex-1 grid grid-rows-2 gap-3">
            <div className="p-4 rounded-xl bg-success/10 border border-success/20 text-center">
              <p className="text-xs font-semibold text-success">4–5 ★</p>
              <p className="text-xs text-text-muted mt-1">{t.solution.highRating}</p>
            </div>
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 text-center">
              <p className="text-xs font-semibold text-warning">1–3 ★</p>
              <p className="text-xs text-text-muted mt-1">{t.solution.lowRating}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Services() {
  const { t } = useLang()
  const serviceIcons = [
    <Icon.TrendingUp className="w-6 h-6" />,
    <Icon.Shield className="w-6 h-6" />,
    <Icon.MessageCircle className="w-6 h-6" />,
    <Icon.BarChart className="w-6 h-6" />,
    <Icon.Repeat className="w-6 h-6" />,
  ]

  return (
    <Section id="usluge" className="border-t border-border">
      <div className="text-center mb-14">
        <SectionLabel>{t.services.label}</SectionLabel>
        <SectionTitle className="max-w-3xl mx-auto">{t.services.title}</SectionTitle>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {t.services.items.map((s, i) => (
          <div key={i} className="p-6 md:p-8 rounded-xl border border-border bg-bg-card hover:border-border-hover transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center text-accent flex-shrink-0">{serviceIcons[i]}</div>
              <h3 className="font-semibold text-text text-lg">{s.title}</h3>
            </div>
            <div className="space-y-3 pl-14">
              <div>
                <p className="text-xs text-text-dim uppercase tracking-wider mb-1 font-medium">{t.services.whatLabel}</p>
                <p className="text-sm text-text-muted leading-relaxed">{s.what}</p>
              </div>
              <div>
                <p className="text-xs text-text-dim uppercase tracking-wider mb-1 font-medium">{t.services.whyLabel}</p>
                <p className="text-sm text-text-muted leading-relaxed">{s.why}</p>
              </div>
              <div className="pt-2">
                <span className="inline-block text-xs font-medium text-accent bg-accent-muted px-3 py-1 rounded-full">{s.metric}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-text-dim mt-8">{t.services.disclaimer}</p>
    </Section>
  )
}

function HowItWorks() {
  const { t } = useLang()
  const nums = ['01', '02', '03']

  return (
    <Section id="kako-radi" className="border-t border-border">
      <div className="text-center mb-14">
        <SectionLabel>{t.howItWorks.label}</SectionLabel>
        <SectionTitle className="max-w-3xl mx-auto">{t.howItWorks.title}</SectionTitle>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {t.howItWorks.steps.map((s, i) => (
          <div key={i} className="relative p-6 md:p-8 rounded-xl border border-border bg-bg-card">
            <span className="text-5xl font-display text-accent/20 absolute top-4 right-6">{nums[i]}</span>
            <div className="relative">
              <h3 className="font-semibold text-text text-lg mb-3">{s.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="flex items-center gap-3 px-6 py-4 rounded-xl border border-border bg-bg-card">
          <Icon.Clock className="w-5 h-5 text-accent" />
          <div>
            <p className="text-sm font-semibold text-text">{t.howItWorks.setupTitle}</p>
            <p className="text-xs text-text-muted">{t.howItWorks.setupDesc}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 rounded-xl border border-accent/20 bg-accent-muted">
          <Icon.Check className="w-5 h-5 text-accent" />
          <div>
            <p className="text-sm font-semibold text-text">{t.howItWorks.runsTitle}</p>
            <p className="text-xs text-text-muted">{t.howItWorks.runsDesc}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Demo() {
  const { t } = useLang()
  return (
    <Section id="demo" className="border-t border-border">
      <div className="text-center mb-14">
        <SectionLabel>{t.demo.label}</SectionLabel>
        <SectionTitle className="max-w-3xl mx-auto">{t.demo.title}</SectionTitle>
      </div>
      <div className="mb-12 max-w-3xl mx-auto">
        <div className="relative aspect-video rounded-2xl border border-border bg-bg-card overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
              <Icon.Play className="w-7 h-7 text-accent ml-1" />
            </div>
            <p className="text-sm text-text-muted font-medium">{t.demo.videoText}</p>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-bg-elevated">
            <p className="text-xs text-text-dim uppercase tracking-wider font-medium">{t.demo.guestFlowHeader}</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-bg-elevated border border-border">
              <Icon.QrCode className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-text">{t.demo.scanTitle}</p>
                <p className="text-xs text-text-muted">{t.demo.scanDesc}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-bg-elevated border border-border text-center">
              <p className="text-xs text-text-muted mb-2">{t.demo.ratePrompt}</p>
              <Stars count={5} size="w-6 h-6" />
            </div>
            <div className="p-4 rounded-xl bg-success/5 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <Stars count={5} size="w-3 h-3" />
                <span className="text-xs font-medium text-success">{t.demo.rating5Label}</span>
              </div>
              <p className="text-sm text-text mb-3">{t.demo.rating5Text}</p>
              <span className="inline-block px-4 py-2 bg-success/20 text-success text-xs font-semibold rounded-lg">{t.demo.rating5Cta}</span>
            </div>
            <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <Stars count={2} size="w-3 h-3" />
                <span className="text-xs font-medium text-warning">{t.demo.rating2Label}</span>
              </div>
              <p className="text-sm text-text-muted">{t.demo.rating2Text}</p>
              <div className="bg-bg-elevated rounded-lg p-3 border border-border mt-2">
                <p className="text-xs text-text-dim italic">{t.demo.rating2Sample}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-bg-elevated">
            <p className="text-xs text-text-dim uppercase tracking-wider font-medium">{t.demo.ownerFlowHeader}</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="rounded-xl bg-[#0b3d2e] border border-[#1a5c3a] p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs font-bold">R</div>
                <div>
                  <p className="text-xs font-semibold text-[#e9edef]">ReviewFlow</p>
                  <p className="text-[10px] text-[#8696a0]">{t.demo.whatsappTime}</p>
                </div>
              </div>
              <div className="bg-[#005c4b] rounded-lg p-3 mb-2">
                <p className="text-xs text-[#e9edef] leading-relaxed">
                  ⚠️ <strong>{t.demo.whatsappAlert}</strong><br /><br />
                  {t.demo.whatsappLocation}<br />
                  {t.demo.whatsappRating}<br /><br />
                  <em>{t.demo.whatsappQuote}</em>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-[#005c4b] text-[#e9edef] text-[10px] font-medium rounded-lg">{t.demo.whatsappBtn1}</span>
                <span className="px-3 py-1.5 bg-[#005c4b] text-[#e9edef] text-[10px] font-medium rounded-lg">{t.demo.whatsappBtn2}</span>
                <span className="px-3 py-1.5 bg-[#005c4b] text-[#e9edef] text-[10px] font-medium rounded-lg">{t.demo.whatsappBtn3}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-text-dim uppercase tracking-wider mb-2 font-medium">{t.demo.replyHeader}</p>
              <div className="p-4 rounded-xl bg-bg-elevated border border-border">
                <p className="text-sm text-text-muted leading-relaxed italic">{t.demo.replyText}</p>
                <div className="flex gap-2 mt-3">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-semibold rounded">{t.demo.replyApprove}</span>
                  <span className="px-3 py-1 bg-bg-card text-text-muted text-[10px] font-semibold rounded border border-border">{t.demo.replyEdit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-bg-elevated">
            <p className="text-xs text-text-dim uppercase tracking-wider font-medium">{t.demo.reportHeader}</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-text">Konoba Mareta</p>
              <p className="text-xs text-text-dim">{t.demo.reportDate}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-bg-elevated border border-border text-center">
                <p className="text-xl font-bold text-accent">12</p>
                <p className="text-[10px] text-text-dim mt-1">{t.demo.reportNewReviews}</p>
              </div>
              <div className="p-3 rounded-lg bg-bg-elevated border border-border text-center">
                <p className="text-xl font-bold text-success">4.7</p>
                <p className="text-[10px] text-text-dim mt-1">{t.demo.reportAvgRating}</p>
              </div>
              <div className="p-3 rounded-lg bg-bg-elevated border border-border text-center">
                <p className="text-xl font-bold text-text">2</p>
                <p className="text-[10px] text-text-dim mt-1">{t.demo.reportComplaints}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-success uppercase tracking-wider mb-2 font-medium">{t.demo.reportPraiseHeader}</p>
              <ul className="space-y-1.5">
                {t.demo.reportPraises.map((p, i) => (
                  <li key={i} className="text-xs text-text-muted flex items-start gap-2"><span className="text-success mt-0.5">+</span> {p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-warning uppercase tracking-wider mb-2 font-medium">{t.demo.reportComplaintHeader}</p>
              <ul className="space-y-1.5">
                {t.demo.reportComplaintsList.map((c, i) => (
                  <li key={i} className="text-xs text-text-muted flex items-start gap-2"><span className="text-warning mt-0.5">–</span> {c}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-accent uppercase tracking-wider mb-2 font-medium">{t.demo.reportActionsHeader}</p>
              <ul className="space-y-1.5">
                {t.demo.reportActions.map((a, i) => (
                  <li key={i} className="text-xs text-text-muted">• {a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function ROICounter() {
  const { t } = useLang()
  const ref = useRef(null)
  const triggered = useRef(false)
  const [vals, setVals] = useState({ tables: 0, avg: 0, total: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          const start = performance.now()
          const animate = (now) => {
            const p = Math.min((now - start) / 1800, 1)
            setVals({
              tables: Math.floor(p * 5),
              avg: Math.floor(p * 18),
              total: Math.floor(p * 360),
            })
            if (p < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <p ref={ref} className="text-2xl md:text-3xl font-display text-text mb-3">
      {vals.tables}{t.results.roiPrefix}{vals.avg}{t.results.roiMiddle}<span className="text-accent">€{vals.total}{t.results.roiSuffix}</span>
    </p>
  )
}

function Results() {
  const { t } = useLang()
  return (
    <Section id="rezultati" className="border-t border-border">
      <div className="text-center mb-14">
        <SectionLabel>{t.results.label}</SectionLabel>
        <SectionTitle className="max-w-3xl mx-auto"><BrandedText text={t.results.title} /></SectionTitle>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {t.results.groups.map((g, i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-bg-card">
            <p className="text-sm font-semibold text-accent mb-4">{g.label}</p>
            <ul className="space-y-3">
              {g.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-text-muted">
                  <Icon.Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl border border-accent/20 bg-accent-muted text-center">
        <p className="text-sm text-accent font-medium uppercase tracking-wider mb-3">{t.results.calcLabel}</p>
        <ROICounter />
        <p className="text-sm text-text-muted">{t.results.calcFooter}</p>
      </div>
    </Section>
  )
}

function Packages() {
  const { t } = useLang()
  const planMeta = [
    { setup: '€490', monthly: '€149', highlight: false, isCustom: false },
    { setup: '€790', monthly: '€249', highlight: true, isCustom: false },
    { setup: null, monthly: null, highlight: false, isCustom: true },
  ]

  return (
    <Section id="cijene" className="border-t border-border">
      <div className="text-center mb-14">
        <SectionLabel>{t.packages.label}</SectionLabel>
        <SectionTitle className="max-w-3xl mx-auto">{t.packages.title}</SectionTitle>
        <p className="text-text-muted mt-4 text-lg">{t.packages.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {t.packages.plans.map((p, i) => {
          const m = planMeta[i]
          return (
            <div key={i} className={`relative flex flex-col p-6 md:p-8 rounded-2xl border transition-all ${m.highlight ? 'border-accent bg-accent-muted md:scale-105 shadow-lg shadow-accent/10 z-10' : 'border-border bg-bg-card'}`}>
              {m.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest bg-accent text-bg px-4 py-1 rounded-full">{t.packages.badge}</span>
              )}
              <p className="text-lg font-semibold text-text mb-1">{p.name}</p>
              <p className="text-sm text-text-muted mb-6">{p.desc}</p>
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-text">{m.isCustom ? t.packages.customLabel : m.monthly}</span>
                  {!m.isCustom && <span className="text-sm text-text-muted">{t.packages.perMonth}</span>}
                </div>
                {!m.isCustom && <p className="text-xs text-text-dim mt-1">+ {m.setup} {t.packages.setupLabel}</p>}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-text-muted">
                    <Icon.Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${
                  m.highlight
                    ? 'bg-accent text-bg hover:bg-accent-hover'
                    : 'border border-border text-text hover:border-border-hover'
                }`}
              >
                {m.isCustom ? t.packages.ctaContact : t.packages.ctaStart}
                <Icon.ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )
        })}
      </div>
      <div className="mt-8 text-center">
        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/20 bg-accent-muted text-sm text-accent font-medium">
          <Icon.Clock className="w-4 h-4" />
          {t.packages.trial}
        </span>
      </div>
      <div className="mt-12 max-w-2xl mx-auto p-6 rounded-2xl border border-success/20 bg-success/5 text-center">
        <p className="text-lg font-semibold text-text mb-2">{t.packages.riskTitle}</p>
        <p className="text-sm text-text-muted leading-relaxed mb-4">{t.packages.riskText}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-xs text-text-dim">
          <span>{t.packages.valueAnchor1}</span>
          <span className="hidden sm:inline text-border">•</span>
          <span>{t.packages.valueAnchor2}</span>
        </div>
      </div>
    </Section>
  )
}

function Trust() {
  const { t } = useLang()
  return (
    <Section id="sigurnost" className="border-t border-border">
      <div className="text-center mb-14">
        <SectionLabel>{t.trust.label}</SectionLabel>
        <SectionTitle className="max-w-3xl mx-auto">{t.trust.title}</SectionTitle>
        <p className="text-text-muted mt-4 text-lg">{t.trust.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {t.trust.compliance.map((c, i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-bg-card">
            <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center text-accent mb-4">
              <Icon.Shield className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-text mb-2">{c.title}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {t.trust.reliability.map((r, i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-bg-card flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center text-accent flex-shrink-0">
              <Icon.Check className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-text mb-1">{r.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function FAQ() {
  const { t } = useLang()
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <Section id="faq" className="border-t border-border">
      <div className="text-center mb-14">
        <SectionLabel>{t.faq.label}</SectionLabel>
        <SectionTitle className="max-w-3xl mx-auto">{t.faq.title}</SectionTitle>
      </div>
      <div className="max-w-3xl mx-auto divide-y divide-border">
        {t.faq.items.map((f, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer"
              aria-expanded={openIdx === i}
            >
              <span className="text-base font-medium text-text">{f.q}</span>
              <Icon.ChevronDown className={`w-5 h-5 text-text-dim flex-shrink-0 transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${openIdx === i ? 'max-h-96 pb-5' : 'max-h-0'}`}>
              <p className="text-sm text-text-muted leading-relaxed">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function WhatsAppCTA() {
  const { t, lang } = useLang()
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === 'hr' ? 'Pozdrav, zanima me ReviewFlow za moj lokal.' : 'Hi, I\'m interested in ReviewFlow for my venue.')}`

  return (
    <section className="px-5 md:px-8 py-16 md:py-20 border-t border-border">
      <div className="mx-auto max-w-3xl p-8 md:p-12 rounded-2xl border border-border bg-bg-card/50 text-center">
        <SectionLabel>{t.whatsapp.ctaLabel}</SectionLabel>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight text-text mb-4">{t.whatsapp.ctaTitle}</h2>
        <p className="text-text-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8">{t.whatsapp.ctaText}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.whatsapp.ctaPrimary}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20bd5a] transition-colors text-base shadow-lg shadow-[#25D366]/20"
          >
            <Icon.WhatsApp className="w-5 h-5" />
            {t.whatsapp.ctaPrimary}
          </a>
          <a
            href="#kontakt"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-text-muted font-medium rounded-lg hover:border-border-hover hover:text-text transition-colors text-base"
          >
            {t.whatsapp.ctaSecondary}
            <Icon.ArrowRight className="w-4 h-4" />
          </a>
        </div>
        {t.whatsapp.ctaPersonal && <p className="text-xs text-text-dim">{t.whatsapp.ctaPersonal}</p>}
      </div>
    </section>
  )
}

function FloatingWhatsApp() {
  const { t, lang } = useLang()
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === 'hr' ? 'Pozdrav, zanima me ReviewFlow za moj lokal.' : 'Hi, I\'m interested in ReviewFlow for my venue.')}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.floatingLabel}
      className="fixed bottom-20 right-5 z-40 md:hidden w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transition-shadow animate-[wa-pulse_2s_ease-in-out_1]"
    >
      <Icon.WhatsApp className="w-7 h-7" />
    </a>
  )
}

function Contact() {
  const { t } = useLang()
  const [formData, setFormData] = useState({
    name: '', businessName: '', city: '', phone: '', email: '', type: 'restaurant', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('https://formspree.io/f/xpwzgkjl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
    } catch (err) {
      // silently continue
    }
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <Section id="kontakt" className="border-t border-border">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <SectionLabel>{t.contact.label}</SectionLabel>
          <SectionTitle>{t.contact.title}</SectionTitle>
          <p className="text-text-muted mt-4 text-lg leading-relaxed mb-8">{t.contact.subtitle}</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center text-accent">
                <Icon.Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-dim">{t.contact.emailLabel}</p>
                <a href="mailto:kirkkodre@gmail.com" className="text-sm text-text hover:text-accent transition-colors">kirkkodre@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center text-accent">
                <Icon.Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-dim">{t.contact.phoneLabel}</p>
                <a href="tel:0480356090" className="text-sm text-text hover:text-accent transition-colors">0480 356 090</a>
              </div>
            </div>
          </div>
          <p className="text-sm text-text-dim mt-6 flex items-center gap-2">
            <Icon.Clock className="w-4 h-4" />
            {t.contact.responseTime}
          </p>
        </div>
        <div>
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 rounded-2xl border border-accent/20 bg-accent-muted">
              <Icon.Check className="w-12 h-12 text-accent mb-4" />
              <p className="text-xl font-semibold text-text mb-2">{t.contact.successTitle}</p>
              <p className="text-sm text-text-muted">{t.contact.successText}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl border border-border bg-bg-card space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs text-text-dim mb-1.5 font-medium">{t.contact.formName}</label>
                  <input
                    id="name" type="text" required
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-lg text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
                    placeholder={t.contact.formNamePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="businessName" className="block text-xs text-text-dim mb-1.5 font-medium">{t.contact.formBusiness}</label>
                  <input
                    id="businessName" type="text" required
                    value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-lg text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
                    placeholder={t.contact.formBusinessPlaceholder}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="city" className="block text-xs text-text-dim mb-1.5 font-medium">{t.contact.formCity}</label>
                  <input
                    id="city" type="text" required
                    value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-lg text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
                    placeholder={t.contact.formCityPlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs text-text-dim mb-1.5 font-medium">{t.contact.formPhone}</label>
                  <input
                    id="phone" type="tel" required
                    value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-lg text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
                    placeholder={t.contact.formPhonePlaceholder}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-xs text-text-dim mb-1.5 font-medium">{t.contact.formEmail}</label>
                  <input
                    id="email" type="email" required
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-lg text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
                    placeholder={t.contact.formEmailPlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-xs text-text-dim mb-1.5 font-medium">{t.contact.formType}</label>
                  <select
                    id="type"
                    value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-lg text-sm text-text focus:outline-none focus:border-accent transition-colors appearance-none"
                  >
                    {t.contact.formTypeOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs text-text-dim mb-1.5 font-medium">{t.contact.formMessage}</label>
                <textarea
                  id="message" rows="3"
                  value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-lg text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder={t.contact.formMessagePlaceholder}
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-hover transition-colors text-base cursor-pointer"
              >
                {submitting ? t.contact.formSubmitting : t.contact.formSubmit}
                {!submitting && <Icon.ArrowRight className="w-4 h-4" />}
              </button>
              <p className="text-xs text-text-dim text-center">{t.contact.formFooter}</p>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}

function Footer() {
  const { t } = useLang()
  const currentYear = new Date().getFullYear()
  return (
    <footer className="border-t border-border px-5 md:px-8 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-display text-2xl text-text tracking-tight font-extrabold mb-1">Review<span className="text-accent">Flow</span></p>
            <p className="text-sm text-text-muted">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
            {t.nav.links.map(l => (
              <a key={l.href} href={l.href} className="hover:text-text transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-dim">© {currentYear} Review<span className="text-accent">Flow</span>. {t.footer.copyright}</p>
          <div className="flex items-center gap-4 text-xs text-text-dim">
            <a href="mailto:kirkkodre@gmail.com" className="hover:text-text transition-colors">kirkkodre@gmail.com</a>
            <span className="text-border">•</span>
            <a href="tel:0480356090" className="hover:text-text transition-colors">0480 356 090</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('rf-lang') || 'hr' } catch { return 'hr' }
  })
  const [loaded, setLoaded] = useState(false)

  const t = translations[lang]

  useEffect(() => { setLoaded(true) }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('rf-lang', lang) } catch {}
    document.title = t.meta.title
    const setMeta = (sel, attr, val) => {
      const el = document.querySelector(sel)
      if (el) el.setAttribute(attr, val)
    }
    setMeta('meta[name="description"]', 'content', t.meta.desc)
    setMeta('meta[property="og:title"]', 'content', t.meta.ogTitle)
    setMeta('meta[property="og:description"]', 'content', t.meta.ogDesc)
    setMeta('meta[name="twitter:title"]', 'content', t.meta.twitterTitle)
    setMeta('meta[name="twitter:description"]', 'content', t.meta.twitterDesc)
  }, [lang, t])

  return (
    <LangContext.Provider value={{ t, lang, setLang }}>
      <div className={`min-h-screen bg-bg text-text font-body transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <Hero />
        <Problem />
        <Solution />
        <Services />
        <HowItWorks />
        <Demo />
        <Results />
        <Packages />
        <Trust />
        <FAQ />
        <WhatsAppCTA />
        <Contact />
        <Footer />
        <StickyMobileCTA />
        <FloatingWhatsApp />
      </div>
    </LangContext.Provider>
  )
}
