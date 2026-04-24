'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/config'

type Step = 1 | 2 | 3

function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <p className="text-[#8B949E] text-sm font-medium mb-3">{label}</p>
      <div className="grid grid-cols-1 gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
              value === opt
                ? 'border-[#2F81F7] bg-[#2F81F7]/10'
                : 'border-[#30363D] bg-[#21262D] hover:border-[#484F58]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                value === opt ? 'border-[#2F81F7]' : 'border-[#484F58]'
              }`}
            >
              {value === opt && <div className="w-2 h-2 rounded-full bg-[#2F81F7]" />}
            </div>
            <input
              type="radio"
              name={label}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="sr-only"
            />
            <span className="text-[#F0F6FC] text-sm">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function CheckGroup({
  label,
  options,
  values,
  onChange,
}: {
  label: string
  options: string[]
  values: string[]
  onChange: (v: string[]) => void
}) {
  const toggle = (opt: string) => {
    onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt])
  }
  return (
    <div>
      <p className="text-[#8B949E] text-sm font-medium mb-3">{label}</p>
      <div className="grid grid-cols-1 gap-2">
        {options.map((opt) => {
          const checked = values.includes(opt)
          return (
            <label
              key={opt}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                checked ? 'border-[#2F81F7] bg-[#2F81F7]/10' : 'border-[#30363D] bg-[#21262D] hover:border-[#484F58]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                  checked ? 'border-[#2F81F7] bg-[#2F81F7]' : 'border-[#484F58]'
                }`}
              >
                {checked && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2">
                    <path d="M2 5l2.5 2.5L8 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(opt)}
                className="sr-only"
              />
              <span className="text-[#F0F6FC] text-sm">{opt}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default function DemoPage() {
  const { t, locale } = useTranslation()
  const roles = t.demo.roles
  const sizes = t.demo.sizes
  const industries = t.demo.industries
  const revenues = t.demo.revenues
  const problems = t.demo.problems
  const urgencies = t.demo.urgencies
  const [step, setStep] = useState<Step>(1)
  const [submitted, setSubmitted] = useState(false)

  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [size, setSize] = useState('')
  const [industry, setIndustry] = useState('')
  const [revenue, setRevenue] = useState('')
  const [selectedProblems, setSelectedProblems] = useState<string[]>([])
  const [urgency, setUrgency] = useState('')

  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center pt-16 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#3FB950]/10 border border-[#3FB950]/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#3FB950]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-[#F0F6FC] mb-3">{t.demo.successTitle}</h1>
          <p className="text-[#8B949E] mb-8 leading-relaxed">
            {t.demo.successDescriptionPrefix} <strong className="text-[#F0F6FC]">{email}</strong> {t.demo.successDescriptionSuffix}
          </p>
          <div className="p-4 rounded-xl border border-[#30363D] bg-[#161B22] text-left mb-6">
            <p className="text-[#484F58] text-xs uppercase tracking-wider font-medium mb-3">
              {t.demo.successListTitle}
            </p>
            <ul className="space-y-2">
              {t.demo.successList.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[#8B949E] text-sm">
                  <svg className="w-4 h-4 text-[#3FB950] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Link href={`/${locale}`} className="text-[#2F81F7] hover:underline text-sm">
            ← {t.demo.backHome}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D1117] pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">

          {/* Left: form */}
          <div className="lg:col-span-3">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                {([1, 2, 3] as Step[]).map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                        step === s
                          ? 'bg-[#2F81F7] border-[#2F81F7] text-white'
                          : step > s
                          ? 'bg-[#3FB950]/15 border-[#3FB950]/30 text-[#3FB950]'
                          : 'bg-[#21262D] border-[#30363D] text-[#484F58]'
                      }`}
                    >
                      {step > s ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        s
                      )}
                    </div>
                    {s < 3 && <div className={`flex-1 h-px w-8 ${step > s ? 'bg-[#3FB950]/30' : 'bg-[#30363D]'}`} />}
                  </div>
                ))}
                <span className="ml-2 text-[#484F58] text-xs">{t.demo.step} {step} {t.demo.of} 3</span>
              </div>
              <div className="h-1 bg-[#21262D] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2F81F7] to-[#60A5FA] rounded-full transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-black text-[#F0F6FC] mb-1">{t.demo.step1.title}</h1>
                  <p className="text-[#8B949E] text-sm">{t.demo.step1.subtitle}</p>
                </div>
                <RadioGroup label={t.demo.step1.roleLabel} options={roles} value={role} onChange={setRole} />
                <div>
                  <label htmlFor="name" className="block text-[#8B949E] text-sm font-medium mb-2">
                    {t.demo.step1.nameLabel}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.demo.step1.namePlaceholder}
                    className="w-full bg-[#21262D] border border-[#30363D] rounded-xl px-4 py-3 text-[#F0F6FC] placeholder-[#484F58] focus:outline-none focus:border-[#2F81F7] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#8B949E] text-sm font-medium mb-2">
                    {t.demo.step1.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.demo.step1.emailPlaceholder}
                    className="w-full bg-[#21262D] border border-[#30363D] rounded-xl px-4 py-3 text-[#F0F6FC] placeholder-[#484F58] focus:outline-none focus:border-[#2F81F7] transition-colors text-sm"
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!role || !name || !email}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-[#2F81F7] hover:bg-[#388BFD] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {t.demo.continue}
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-black text-[#F0F6FC] mb-1">{t.demo.step2.title}</h1>
                  <p className="text-[#8B949E] text-sm">{t.demo.step2.subtitle}</p>
                </div>
                <RadioGroup label={t.demo.step2.sizeLabel} options={sizes} value={size} onChange={setSize} />
                <RadioGroup label={t.demo.step2.industryLabel} options={industries} value={industry} onChange={setIndustry} />
                <RadioGroup label={t.demo.step2.revenueLabel} options={revenues} value={revenue} onChange={setRevenue} />
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 rounded-xl font-bold text-sm text-[#8B949E] border border-[#30363D] hover:border-[#484F58] bg-[#161B22] hover:bg-[#21262D] transition-all"
                  >
                    {t.demo.back}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!size || !industry || !revenue}
                    className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white bg-[#2F81F7] hover:bg-[#388BFD] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    {t.demo.continue}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-black text-[#F0F6FC] mb-1">{t.demo.step3.title}</h1>
                  <p className="text-[#8B949E] text-sm">{t.demo.step3.subtitle}</p>
                </div>
                <CheckGroup
                  label={t.demo.step3.problemsLabel}
                  options={problems}
                  values={selectedProblems}
                  onChange={setSelectedProblems}
                />
                <RadioGroup
                  label={t.demo.step3.urgencyLabel}
                  options={urgencies}
                  value={urgency}
                  onChange={setUrgency}
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3.5 rounded-xl font-bold text-sm text-[#8B949E] border border-[#30363D] hover:border-[#484F58] bg-[#161B22] hover:bg-[#21262D] transition-all"
                  >
                    {t.demo.back}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={selectedProblems.length === 0 || !urgency}
                    className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white bg-[#2F81F7] hover:bg-[#388BFD] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(47,129,247,0.3)]"
                  >
                    {t.demo.reserve} →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: info panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              <div className="p-5 rounded-2xl border border-[#30363D] bg-[#161B22]">
                <h3 className="text-[#F0F6FC] font-bold text-base mb-4">{t.demo.panel.title}</h3>
                <ul className="space-y-3">
                  {t.demo.panel.bullets.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#2F81F7]/10 border border-[#2F81F7]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#2F81F7" strokeWidth="2">
                          <path d="M2 5l2.5 2.5L8 3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-[#8B949E] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              <div className="p-5 rounded-2xl border border-[#30363D] bg-[#161B22]">
                <div className="flex gap-1 mb-3" aria-label={t.demoExtra.starsAria}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#D29922" aria-hidden>
                      <path d="M6 1l1.236 2.505L10 3.91l-2 1.948.472 2.752L6 7.5 3.528 8.61 4 5.858 2 3.91l2.764-.405L6 1z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-[#8B949E] text-sm leading-relaxed mb-3">
                  &ldquo;{t.demo.panel.quote}&rdquo;
                </blockquote>
                <p className="text-[#484F58] text-xs">{t.demo.panel.author}</p>
              </div>

              {/* Guarantee */}
              <div className="flex items-start gap-3 p-4 rounded-xl border border-[#3FB950]/20 bg-[#3FB950]/5">
                <svg className="w-5 h-5 text-[#3FB950] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <div>
                  <p className="text-[#3FB950] text-xs font-bold mb-0.5">{t.demo.panel.guaranteeTitle}</p>
                  <p className="text-[#8B949E] text-xs leading-relaxed">
                    {t.demo.panel.guaranteeBody}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
