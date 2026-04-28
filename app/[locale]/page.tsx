import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/shared'
import Hero from '@/components/home/Hero'
import ProblemReality from '@/components/home/ProblemReality'
import ServicesPillars from '@/components/home/ServicesPillars'
import FinancialIntelligenceSection from '@/components/home/FinancialIntelligenceSection'
import HowItWorksConsultive from '@/components/home/HowItWorksConsultive'
import UseCases from '@/components/home/UseCases'
import Testimonials from '@/components/home/Testimonials'
import OriginStory from '@/components/home/OriginStory'
import FAQ from '@/components/home/FAQ'
import FinalCTA from '@/components/home/FinalCTA'

type Props = {
  params: {
    locale: string
  }
}

export default function LocaleHomePage({ params }: Props) {
  if (!isLocale(params.locale)) notFound()

  return (
    <>
      <Hero />
      <div className="relative z-10">
        <ProblemReality />
        <div className="hidden sm:block mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#2F81F7]/20 to-transparent" />
        <ServicesPillars />
        <div className="hidden sm:block mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#2F81F7]/20 to-transparent" />
        <FinancialIntelligenceSection />
        <HowItWorksConsultive />
        <div className="hidden sm:block mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#2F81F7]/20 to-transparent" />
        <OriginStory />
        <UseCases />
        <Testimonials />
        <FAQ />
        <div className="hidden sm:block mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#2F81F7]/20 to-transparent" />
        <FinalCTA />
      </div>
    </>
  )
}
