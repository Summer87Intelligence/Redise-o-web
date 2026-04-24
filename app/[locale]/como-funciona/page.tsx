import type { Metadata } from 'next'
import HowItWorks from '@/components/home/HowItWorks'
import Integrations from '@/components/home/Integrations'
import FinalCTA from '@/components/home/FinalCTA'
import { DEFAULT_LOCALE, SEO_BY_LOCALE, isLocale } from '@/lib/i18n/shared'

type Props = { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
  const titleMap = {
    es: 'Cómo funciona',
    en: 'How it works',
    de: 'So funktioniert es',
  } as const
  return {
    title: titleMap[locale],
    description: SEO_BY_LOCALE[locale].description,
    alternates: {
      canonical: `/${locale}/como-funciona`,
      languages: {
        es: '/es/como-funciona',
        en: '/en/como-funciona',
        de: '/de/como-funciona',
      },
    },
  }
}

export default function ComoFuncionaPage() {
  return (
    <div className="pt-16">
      <div className="bg-[#0D1117] py-16 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(47,129,247,0.08), transparent)',
          }}
          aria-hidden
        />
        <div className="relative max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
            <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
              Sin complejidad
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#F0F6FC] mb-4 leading-tight">
            Setup en 48 horas.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
              Primera insight antes de 7 días.
            </span>
          </h1>
          <p className="text-lg text-[#8B949E] leading-relaxed">
            Sin consultores, sin proyectos largos, sin código. Conectás tus herramientas y Summer87 hace el resto.
          </p>
        </div>
      </div>

      <HowItWorks />
      <Integrations />
      <FinalCTA />
    </div>
  )
}
