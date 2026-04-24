import Hero from '@/components/home/Hero'
import ProblemSection from '@/components/home/ProblemSection'
import WhatIsSummer87 from '@/components/home/WhatIsSummer87'
import ServicesPillars from '@/components/home/ServicesPillars'
import HowItWorks from '@/components/home/HowItWorks'
import DashboardPreview from '@/components/home/DashboardPreview'
import UseCases from '@/components/home/UseCases'
import Integrations from '@/components/home/Integrations'
import Testimonials from '@/components/home/Testimonials'
import PricingSection from '@/components/home/PricingSection'
import FAQ from '@/components/home/FAQ'
import FinalCTA from '@/components/home/FinalCTA'

export default function LocalizedHomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <WhatIsSummer87 />
      <ServicesPillars />
      <HowItWorks />
      <DashboardPreview />
      <UseCases />
      <Integrations />
      <Testimonials />
      <PricingSection />
      <FAQ />
      <FinalCTA />
    </>
  )
}
