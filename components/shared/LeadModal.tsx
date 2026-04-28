'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { useTranslation } from '@/lib/i18n/config'
import { trackEvent } from '@/lib/analytics'

type LeadModalProps = {
  open: boolean
  onClose: () => void
  source?: string
}

const WA_BASE = 'https://wa.me/59898260258'

const INPUT_CLS =
  'w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3 py-2.5 text-sm text-[#F0F6FC] placeholder-[#484F58] outline-none focus:border-[#2F81F7] transition-colors duration-150'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-[#8B949E] mb-1.5 uppercase tracking-wide">{label}</p>
      {children}
    </div>
  )
}

function SuccessState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-14 text-center">
      <div className="w-12 h-12 rounded-full bg-[#3FB950]/12 border border-[#3FB950]/25 flex items-center justify-center mb-5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3FB950" strokeWidth="2.5" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-base font-bold text-[#F0F6FC] mb-2">{title}</h3>
      <p className="text-sm text-[#8B949E] leading-relaxed max-w-xs">{body}</p>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

export default function LeadModal({ open, onClose, source = 'unknown' }: LeadModalProps) {
  const { t } = useTranslation()
  const lm = t.leadModal

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [mainProblem, setMainProblem] = useState('')
  const [preferredChannel, setPreferredChannel] = useState<'whatsapp' | 'email'>('whatsapp')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const reset = useCallback(() => {
    setName('')
    setEmail('')
    setCompany('')
    setCompanySize('')
    setMainProblem('')
    setPreferredChannel('whatsapp')
    setError(null)
    setLoading(false)
    setSuccess(false)
  }, [])

  const handleClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    reset()
    onClose()
  }, [onClose, reset])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, handleClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  if (!open) return null

  const validate = () => {
    if (!name.trim()) return lm.requiredField
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return lm.invalidEmail
    if (!company.trim()) return lm.requiredField
    return null
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (v) { setError(v); return }
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          companySize,
          mainProblem: mainProblem.trim(),
          preferredChannel,
          source,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok) {
        setError(data.error || lm.errorGeneric)
        setLoading(false)
        return
      }
      trackEvent('lead_submitted', { source, channel: preferredChannel })
      setLoading(false)
      setSuccess(true)
      if (preferredChannel === 'whatsapp') {
        const text = lm.waTemplate
          .replace('{name}', name.trim())
          .replace('{company}', company.trim())
          .replace('{size}', companySize || '—')
        window.open(`${WA_BASE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
      }
      closeTimerRef.current = setTimeout(handleClose, 2800)
    } catch {
      setError(lm.errorGeneric)
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label={lm.closeAria}
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-[#30363D] bg-[#161B22] shadow-[0_32px_80px_rgba(0,0,0,0.8)]">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#30363D] px-5 py-4">
          <div>
            <h2 id="lead-modal-title" className="text-base font-bold text-[#F0F6FC]">
              {lm.title}
            </h2>
            <p className="text-xs text-[#8B949E] mt-0.5 leading-relaxed max-w-xs">
              {lm.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="ml-4 flex-shrink-0 rounded-lg p-1.5 text-[#8B949E] hover:bg-[#21262D] hover:text-[#F0F6FC] transition-colors"
            aria-label={lm.closeAria}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {success ? (
          <SuccessState title={lm.successTitle} body={lm.successBody} />
        ) : (
          <form onSubmit={onSubmit} noValidate className="p-5 space-y-4">
            {error && (
              <p role="alert" className="text-xs text-[#F85149] bg-[#F85149]/8 border border-[#F85149]/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Field label={`${lm.fields.name} *`}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={INPUT_CLS}
                  autoComplete="name"
                  autoFocus
                />
              </Field>
              <Field label={`${lm.fields.email} *`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={INPUT_CLS}
                  autoComplete="email"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label={`${lm.fields.company} *`}>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={INPUT_CLS}
                  autoComplete="organization"
                />
              </Field>
              <Field label={lm.fields.size}>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className={INPUT_CLS}
                >
                  <option value="">{lm.sizePlaceholder}</option>
                  {lm.companySizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label={lm.fields.problem}>
              <textarea
                value={mainProblem}
                onChange={(e) => setMainProblem(e.target.value)}
                placeholder={lm.problemPlaceholder}
                rows={3}
                className={`${INPUT_CLS} resize-none`}
              />
            </Field>

            <div>
              <p className="text-[11px] font-semibold text-[#8B949E] mb-2 uppercase tracking-wide">
                {lm.channelLabel}
              </p>
              <div className="flex gap-2">
                {(['whatsapp', 'email'] as const).map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setPreferredChannel(ch)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-colors duration-150 ${
                      preferredChannel === ch
                        ? 'border-[#2F81F7] bg-[#2F81F7]/10 text-[#2F81F7]'
                        : 'border-[#30363D] bg-[#0D1117] text-[#8B949E] hover:border-[#484F58] hover:text-[#C9D1D9]'
                    }`}
                  >
                    {ch === 'whatsapp' ? <WhatsAppIcon /> : <EmailIcon />}
                    {lm.channelOptions[ch]}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-[#2F81F7] hover:bg-[#388BFD] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F81F7]"
            >
              {loading ? lm.sending : lm.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
