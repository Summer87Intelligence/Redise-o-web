'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n/config'

type AlertType = 'warning' | 'danger' | 'success'
type Trend = 'up' | 'down' | 'neutral'
type ChatRole = 'user' | 'assistant'

const alertStyles: Record<AlertType, { border: string; bg: string; color: string }> = {
  warning: { border: '#D29922', bg: 'rgba(210,153,34,0.06)', color: '#D29922' },
  danger: { border: '#F85149', bg: 'rgba(248,81,73,0.06)', color: '#F85149' },
  success: { border: '#3FB950', bg: 'rgba(63,185,80,0.06)', color: '#3FB950' },
}

function AlertIcon({ type }: { type: AlertType }) {
  if (type === 'danger')
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374l7.578-13.48c.866-1.5 3.032-1.5 3.898 0l7.578 13.48z" />
      </svg>
    )
  if (type === 'warning')
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
      </svg>
    )
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export default function DashboardPreview() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'metricas' | 'alertas' | 'copilot'>('metricas')
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<Array<{ role: ChatRole; message: string }>>(
    t.dashboard.copilot.initialMessages.map((item) => ({
      role: item.role as ChatRole,
      message: item.message,
    }))
  )
  const [sending, setSending] = useState(false)

  function handleSend() {
    if (!chatInput.trim()) return
    const userMsg = chatInput.trim()
    setChatInput('')
    setSending(true)
    setMessages((prev) => [...prev, { role: 'user', message: userMsg }])
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          message: t.dashboard.copilot.generatedReply,
        },
      ])
      setSending(false)
    }, 1200)
  }

  return (
    <section className="py-24 bg-[#0A0E14] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,129,247,0.05),transparent_70%)] pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
            <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
              {t.dashboard.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4 text-balance">
            {t.dashboard.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
              {t.dashboard.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-[#8B949E] max-w-2xl mx-auto leading-relaxed">
            {t.dashboard.description}
          </p>
        </div>

        <div className="rounded-2xl border border-[#30363D] bg-[#161B22] shadow-[0_32px_100px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-[#30363D] bg-[#0D1117]/70">
            <div className="flex gap-1.5" aria-hidden>
              <div className="w-3 h-3 rounded-full bg-[#F85149]/60" />
              <div className="w-3 h-3 rounded-full bg-[#D29922]/60" />
              <div className="w-3 h-3 rounded-full bg-[#3FB950]/60" />
            </div>
            <div className="flex-1 mx-3 max-w-xs">
              <div className="h-5 bg-[#21262D] rounded-md flex items-center px-3">
                <span className="text-[#484F58] text-xs">{t.dashboard.frame.appUrl}</span>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3FB950]/10 border border-[#3FB950]/20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3FB950] animate-pulse" />
                <span className="text-[#3FB950] text-xs font-medium">{t.dashboard.frame.live}</span>
              </div>
            </div>
          </div>

          <div className="flex h-[560px]">
            <div className="hidden sm:flex flex-col w-52 border-r border-[#30363D] bg-[#0D1117]/40 p-4 gap-1">
              {[
                { id: 'metricas', label: t.dashboard.tabs.metrics, icon: '▦' },
                { id: 'alertas', label: t.dashboard.tabs.alerts, icon: '◎', badge: '3' },
                { id: 'copilot', label: t.dashboard.tabs.copilot, icon: '✦' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as typeof activeTab)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 w-full text-left ${
                    activeTab === item.id
                      ? 'bg-[#2F81F7]/15 text-[#2F81F7] border border-[#2F81F7]/25'
                      : 'text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#21262D]'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="w-5 h-5 rounded-full bg-[#F85149]/20 text-[#F85149] text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}

              <div className="mt-auto pt-4 border-t border-[#30363D]">
                <p className="text-[#484F58] text-[10px] leading-relaxed">
                  {t.dashboard.sidebarHint}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-5">
              {activeTab === 'metricas' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-[#484F58] text-xs uppercase tracking-widest font-medium">{t.dashboard.metricsHeader.greeting}</p>
                      <p className="text-[#F0F6FC] font-semibold">
                        {t.dashboard.metricsHeader.summaryPrefix}{' '}
                        <span className="text-[#F85149]">{t.dashboard.metricsHeader.urgent}</span>{' '}
                        {t.dashboard.metricsHeader.summarySuffix}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {t.dashboard.metrics.map((m, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl border transition-colors ${
                          m.trend === 'down'
                            ? 'bg-[#F85149]/5 border-[#F85149]/20'
                            : 'bg-[#21262D] border-[#30363D] hover:border-[#484F58]'
                        }`}
                      >
                        <p className="text-[#484F58] text-[10px] uppercase tracking-widest font-medium mb-2">
                          {m.label}
                        </p>
                        <p className="text-[#F0F6FC] font-bold text-lg font-mono leading-none mb-1">
                          {m.value}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {m.trend === 'up' && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="#3FB950" aria-hidden><path d="M5 2l4 6H1l4-6z" /></svg>
                          )}
                          {m.trend === 'down' && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="#F85149" aria-hidden><path d="M5 8L1 2h8L5 8z" /></svg>
                          )}
                          <span className={`text-xs font-semibold ${m.trend === 'up' ? 'text-[#3FB950]' : m.trend === 'down' ? 'text-[#F85149]' : 'text-[#8B949E]'}`}>
                            {m.change}
                          </span>
                          <span className="text-[#484F58] text-xs">{m.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl border-l-[3px] border-[#F85149] bg-[#F85149]/6">
                    <svg className="w-4 h-4 text-[#F85149] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374l7.578-13.48c.866-1.5 3.032-1.5 3.898 0l7.578 13.48z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F85149] text-xs font-bold uppercase tracking-wide">{t.dashboard.urgentCard.title}</p>
                      <p className="text-[#8B949E] text-xs mt-0.5 leading-relaxed">
                        {t.dashboard.urgentCard.body}
                      </p>
                    </div>
                    <button className="text-[#F85149] text-xs font-bold hover:underline flex-shrink-0">
                      {t.dashboard.urgentCard.action}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'alertas' && (
                <div className="space-y-3 animate-fade-in">
                  <p className="text-[#484F58] text-xs uppercase tracking-widest font-medium mb-4">
                    {t.dashboard.alertsHeader}
                  </p>
                  {t.dashboard.alerts.map((alert, i) => {
                    const style = alertStyles[alert.type as AlertType]
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl border-l-[3px]"
                        style={{ borderLeftColor: style.border, backgroundColor: style.bg }}
                      >
                        <div style={{ color: style.color }} className="mt-0.5 flex-shrink-0">
                          <AlertIcon type={alert.type as AlertType} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-[#F0F6FC] mb-1">{alert.title}</p>
                          <p className="text-[#8B949E] text-xs leading-relaxed">{alert.body}</p>
                        </div>
                        <button className="text-xs font-bold flex-shrink-0 hover:underline" style={{ color: style.color }}>
                          {alert.action}
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}

              {activeTab === 'copilot' && (
                <div className="flex flex-col h-full animate-fade-in">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#30363D]">
                    <div className="w-6 h-6 rounded-md bg-[#2F81F7]/15 border border-[#2F81F7]/30 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2F81F7" strokeWidth="2.5" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[#2F81F7] text-sm font-bold">{t.dashboard.copilot.title}</span>
                      <p className="text-[#484F58] text-xs">{t.dashboard.copilot.subtitle}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3FB950] animate-pulse" />
                      <span className="text-[#3FB950] text-xs">{t.dashboard.copilot.status}</span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto space-y-3 mb-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-[#21262D] text-[#8B949E] italic border border-[#30363D]'
                              : 'bg-[#2F81F7]/8 border border-[#2F81F7]/15 text-[#F0F6FC]'
                          }`}
                        >
                          {msg.message.split('\n').map((line, j) => (
                            <p key={j} className={j > 0 ? 'mt-2' : ''}>{line}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                    {sending && (
                      <div className="flex justify-start">
                        <div className="bg-[#2F81F7]/8 border border-[#2F81F7]/15 rounded-xl px-4 py-3">
                          <div className="flex gap-1 items-center">
                            {[0, 1, 2].map((j) => (
                              <div key={j} className="w-1.5 h-1.5 rounded-full bg-[#2F81F7] animate-pulse" style={{ animationDelay: `${j * 150}ms` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                      placeholder={t.dashboard.copilot.placeholder}
                      className="flex-1 bg-[#21262D] border border-[#30363D] rounded-xl px-4 py-2.5 text-sm text-[#F0F6FC] placeholder-[#484F58] focus:outline-none focus:border-[#2F81F7] transition-colors"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!chatInput.trim() || sending}
                      className="w-10 h-10 rounded-xl bg-[#2F81F7] hover:bg-[#388BFD] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
                      aria-label={t.dashboard.copilot.sendAria}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" aria-hidden>
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-5 rounded-2xl border border-[#30363D] bg-[#161B22]">
          <p className="text-[#8B949E] text-sm text-center sm:text-left">
            <span className="text-[#F0F6FC] font-semibold">{t.dashboard.footerCta}</span>
            {' '}{t.dashboard.footerDescription}
          </p>
          <a
            href="#demo"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#2F81F7] hover:bg-[#388BFD] rounded-xl transition-colors shadow-glow-sm"
          >
            {t.dashboard.footerButton}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
