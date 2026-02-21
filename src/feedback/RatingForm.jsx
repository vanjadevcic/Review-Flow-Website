import { useEffect, useState } from 'react'
import { useLang } from '../LangContext'
import StarRating from './StarRating'
import PrivacyModal from '../PrivacyPolicy'

const STATES = { IDLE: 'idle', SUBMITTING: 'submitting', SUCCESS: 'success', ERROR: 'error' }

export default function RatingForm({ config, clientId, locationId, LangSwitcher }) {
  const { t } = useLang()
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(STATES.IDLE)
  const isNegative = rating >= 1 && rating <= 3
  const hasContactInfo = phone.trim() || email.trim() || name.trim()
  const [showPrivacyNote, setShowPrivacyNote] = useState(false)
  const [isPrivacyLeaving, setIsPrivacyLeaving] = useState(false)

  useEffect(() => {
    if (hasContactInfo) {
      setShowPrivacyNote(true)
      setIsPrivacyLeaving(false)
      return
    }

    if (showPrivacyNote) {
      setIsPrivacyLeaving(true)
      const timer = setTimeout(() => {
        setShowPrivacyNote(false)
        setIsPrivacyLeaving(false)
      }, 220)
      return () => clearTimeout(timer)
    }
  }, [hasContactInfo, showPrivacyNote])

  const canSubmit =
    isNegative &&
    message.trim().length > 0 &&
    status !== STATES.SUBMITTING

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return

    setStatus(STATES.SUBMITTING)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          location_id: locationId,
          rating,
          message: message.trim(),
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          consent: false,
        }),
      })

      if (!res.ok) throw new Error('Submit failed')
      setStatus(STATES.SUCCESS)
    } catch {
      setStatus(STATES.ERROR)
    }
  }

  if (status === STATES.SUCCESS) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/15 flex items-center justify-center">
          <svg className="w-8 h-8 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-text mb-2">
          {t.successTitle}
        </h2>
        <p className="text-text-muted text-sm">
          {t.successSubtitle}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Logo & Business Name */}
      <div className="text-center">
        {config.logo_url && (
          <img
            src={config.logo_url}
            alt={config.business_name}
            className="w-20 h-20 mx-auto mb-4 rounded-2xl object-contain bg-bg-elevated border border-border"
          />
        )}
        <h1 className="font-display text-xl font-bold text-text">
          {config.business_name}
        </h1>
        {LangSwitcher && (
          <div className="mt-5 flex justify-center">
            <LangSwitcher />
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="text-center space-y-4">
        <p className="text-text-muted text-sm">
          {t.rateTitle}
        </p>
        <StarRating rating={rating} onRate={setRating} starAriaLabel={t.starAriaLabel} />
      </div>

      {/* Positive rating → Google review */}
      {rating >= 4 && (
        <div className="text-center animate-fade-in">
          <a
            href={config.google_review_link}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-hover transition-colors text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {t.googleReviewBtn}
          </a>
        </div>
      )}

      {/* Negative rating → Feedback form */}
      {isNegative && (
        <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl border border-border bg-bg-card/80 backdrop-blur-sm space-y-5 animate-fade-in">
          <div>
            <label htmlFor="feedback-message" className="block text-xs text-text-dim mb-1.5 font-medium">
              {t.messageLabel}
            </label>
            <textarea
              id="feedback-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-xl text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all resize-none"
              placeholder={t.messagePlaceholder}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label htmlFor="feedback-name" className="block text-xs text-text-dim mb-1.5 font-medium">
                {t.nameLabel}
              </label>
              <input
                id="feedback-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-xl text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                placeholder={t.namePlaceholder}
              />
            </div>
            <div>
              <label htmlFor="feedback-phone" className="block text-xs text-text-dim mb-1.5 font-medium">
                {t.phoneLabel}
              </label>
              <input
                id="feedback-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-xl text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                placeholder={t.phonePlaceholder}
              />
            </div>
            <div>
              <label htmlFor="feedback-email" className="block text-xs text-text-dim mb-1.5 font-medium">
                {t.emailLabel}
              </label>
              <input
                id="feedback-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-xl text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                placeholder={t.emailPlaceholder}
              />
            </div>
          </div>

          {showPrivacyNote && (
            <div className={`text-[11px] text-text-dim leading-relaxed space-y-1 ${isPrivacyLeaving ? 'animate-[fade-out_220ms_ease-out_forwards]' : 'animate-fade-in'}`}>
              <p>{t.privacyNotice}</p>
              <span className="[&>button]:text-[11px]">
                <PrivacyModal />
              </span>
            </div>
          )}

          {status === STATES.ERROR && (
            <p className="text-danger text-sm text-center">
              {t.errorText}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-bg font-semibold rounded-xl hover:brightness-110 transition-all text-base cursor-pointer shadow-lg shadow-accent/20 hover:shadow-accent/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === STATES.SUBMITTING ? (
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t.submitting}
              </span>
            ) : (
              <>
                {t.submitBtn}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
