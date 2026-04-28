'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/lib/i18n/config'

export default function Footer() {
  const { t, locale } = useTranslation()
  const footerLinks = {
    [t.footer.links.producto]: [
      { label: t.footer.links.comoFunciona, href: '#como-funciona' },
      { label: t.footer.links.pricing, href: '#servicios' },
      { label: t.footer.links.copilot, href: '#servicios' },
      { label: t.footer.links.integrations, href: '#integraciones' },
    ],
    [t.footer.links.empresa]: [
      { label: t.footer.links.casos, href: '#casos-de-uso' },
      { label: t.footer.links.blog, href: '/blog' },
      { label: t.footer.links.faq, href: '#faq' },
      { label: t.footer.links.contacto, href: '#contacto' },
    ],
    [t.footer.links.legal]: [
      { label: t.footer.links.privacidad, href: '/legal/privacidad' },
      { label: t.footer.links.terminos, href: '/legal/terminos' },
      { label: t.footer.links.seguridad, href: '/legal/seguridad' },
    ],
  }
  return (
    <footer className="bg-[#0A0E14] border-t border-[#30363D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-4">
              <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/10">
                <Image
                  src="/summer87-logo.png"
                  alt="Summer87"
                  width={34}
                  height={34}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-md object-cover"
                />
              </div>
              <span className="font-bold text-[#F0F6FC] text-lg tracking-tight">Summer87</span>
            </Link>
            <p className="text-[#8B949E] text-sm leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
            <div className="mt-6">
              <p className="text-[#484F58] text-xs mb-2 uppercase tracking-wider font-medium">
                {t.footer.contact}
              </p>
              <div className="space-y-1.5">
                <a
                  href="mailto:hola@summer87.ai"
                  className="block text-[#8B949E] hover:text-[#2F81F7] text-sm transition-colors cursor-pointer"
                >
                  hola@summer87.ai
                </a>
                <a
                  href="https://wa.me/59898260258"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#8B949E] hover:text-[#2F81F7] text-sm transition-colors cursor-pointer"
                >
                  WhatsApp: +598 98 260 258
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=World+Trade+Center+Torre+4+piso+40+Montevideo+Uruguay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#8B949E] hover:text-[#2F81F7] text-sm transition-colors cursor-pointer"
                >
                  World Trade Center Torre 4 piso 40, Montevideo, Uruguay
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-[#F0F6FC] text-sm font-semibold mb-4">{category}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#8B949E] hover:text-[#F0F6FC] text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#30363D] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#484F58] text-sm">
            © {new Date().getFullYear()} Summer87. {t.footer.rights}
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3FB950] animate-pulse" />
            <span className="text-[#484F58] text-xs">{t.footer.systems}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
