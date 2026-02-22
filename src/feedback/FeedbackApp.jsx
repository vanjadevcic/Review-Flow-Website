import { useState, useEffect, useCallback } from 'react'
import { LangContext, useLang } from '../LangContext'
import { feedbackTranslations } from './translations'
import { getQueryParams } from './utils'
import RatingForm from './RatingForm'

const STATES = { LOADING: 'loading', READY: 'ready', INVALID_LINK: 'invalid_link', NOT_FOUND: 'not_found' }

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

function applyTheme(config) {
  if (!config) return
  const root = document.documentElement.style
  if (config.primary_color) root.setProperty('--color-accent', config.primary_color)
  if (config.secondary_color) root.setProperty('--color-accent-hover', config.secondary_color)
  if (config.background_color) root.setProperty('--color-bg', config.background_color)
  if (config.text_color) root.setProperty('--color-text', config.text_color)
}

function resetTheme() {
  const root = document.documentElement.style
  root.removeProperty('--color-accent')
  root.removeProperty('--color-accent-hover')
  root.removeProperty('--color-bg')
  root.removeProperty('--color-text')
}

function FeedbackContent({ onConfigLoaded }) {
  const { t } = useLang()
  const { clientId, locationId } = getQueryParams()
  const [config, setConfig] = useState(null)
  const [status, setStatus] = useState(STATES.LOADING)

  useEffect(() => {
    if (!clientId) {
      setStatus(STATES.INVALID_LINK)
      return
    }

    let cancelled = false

    fetch(`/api/client?client_id=${encodeURIComponent(clientId)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        if (!data || !data.business_name) {
          setStatus(STATES.NOT_FOUND)
          return
        }
        setConfig(data)
        applyTheme(data)
        onConfigLoaded(data)
        setStatus(STATES.READY)
      })
      .catch(() => {
        if (!cancelled) setStatus(STATES.NOT_FOUND)
      })

    return () => {
      cancelled = true
      resetTheme()
    }
  }, [clientId, locationId, onConfigLoaded])

  return (
    <div className="min-h-dvh bg-bg flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-2xl">

        {status === STATES.LOADING && (
          <div className="flex justify-center py-20">
            <svg className="w-8 h-8 text-accent animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}

        {status === STATES.INVALID_LINK && (
          <div className="text-center py-20">
            <p className="text-text-muted text-sm">{t.invalidLink}</p>
          </div>
        )}

        {status === STATES.NOT_FOUND && (
          <div className="text-center py-20">
            <p className="text-text-muted text-sm">{t.clientNotFound}</p>
          </div>
        )}

        {status === STATES.READY && config && (
          <RatingForm config={config} clientId={clientId} locationId={locationId} LangSwitcher={LangSwitcher} />
        )}

        <p className="text-center text-text-dim text-xs mt-10">
          Powered by <span className="font-display font-bold">Rating<span className="text-accent">Flow</span></span>
        </p>
      </div>
    </div>
  )
}

export default function FeedbackApp() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('rf-lang') || 'hr' } catch { return 'hr' }
  })

  const t = feedbackTranslations[lang]

  const handleConfigLoaded = useCallback((data) => {
    if (data.language && feedbackTranslations[data.language]) {
      setLang(data.language)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('rf-lang', lang) } catch {}
  }, [lang])

  return (
    <LangContext.Provider value={{ t, lang, setLang }}>
      <FeedbackContent onConfigLoaded={handleConfigLoaded} />
    </LangContext.Provider>
  )
}
