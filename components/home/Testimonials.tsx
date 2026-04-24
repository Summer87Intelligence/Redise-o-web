'use client'
import { useTranslation } from '@/lib/i18n/config'

export default function Testimonials() {
  const { t } = useTranslation()
  const testimonials = t.testimonials.items
  return (
    <section className="py-24 bg-[#0D1117] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(47,129,247,0.04),transparent_60%)] pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
            <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
              {t.testimonials.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4 text-balance">
            {t.testimonials.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
              {t.testimonials.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-[#8B949E] max-w-xl mx-auto leading-relaxed">
            {t.testimonials.description}
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid p-6 rounded-2xl border border-[#30363D] bg-[#161B22] hover:border-[#484F58] hover:bg-[#1A1F26] transition-all duration-200"
            >
              <div className="flex gap-1 mb-4" aria-label={t.testimonials.starsAria}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#D29922" aria-hidden>
                    <path d="M7 1l1.545 3.13 3.455.502-2.5 2.436.59 3.44L7 8.875l-3.09 1.633.59-3.44L2 4.632l3.455-.502L7 1z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-[#8B949E] text-sm leading-relaxed mb-5">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold mb-5"
                style={{ color: item.metricColor, backgroundColor: `${item.metricColor}12`, border: `1px solid ${item.metricColor}25` }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill={item.metricColor} aria-hidden>
                  <path d="M5 1l1.236 2.505L9 3.91l-2 1.948.472 2.752L5 7.5 2.528 8.61 3 5.858 1 3.91l2.764-.405L5 1z" />
                </svg>
                {item.metric}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#30363D]">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
                >
                  {item.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-[#F0F6FC] text-sm font-semibold truncate">{item.author}</p>
                  <p className="text-[#484F58] text-xs truncate">
                    {item.role} · {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.testimonials.stats.map((stat, i) => (
            <div key={i} className="text-center p-5 rounded-2xl border border-[#30363D] bg-[#161B22]">
              <p className="font-black text-3xl font-mono mb-1" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-[#484F58] text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
