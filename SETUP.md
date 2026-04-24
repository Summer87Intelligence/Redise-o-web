# Summer87 — Setup

## Requisitos
- Node.js 18+
- npm / yarn / pnpm

## Arrancar el proyecto

```bash
npm install
npm run dev
```

La web corre en http://localhost:3000

## Estructura de páginas
- `/` — Landing completa
- `/demo` — Formulario multi-step de demo
- `/como-funciona` — Proceso de setup + integraciones + seguridad
- `/pricing` — Planes y precios
- `/faq` — Preguntas frecuentes

## Variables de entorno
Creá un `.env.local` para agregar:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Agregar API keys según integraciones (Resend, etc.)
```

## Personalización rápida
- **Colores**: `tailwind.config.ts`
- **Copy del hero**: `components/home/Hero.tsx`
- **Precios**: `components/home/PricingSection.tsx` (constante `plans`)
- **Integraciones**: `components/home/Integrations.tsx` (constante `integrations`)
- **Testimonios**: `components/home/Testimonials.tsx` (constante `testimonials`)
- **FAQ**: `components/home/FAQ.tsx` (constante `faqs`)
