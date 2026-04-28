type AnalyticsPayload = Record<string, unknown> | undefined

/**
 * Abstracción para medición. Sin GA4 aún: consola en dev, hook para dataLayer luego.
 */
export function trackEvent(eventName: string, payload?: AnalyticsPayload) {
  if (typeof window === 'undefined') return

  const body = { event: eventName, ...payload }
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', eventName, payload)
  }
  const dl = (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer
  if (Array.isArray(dl)) {
    dl.push(body)
  }
}
