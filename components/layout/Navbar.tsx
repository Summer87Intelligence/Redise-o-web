'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { LanguageSwitcher, useTranslation } from '@/lib/i18n/config'

export default function Navbar() {
  const { t, locale } = useTranslation()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('servicios')
  const navLinks = [
    { id: 'servicios', label: t.navbarExtra.servicesLabel, href: `/${locale}#servicios` },
    { id: 'como-funciona', label: t.navbar.links.comoFunciona, href: `/${locale}#como-funciona` },
    { id: 'casos-de-uso', label: t.navbar.links.casos, href: `/${locale}#casos-de-uso` },
    { id: 'pricing', label: t.navbar.links.pricing, href: `/${locale}#pricing` },
    { id: 'faq', label: t.navbar.links.faq, href: `/${locale}#faq` },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: '-96px 0px -55% 0px',
        threshold: [0.1, 0.25, 0.4, 0.6],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname, locale])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D1117]/90 backdrop-blur-md border-b border-[#30363D]/80'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5 group" aria-label={t.navbar.aria.home}>
            <div className="w-8 h-8 rounded-lg bg-[#2F81F7] flex items-center justify-center shadow-[0_0_12px_rgba(47,129,247,0.4)] group-hover:shadow-[0_0_20px_rgba(47,129,247,0.5)] transition-shadow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2L10.5 6.5H13.5L11 9.5L12 13.5L8 11L4 13.5L5 9.5L2.5 6.5H5.5L8 2Z"
                  fill="white"
                  fillOpacity="0.95"
                />
              </svg>
            </div>
            <span className="font-bold text-[#F0F6FC] text-lg tracking-tight">Summer87</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label={t.navbar.aria.nav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-150 border ${
                  activeSection === link.id
                    ? 'text-[#2F81F7] bg-[#2F81F7]/10 border-[#2F81F7]/20'
                    : 'text-[#8B949E] hover:text-[#F0F6FC] border-transparent hover:bg-[#161B22]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden md:block" />
            <Link
              href={`/${locale}#demo`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#2F81F7] hover:bg-[#388BFD] rounded-lg transition-colors duration-150 shadow-glow-sm hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F81F7]"
            >
              {t.navbar.cta}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#161B22] transition-colors"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t.navbar.aria.close : t.navbar.aria.open}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 6l8 8M14 6l-8 8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0D1117]/95 backdrop-blur-md border-b border-[#30363D]">
          <nav className="px-4 py-4 space-y-1" aria-label={t.navbar.aria.mobileMenu}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                  activeSection === link.id
                    ? 'text-[#2F81F7] bg-[#2F81F7]/10 border-[#2F81F7]/20'
                    : 'text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#161B22] border-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}#demo`}
              onClick={() => setMobileOpen(false)}
              className="block mt-2 px-3 py-3 text-center text-sm font-semibold text-white bg-[#2F81F7] hover:bg-[#388BFD] rounded-lg transition-colors"
            >
              {t.navbar.cta}
            </Link>
            <div className="pt-2">
              <LanguageSwitcher className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
