export const LOCALES = ['es', 'en', 'de'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'es'
export const STORAGE_KEY = 'locale'

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale)
}

export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch',
}

export const LOCALE_CODE: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
  de: 'DE',
}

export const SITE_URL = 'https://summer87.com'

export const SEO_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Summer87 — Tu negocio en claro',
    description:
      'Summer87 integra business intelligence, copilotos con IA y automatización operativa para mejorar visibilidad, coordinación y toma de decisiones.',
  },
  en: {
    title: 'Summer87 — Intelligence, Copilot and Automation',
    description:
      'Summer87 combines business intelligence, AI copilot guidance and workflow automation to improve visibility, operations and decision support.',
  },
  de: {
    title: 'Summer87 — Intelligence, Copilot und Automation',
    description:
      'Summer87 verbindet Business Intelligence, KI-Copilot und Workflow-Automation für bessere Transparenz, operative Steuerung und Entscheidungsunterstützung.',
  },
}
