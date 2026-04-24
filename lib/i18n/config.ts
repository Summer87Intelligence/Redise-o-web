'use client'

import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  DEFAULT_LOCALE,
  LOCALES,
  STORAGE_KEY,
  isLocale,
  type Locale,
} from '@/lib/i18n/shared'

const esDictionary = {
  es: {
    navbar: { links: { producto: 'Producto', comoFunciona: 'Cómo funciona', casos: 'Casos de uso', pricing: 'Pricing', faq: 'FAQ' }, cta: 'Reservar demo', aria: { home: 'Summer87 inicio', nav: 'Navegación principal', open: 'Abrir menú', close: 'Cerrar menú', mobileMenu: 'Menú mobile' } },
    hero: { badge: 'El copiloto financiero que te faltaba', title: 'Dejá de adivinar.', titleHighlight: 'Empezá a decidir.', description: 'Summer87 lee tus datos financieros, detecta qué está fallando y te dice exactamente qué hacer.', descriptionStrong: 'No es un reporte. Es una respuesta.', sub: 'Para founders que prefieren mover el negocio en lugar de analizarlo.', ctaPrimary: 'Quiero claridad para mi negocio', ctaSecondary: 'Ver cómo funciona', social: '120+ empresas ya entienden sus números', trial: 'Prueba gratis 14 días · Sin tarjeta · Setup en 48h' },
    problem: { badge: 'El problema real', title: 'El problema no es que te falten datos.', titleHighlight: 'Es que nadie te los traduce.', description: 'Cada día que tu negocio opera sin claridad financiera es un día que dejás plata sobre la mesa.', cards: [{ headline: 'Tus datos viven en 5 herramientas. Tu claridad, en ninguna.', body: 'Stripe te dice cuánto facturaste. QuickBooks cuánto gastaste. El CRM cuánto vendiste. Ninguna te dice qué está pasando ni qué hacer.', cost: 'Costo real: decisiones con información incompleta todos los días.' }, { headline: 'Cuando llega el reporte, el momento ya pasó.', body: 'El cierre mensual llega tarde. Para entonces ya tomaste decisiones sin la info correcta y el costo se multiplica.', cost: 'Costo real: siempre reaccionás tarde y el margen se erosiona.' }, { headline: 'Sabés que algo está mal, pero no dónde.', body: 'Cae el margen: ¿CAC, churn, ticket promedio o todo junto? Sin correlación solo queda adivinar.', cost: 'Costo real: tiempo y dinero en el problema equivocado.' }], note: 'Summer87 no es otra herramienta para sumar a tu stack.', noteHighlight: 'Es la capa que conecta todo y te dice qué hacer.' },
    whatIs: { badge: 'Qué es Summer87', title: 'La inteligencia financiera', titleHighlight: 'que antes solo tenían las grandes.', description: 'Summer87 interpreta tus datos y te recomienda el siguiente movimiento en lenguaje de negocio.', features: [{ title: 'Te dice qué hacer, no solo qué pasó', description: 'No solo detecta la caída: explica la causa y prioriza la primera acción de hoy.' }, { title: 'Filtra el ruido y prioriza impacto', description: 'Menos métricas, más foco. Cada mañana recibís solo lo que mueve el resultado.' }, { title: 'Habla como un CFO', description: 'Sin dashboards crípticos. Te responde como alguien que decide, no como un analista.' }, { title: 'Detecta desvíos antes de que duelan', description: 'Monitorea 24/7 y te alerta cuando todavía estás a tiempo de corregir.' }], isNotTitle: 'Summer87 NO es', isNotSub: 'Para que no pierdas tiempo comparando mal', isNotItems: ['Un software contable', 'Un CRM o ERP', 'Un dashboard que configurás y olvidás', 'Una herramienta que requiere analistas', 'Otro reporte tarde y sin contexto', 'Power BI con otro nombre'], isTitle: 'Summer87 SÍ es', isDescription: 'Tu analista financiero con IA: conecta datos, interpreta contexto y te dice qué mover hoy.', stats: [{ value: '48h', label: 'Para el primer setup', sublabel: 'Sin consultores' }, { value: '< 7d', label: 'Para el primer insight', sublabel: 'Garantizado' }, { value: '30d', label: 'Para ROI visible', sublabel: 'O te devolvemos todo' }] },
    dashboard: {
      badge: 'Producto real e interactivo',
      title: 'Esto es lo que ve un founder',
      titleHighlight: 'usando Summer87 cada día.',
      description: 'No es un screenshot de marketing: es el producto real.',
      tabs: { metrics: 'Dashboard', alerts: 'Alertas urgentes', copilot: 'Copilot' },
      frame: { appUrl: 'app.summer87.com/dashboard', live: 'Live' },
      sidebarHint: 'Probá el Copilot. Preguntá cualquier cosa sobre tu negocio.',
      metricsHeader: { greeting: 'Buen día, Martín', summaryPrefix: 'Hoy tenés', urgent: '2 acciones urgentes', summarySuffix: 'y 1 oportunidad.' },
      metrics: [
        { label: 'MRR', value: '48.2K', change: '+12%', trend: 'up', detail: 'vs. mes anterior' },
        { label: 'CAC', value: 'USD 320', change: '+28%', trend: 'down', detail: 'URGENTE - revisar ahora' },
        { label: 'LTV', value: 'USD 4.8K', change: '+5%', trend: 'up', detail: 'promedio por cliente' },
        { label: 'Churn', value: '2.3%', change: '+0.4pp', trend: 'down', detail: 'ultimos 30 dias' },
        { label: 'Runway', value: '14 mo.', change: 'estable', trend: 'neutral', detail: 'con burn actual' },
        { label: 'NRR', value: '108%', change: '+3pp', trend: 'up', detail: 'retencion neta' },
      ],
      urgentCard: { title: 'Accion urgente hoy', body: 'CAC subio 28% en 7 dias. Cada semana sin accion suma una perdida de USD 4.2K.', action: 'Que hacer ->' },
      alertsHeader: '3 alertas activas ordenadas por impacto economico',
      alerts: [
        { type: 'danger', title: 'CAC subio 28% - accion requerida esta semana', body: 'Canal Meta quemando USD 4.2K/semana con conversion en baja. Reasignar presupuesto a Google puede revertirlo en 10 dias.', action: 'Que hacer ->' },
        { type: 'warning', title: '2 clientes en riesgo de churn - contactar antes del viernes', body: 'Acme Corp y Nexo sin actividad en 42 y 38 dias. ARR combinado en riesgo: USD 36K.', action: 'Ver clientes ->' },
        { type: 'success', title: 'Margen bruto mejorando - oportunidad de expansion', body: 'El margen mejoro 1.8pp este mes. Momento ideal para escalar el canal de mayor conversion.', action: 'Ver analisis ->' },
      ],
      copilot: {
        title: 'Summer87 Copilot',
        subtitle: 'Preguntame cualquier cosa sobre tus numeros',
        status: 'Activo',
        placeholder: 'Por que bajo mi margen? Cual es mi riesgo principal hoy?',
        sendAria: 'Enviar pregunta',
        initialMessages: [
          { role: 'user', message: 'Que tengo que hacer esta semana?' },
          { role: 'assistant', message: 'Tres prioridades, en orden de impacto:\n\n1) Reduci 30% el presupuesto de Meta y movelo a Google.\n\n2) Llama hoy a Acme Corp y Nexo.\n\n3) El resto puede esperar.' },
        ],
        generatedReply: 'Con tus datos actuales, el principal driver es la caida de conversion en Enterprise. Te recomiendo revisar hoy el pipeline con ventas para evitar impacto en forecast.',
      },
      footerCta: 'Queres ver esto con tus datos reales?',
      footerDescription: 'En 30 minutos te mostramos exactamente como se veria tu negocio.',
      footerButton: 'Ver mi demo personalizada',
    },
    pricing: { badge: 'Pricing', title: 'Menos de lo que cuesta', titleHighlight: 'una mala decisión.', description: 'Un cliente retenido por una alerta de Summer87 paga el plan anual.', sub: '14 días gratis · Sin tarjeta · Cancelás cuando quieras', monthly: 'Mensual', annual: 'Anual', save: 'Ahorrá 20%' },
    faq: {
      badge: 'Preguntas frecuentes',
      title: 'Todo lo que necesitás',
      titleHighlight: 'saber.',
      description: 'Si tu pregunta no está acá, escribinos a',
      categories: [
        {
          title: 'Producto',
          items: [
            { question: 'Qué hace exactamente Summer87?', answer: 'Summer87 conecta tus fuentes financieras y operativas, interpreta los datos con IA y te recomienda acciones concretas.' },
            { question: 'En qué se diferencia de Power BI o Tableau?', answer: 'Power BI y Tableau requieren analistas. Summer87 está diseñado para decisiones ejecutivas sin depender de un equipo de datos.' },
            { question: 'Qué es el Copilot?', answer: 'Es una interfaz conversacional para preguntar en lenguaje natural y recibir respuestas accionables sobre tu negocio.' },
            { question: 'Necesito un equipo de datos para usar Summer87?', answer: 'No. El setup lo hacemos nosotros en 48 horas y el producto está pensado para founders y directivos.' },
          ],
        },
        {
          title: 'Implementacion',
          items: [
            { question: 'Cuánto tiempo lleva el setup?', answer: 'El setup básico toma 48 horas y en la primera semana ya tenés insights accionables.' },
            { question: 'Qué integraciones tienen disponibles?', answer: 'Más de 40 integraciones disponibles, incluyendo Stripe, QuickBooks, Shopify, HubSpot y Salesforce.' },
            { question: 'Qué pasa si mis datos están en Excel?', answer: 'Podemos conectarlo mediante importación CSV/Excel o vía Google Sheets/API.' },
          ],
        },
        {
          title: 'Seguridad',
          items: [
            { question: 'Mis datos financieros están seguros?', answer: 'Sí. Usamos cifrado TLS en tránsito y cifrado en reposo, con controles de acceso y buenas prácticas enterprise.' },
            { question: 'Dónde se alojan los datos?', answer: 'Se alojan en infraestructura cloud segura, con opciones regionales para clientes enterprise.' },
          ],
        },
        {
          title: 'Comercial',
          items: [
            { question: 'Puedo cancelar en cualquier momento?', answer: 'Sí. Sin lock-in y con exportación de datos cuando lo necesites.' },
            { question: 'Hay período de prueba?', answer: 'Sí, tenés prueba gratis y también demos personalizadas según plan y caso de uso.' },
            { question: 'Facturan en moneda local?', answer: 'Para cuentas enterprise en LatAm ofrecemos opciones de facturación local.' },
            { question: 'Qué pasa si no veo valor en 30 días?', answer: 'Contás con garantía de satisfacción y proceso de devolución según condiciones del plan.' },
          ],
        },
      ],
    },
    finalCta: { urgency: 'Cada día sin claridad es ventaja para tu competencia', title: 'Tu negocio genera datos.', titleHighlight: 'Summer87 los convierte en decisiones.', description: 'En 30 minutos te mostramos qué ve un founder con Summer87, con casos reales y Copilot en vivo.', sub: 'Sin demo grabada. Sin PowerPoint.', ctaPrimary: 'Quiero ver mi demo personalizada', ctaSecondary: 'Prefiero escribir primero' },
    footer: { description: 'El copiloto financiero para founders y empresas en crecimiento.', contact: 'Contacto', links: { producto: 'Producto', empresa: 'Empresa', legal: 'Legal', comoFunciona: 'Cómo funciona', copilot: 'Copilot', integrations: 'Integraciones', pricing: 'Pricing', casos: 'Casos de uso', blog: 'Blog', faq: 'FAQ', contacto: 'Contacto', privacidad: 'Privacidad', terminos: 'Términos', seguridad: 'Seguridad' }, rights: 'Todos los derechos reservados.', systems: 'Todos los sistemas operativos' },
    demo: {
      successTitle: 'Tu demo esta reservada',
      successDescriptionPrefix: 'Te contactamos en menos de 2 horas habiles. Revisa tu email',
      successDescriptionSuffix: 'para los detalles.',
      successListTitle: 'Mientras tanto, vas a recibir:',
      successList: ['Email de confirmacion con proximos pasos', 'Recursos para preparar tu demo', 'Contacto de tu account manager asignado'],
      backHome: 'Volver al inicio',
      step: 'Paso',
      of: 'de',
      continue: 'Continuar',
      back: 'Atras',
      reserve: 'Reservar demo',
      roles: ['Dirección general', 'Dirección financiera', 'Dirección de operaciones', 'Responsable de ingresos', 'Otro'],
      sizes: ['1-10', '11-50', '51-200', '+200'],
      industries: ['SaaS / Tech', 'Retail / E-commerce', 'Servicios profesionales', 'Manufactura / Distribucion', 'Otro'],
      revenues: ['Menos de USD 500K', 'USD 500K - USD 2M', 'USD 2M - USD 10M', '+USD 10M'],
      problems: ['No entiendo mis numeros en tiempo real', 'Mis datos estan dispersos en muchas herramientas', 'Decido sin informacion suficiente', 'Mi equipo pierde tiempo consolidando reportes', 'No se que metricas mirar'],
      urgencies: ['Lo necesito ya', 'En los proximos 30 dias', 'Estoy evaluando opciones'],
      step1: { title: 'Información del participante', subtitle: 'Esta información nos permite adaptar la demostración a su contexto.', roleLabel: 'Rol dentro de la organización', nameLabel: 'Nombre completo', namePlaceholder: 'Ej.: Martin Garcia', emailLabel: 'Correo electrónico profesional', emailPlaceholder: 'nombre@empresa.com' },
      step2: { title: 'Tu empresa', subtitle: 'Para mostrarte el caso de uso mas relevante.', sizeLabel: 'Tamano del equipo', industryLabel: 'Industria', revenueLabel: 'Facturacion anual aproximada' },
      step3: { title: 'Tu situacion actual', subtitle: 'Para enfocar la demo en lo que mas te importa.', problemsLabel: 'Cual es tu mayor desafio hoy? (podes elegir varios)', urgencyLabel: 'Con que urgencia necesitas resolver esto?' },
      panel: { title: 'Que vas a ver en tu demo?', bullets: ['Setup con tus integraciones reales', 'Dashboard configurado para tu industria', 'Copilot respondiendo preguntas sobre tu negocio', 'Plan de accion para los primeros 30 dias'], quote: 'La demo duro 30 minutos y sali con 3 decisiones claras para la semana.', author: '- Lucia F., Head of Revenue', guaranteeTitle: 'Sin riesgo', guaranteeBody: '14 dias gratis. Garantia de 30 dias. Sin tarjeta de credito para empezar.' },
    },
  },
  en: {
    navbar: { links: { producto: 'Product', comoFunciona: 'How it works', casos: 'Use cases', pricing: 'Pricing', faq: 'FAQ' }, cta: 'Book demo', aria: { home: 'Summer87 home', nav: 'Main navigation', open: 'Open menu', close: 'Close menu', mobileMenu: 'Mobile menu' } },
    hero: { badge: 'The financial copilot you were missing', title: 'Stop guessing.', titleHighlight: 'Start deciding.', description: 'Summer87 reads your financial data, detects what is failing, and tells you exactly what to do.', descriptionStrong: 'Not a report. An answer.', sub: 'For founders who prefer moving the business over analyzing it.', ctaPrimary: 'I want clarity on my business', ctaSecondary: 'See how it works', social: '120+ companies already understand their numbers', trial: '14-day free trial · No card · Setup in 48h' },
    problem: { badge: 'The real problem', title: "The problem isn't lack of data.", titleHighlight: "It's the lack of translation.", description: 'Every day without financial clarity is money left on the table.', cards: [{ headline: 'Your data lives in 5 tools. Your clarity in none.', body: 'Each tool shows one slice. None explains what is actually happening or what to do next.', cost: 'Real cost: daily decisions with incomplete information.' }, { headline: 'When reports arrive, the window is gone.', body: 'By month-end close, critical moves were already made without context.', cost: 'Real cost: late reaction and shrinking margin.' }, { headline: 'You know something is wrong, not where.', body: 'Margin drops but root cause stays hidden without a layer connecting all signals.', cost: 'Real cost: time and money on the wrong problem.' }], note: 'Summer87 is not one more tool in your stack.', noteHighlight: 'It is the decision layer across your existing systems.' },
    whatIs: { badge: 'What Summer87 is', title: 'Financial intelligence', titleHighlight: 'once reserved for enterprises.', description: 'Summer87 turns data into clear next actions in executive language.', features: [{ title: 'Tells you what to do, not only what happened', description: 'It explains cause and ranks the next move by impact.' }, { title: 'Filters noise, prioritizes impact', description: 'You see what matters now, not endless dashboards.' }, { title: 'Speaks like a CFO', description: 'Business language, not analyst jargon.' }, { title: 'Flags risk before it becomes expensive', description: '24/7 monitoring to catch deviations early.' }], isNotTitle: 'Summer87 is NOT', isNotSub: 'So you avoid wasting time comparing wrong tools', isNotItems: ['Accounting software', 'A CRM or ERP', 'A dashboard you configure and forget', 'A tool that needs analysts', 'Another delayed contextless report', 'Power BI with a different name'], isTitle: 'Summer87 IS', isDescription: 'Your AI financial analyst: connected data, interpreted context, prioritized actions.', stats: [{ value: '48h', label: 'First setup', sublabel: 'No consultants' }, { value: '< 7d', label: 'First insight', sublabel: 'Guaranteed' }, { value: '30d', label: 'Visible ROI', sublabel: 'Or full refund' }] },
    dashboard: {
      badge: 'Real and interactive product',
      title: 'This is what founders see',
      titleHighlight: 'using Summer87 every day.',
      description: 'Not a marketing screenshot. The actual product.',
      tabs: { metrics: 'Dashboard', alerts: 'Urgent alerts', copilot: 'Copilot' },
      frame: { appUrl: 'app.summer87.com/dashboard', live: 'Live' },
      sidebarHint: 'Try Copilot. Ask anything about your business.',
      metricsHeader: { greeting: 'Good morning, Martin', summaryPrefix: 'Today you have', urgent: '2 urgent actions', summarySuffix: 'and 1 opportunity.' },
      metrics: [
        { label: 'MRR', value: '48.2K', change: '+12%', trend: 'up', detail: 'vs. previous month' },
        { label: 'CAC', value: 'USD 320', change: '+28%', trend: 'down', detail: 'URGENT - review now' },
        { label: 'LTV', value: 'USD 4.8K', change: '+5%', trend: 'up', detail: 'avg per client' },
        { label: 'Churn', value: '2.3%', change: '+0.4pp', trend: 'down', detail: 'last 30 days' },
        { label: 'Runway', value: '14 mo.', change: 'stable', trend: 'neutral', detail: 'at current burn' },
        { label: 'NRR', value: '108%', change: '+3pp', trend: 'up', detail: 'net revenue retention' },
      ],
      urgentCard: { title: 'Urgent action today', body: 'CAC up 28% in 7 days. Every week without action adds USD 4.2K loss.', action: 'What to do ->' },
      alertsHeader: '3 active alerts ordered by economic impact',
      alerts: [
        { type: 'danger', title: 'CAC up 28% - action required this week', body: 'Meta channel burning USD 4.2K/week with falling conversion. Reallocating to Google can reverse this in 10 days.', action: 'What to do ->' },
        { type: 'warning', title: '2 clients at churn risk - contact before Friday', body: 'Acme Corp and Nexo inactive for 42 and 38 days. Combined ARR at risk: USD 36K.', action: 'See clients ->' },
        { type: 'success', title: 'Gross margin improving - expansion opportunity', body: 'Margin improved 1.8pp this month. Good moment to scale the top-converting channel.', action: 'See analysis ->' },
      ],
      copilot: {
        title: 'Summer87 Copilot',
        subtitle: 'Ask anything about your numbers',
        status: 'Active',
        placeholder: 'Why did my margin drop? What is my biggest risk right now?',
        sendAria: 'Send question',
        initialMessages: [
          { role: 'user', message: 'What should I do this week?' },
          { role: 'assistant', message: 'Three priorities, in order of impact:\n\n1) Cut Meta budget by 30% and move it to Google.\n\n2) Call Acme Corp and Nexo today.\n\n3) Everything else can wait.' },
        ],
        generatedReply: 'Based on your current data, the main driver is lower Enterprise conversion. I recommend a sales pipeline check-in today before it impacts forecast.',
      },
      footerCta: 'Want to see this with your real data?',
      footerDescription: 'In 30 minutes we show exactly what your business would look like.',
      footerButton: 'See my personalized demo',
    },
    pricing: { badge: 'Pricing', title: 'Less than what one', titleHighlight: 'bad decision costs.', description: 'One retained customer from a Summer87 alert can cover your annual plan.', sub: '14-day free trial · No card · Cancel anytime', monthly: 'Monthly', annual: 'Annual', save: 'Save 20%' },
    faq: {
      badge: 'Frequently asked questions',
      title: 'Everything you need to',
      titleHighlight: 'know.',
      description: 'If your question is not here, write to',
      categories: [
        { title: 'Product', items: [{ question: 'What does Summer87 do?', answer: 'Summer87 connects your financial and operational data, interprets it with AI, and recommends clear next actions.' }, { question: 'How is it different from Power BI or Tableau?', answer: 'Power BI and Tableau are analyst tools. Summer87 is built for executive decision-making without a data team.' }, { question: 'What is Copilot?', answer: 'A conversational interface that answers business questions in natural language with contextual recommendations.' }, { question: 'Do I need a data team?', answer: 'No. We handle setup and Summer87 is designed for founders and leaders.' }] },
        { title: 'Implementation', items: [{ question: 'How long does setup take?', answer: 'Basic setup takes 48 hours, and actionable insights usually arrive in the first week.' }, { question: 'Which integrations are available?', answer: '40+ integrations including Stripe, QuickBooks, Shopify, HubSpot, and Salesforce.' }, { question: 'What if my data is in Excel?', answer: 'We support CSV/Excel imports and can connect through Sheets or API.' }] },
        { title: 'Security', items: [{ question: 'Is my financial data secure?', answer: 'Yes. We use encryption in transit and at rest with enterprise-grade access controls.' }, { question: 'Where is data hosted?', answer: 'Data is hosted on secure cloud infrastructure with regional options for enterprise accounts.' }] },
        { title: 'Commercial', items: [{ question: 'Can I cancel anytime?', answer: 'Yes, with no lock-in and data export available when needed.' }, { question: 'Is there a trial period?', answer: 'Yes. You can start with a free trial and schedule a personalized demo based on your needs.' }, { question: 'Do you bill in local currency?', answer: 'For enterprise accounts in LatAm we offer local invoicing options.' }, { question: 'What if I do not see value in 30 days?', answer: 'You are covered by our satisfaction guarantee according to your selected plan.' }] },
      ],
    },
    finalCta: { urgency: 'Every day without clarity gives competitors an edge', title: 'Your business generates data.', titleHighlight: 'Summer87 turns it into decisions.', description: 'In 30 minutes we show what founders see with Summer87, with real cases and live Copilot.', sub: 'No recorded demo. No PowerPoint.', ctaPrimary: 'I want my personalized demo', ctaSecondary: 'I prefer to write first' },
    footer: { description: 'The financial copilot for founders and growth companies.', contact: 'Contact', links: { producto: 'Product', empresa: 'Company', legal: 'Legal', comoFunciona: 'How it works', copilot: 'Copilot', integrations: 'Integrations', pricing: 'Pricing', casos: 'Use cases', blog: 'Blog', faq: 'FAQ', contacto: 'Contact', privacidad: 'Privacy', terminos: 'Terms', seguridad: 'Security' }, rights: 'All rights reserved.', systems: 'All systems operational' },
    demo: {
      successTitle: 'Your demo is booked',
      successDescriptionPrefix: 'We will contact you in less than 2 business hours. Check your email',
      successDescriptionSuffix: 'for the details.',
      successListTitle: 'Meanwhile, you will receive:',
      successList: ['Confirmation email with next steps', 'Resources to prepare your demo', 'Direct contact from your assigned account manager'],
      backHome: 'Back to home',
      step: 'Step',
      of: 'of',
      continue: 'Continue',
      back: 'Back',
      reserve: 'Book demo',
      roles: ['General management', 'Finance management', 'Operations management', 'Revenue lead', 'Other'],
      sizes: ['1-10', '11-50', '51-200', '+200'],
      industries: ['SaaS / Tech', 'Retail / E-commerce', 'Professional services', 'Manufacturing / Distribution', 'Other'],
      revenues: ['Under USD 500K', 'USD 500K - USD 2M', 'USD 2M - USD 10M', '+USD 10M'],
      problems: ['I do not understand my numbers in real time', 'My data is spread across tools', 'I make decisions without enough information', 'My team spends too much time consolidating reports', 'I do not know which metrics to prioritize'],
      urgencies: ['I need it now', 'Within the next 30 days', 'I am evaluating options'],
      step1: { title: 'Participant information', subtitle: 'This information allows us to tailor the demonstration to your context.', roleLabel: 'Role within the organization', nameLabel: 'Full name', namePlaceholder: 'Ex.: Martin Garcia', emailLabel: 'Professional email', emailPlaceholder: 'name@company.com' },
      step2: { title: 'Your company', subtitle: 'To show the most relevant use case.', sizeLabel: 'Team size', industryLabel: 'Industry', revenueLabel: 'Approximate annual revenue' },
      step3: { title: 'Your current situation', subtitle: 'To focus the demo on what matters most to you.', problemsLabel: 'What is your biggest challenge today? (you can choose multiple)', urgencyLabel: 'How urgent is this for you?' },
      panel: { title: 'What will you see in your demo?', bullets: ['Setup with your real integrations', 'Dashboard configured for your industry', 'Copilot answering questions about your business', 'Personalized 30-day action plan'], quote: 'The demo took 30 minutes and I left with 3 clear decisions for the week.', author: '- Lucia F., Head of Revenue', guaranteeTitle: 'No risk', guaranteeBody: '14-day free trial. 30-day guarantee. No credit card required to start.' },
    },
  },
  de: {
    navbar: { links: { producto: 'Produkt', comoFunciona: 'So funktioniert es', casos: 'Anwendungsfälle', pricing: 'Preise', faq: 'FAQ' }, cta: 'Demo buchen', aria: { home: 'Summer87 Startseite', nav: 'Hauptnavigation', open: 'Menü öffnen', close: 'Menü schließen', mobileMenu: 'Mobiles Menü' } },
    hero: { badge: 'Der Finanz-Copilot, der gefehlt hat', title: 'Hör auf zu raten.', titleHighlight: 'Beginne zu entscheiden.', description: 'Summer87 liest deine Finanzdaten, erkennt Probleme und sagt dir genau, was zu tun ist.', descriptionStrong: 'Kein Bericht. Eine Antwort.', sub: 'Für Founder, die das Business bewegen statt Reports zu interpretieren.', ctaPrimary: 'Ich will Klarheit für mein Business', ctaSecondary: 'So funktioniert es', social: '120+ Unternehmen verstehen bereits ihre Zahlen', trial: '14 Tage kostenlos · Keine Karte · Setup in 48h' },
    problem: { badge: 'Das eigentliche Problem', title: 'Das Problem ist nicht fehlende Daten.', titleHighlight: 'Sondern fehlende Übersetzung.', description: 'Jeder Tag ohne finanzielle Klarheit kostet bares Geld.', cards: [{ headline: 'Deine Daten leben in 5 Tools. Klarheit in keinem.', body: 'Jedes Tool zeigt nur einen Ausschnitt und keine klare Priorität.', cost: 'Realer Preis: tägliche Entscheidungen mit unvollständiger Sicht.' }, { headline: 'Wenn der Report kommt, ist das Zeitfenster vorbei.', body: 'Beim Monatsabschluss sind entscheidende Schritte längst ohne Kontext passiert.', cost: 'Realer Preis: späte Reaktion und sinkende Marge.' }, { headline: 'Du weißt, dass etwas falsch läuft, aber nicht wo.', body: 'Ohne Verknüpfung aller Signale bleibt nur Spekulation.', cost: 'Realer Preis: Zeit und Geld im falschen Problem.' }], note: 'Summer87 ist nicht noch ein Tool in deinem Stack.', noteHighlight: 'Es ist die Entscheidungsebene über deinen bestehenden Systemen.' },
    whatIs: { badge: 'Was Summer87 ist', title: 'Finanzintelligenz', titleHighlight: 'die früher nur Große hatten.', description: 'Summer87 verwandelt Daten in klare nächste Schritte in Business-Sprache.', features: [{ title: 'Sagt dir, was zu tun ist', description: 'Erkennt Ursache und priorisiert den nächsten Schritt nach Wirkung.' }, { title: 'Filtert Rauschen, priorisiert Wirkung', description: 'Du siehst, was jetzt zählt, statt endlose Dashboards.' }, { title: 'Spricht wie ein CFO', description: 'Business-Sprache statt Analysten-Jargon.' }, { title: 'Erkennt Risiken frühzeitig', description: '24/7 Monitoring für frühzeitige Korrektur.' }], isNotTitle: 'Summer87 ist NICHT', isNotSub: 'Damit du keine Zeit mit falschen Vergleichen verlierst', isNotItems: ['Buchhaltungssoftware', 'Ein CRM oder ERP', 'Ein Dashboard zum Einrichten und Vergessen', 'Ein Tool, das Analysten braucht', 'Ein verspäteter Report ohne Kontext', 'Power BI mit anderem Namen'], isTitle: 'Summer87 IST', isDescription: 'Dein KI-Finanzanalyst: vernetzte Daten, interpretierter Kontext, priorisierte Aktionen.', stats: [{ value: '48h', label: 'Erstes Setup', sublabel: 'Ohne Berater' }, { value: '< 7d', label: 'Erster Insight', sublabel: 'Garantiert' }, { value: '30d', label: 'Sichtbarer ROI', sublabel: 'Oder Geld zurück' }] },
    dashboard: {
      badge: 'Echtes, interaktives Produkt',
      title: 'Das sehen Founder',
      titleHighlight: 'mit Summer87 jeden Tag.',
      description: 'Kein Marketing-Screenshot. Das echte Produkt.',
      tabs: { metrics: 'Dashboard', alerts: 'Dringende Alerts', copilot: 'Copilot' },
      frame: { appUrl: 'app.summer87.com/dashboard', live: 'Live' },
      sidebarHint: 'Teste den Copilot. Frag alles zu deinem Business.',
      metricsHeader: { greeting: 'Guten Morgen, Martin', summaryPrefix: 'Heute hast du', urgent: '2 dringende Aktionen', summarySuffix: 'und 1 Chance.' },
      metrics: [
        { label: 'MRR', value: '48.2K', change: '+12%', trend: 'up', detail: 'vs. Vormonat' },
        { label: 'CAC', value: 'USD 320', change: '+28%', trend: 'down', detail: 'DRINGEND - jetzt prüfen' },
        { label: 'LTV', value: 'USD 4.8K', change: '+5%', trend: 'up', detail: 'Durchschnitt pro Kunde' },
        { label: 'Churn', value: '2.3%', change: '+0.4pp', trend: 'down', detail: 'letzte 30 Tage' },
        { label: 'Runway', value: '14 mo.', change: 'stabil', trend: 'neutral', detail: 'bei aktuellem Burn' },
        { label: 'NRR', value: '108%', change: '+3pp', trend: 'up', detail: 'Net Revenue Retention' },
      ],
      urgentCard: { title: 'Dringende Aktion heute', body: 'CAC stieg in 7 Tagen um 28%. Jede Woche ohne Aktion kostet zusaetzlich USD 4.2K.', action: 'Was tun ->' },
      alertsHeader: '3 aktive Alerts nach wirtschaftlichem Impact sortiert',
      alerts: [
        { type: 'danger', title: 'CAC +28% - diese Woche handeln', body: 'Meta verbrennt USD 4.2K/Woche bei sinkender Conversion. Umschichtung auf Google kann es in 10 Tagen drehen.', action: 'Was tun ->' },
        { type: 'warning', title: '2 Kunden churn-gefährdet - vor Freitag kontaktieren', body: 'Acme Corp und Nexo ohne Aktivität seit 42 bzw. 38 Tagen. ARR-Risiko: USD 36K.', action: 'Kunden sehen ->' },
        { type: 'success', title: 'Bruttomarge verbessert sich - Expansionschance', body: 'Marge stieg diesen Monat um 1.8pp. Guter Zeitpunkt, den besten Kanal zu skalieren.', action: 'Analyse sehen ->' },
      ],
      copilot: {
        title: 'Summer87 Copilot',
        subtitle: 'Frag alles zu deinen Zahlen',
        status: 'Aktiv',
        placeholder: 'Warum ist meine Marge gesunken? Was ist mein größtes Risiko?',
        sendAria: 'Frage senden',
        initialMessages: [
          { role: 'user', message: 'Was soll ich diese Woche tun?' },
          { role: 'assistant', message: 'Drei Prioritäten nach Impact:\n\n1) 30% Meta-Budget auf Google verschieben.\n\n2) Acme Corp und Nexo heute anrufen.\n\n3) Alles andere kann warten.' },
        ],
        generatedReply: 'Dein Haupttreiber ist aktuell die sinkende Enterprise-Conversion. Ich empfehle heute ein Sales-Review, bevor der Forecast betroffen ist.',
      },
      footerCta: 'Willst du das mit deinen echten Daten sehen?',
      footerDescription: 'In 30 Minuten zeigen wir dir exakt, wie dein Business aussehen wuerde.',
      footerButton: 'Meine personalisierte Demo',
    },
    pricing: { badge: 'Preise', title: 'Weniger als das,', titleHighlight: 'was eine schlechte Entscheidung kostet.', description: 'Ein durch Summer87 gehaltener Kunde kann den Jahresplan finanzieren.', sub: '14 Tage kostenlos · Keine Karte · Jederzeit kündbar', monthly: 'Monatlich', annual: 'Jährlich', save: '20% sparen' },
    faq: {
      badge: 'Haufige Fragen',
      title: 'Alles, was du',
      titleHighlight: 'wissen musst.',
      description: 'Wenn deine Frage nicht hier ist, schreib an',
      categories: [
        { title: 'Produkt', items: [{ question: 'Was macht Summer87?', answer: 'Summer87 verbindet Finanz- und operative Daten, interpretiert sie mit KI und liefert klare Empfehlungen.' }, { question: 'Wie unterscheidet es sich von Power BI oder Tableau?', answer: 'Power BI und Tableau sind Analysten-Tools. Summer87 ist fuer schnelle Executive-Entscheidungen gebaut.' }, { question: 'Was ist der Copilot?', answer: 'Eine Konversationsoberflaeche, die Fragen in natuerlicher Sprache mit kontextbezogenen Empfehlungen beantwortet.' }, { question: 'Brauche ich ein Data-Team?', answer: 'Nein. Wir uebernehmen das Setup und Summer87 ist fuer Founder und Fuehrungskraefte optimiert.' }] },
        { title: 'Implementierung', items: [{ question: 'Wie lange dauert das Setup?', answer: 'Das Basis-Setup dauert 48 Stunden, erste Insights kommen meist in der ersten Woche.' }, { question: 'Welche Integrationen gibt es?', answer: '40+ Integrationen, darunter Stripe, QuickBooks, Shopify, HubSpot und Salesforce.' }, { question: 'Was wenn meine Daten in Excel sind?', answer: 'CSV/Excel-Import sowie Anbindung ueber Sheets oder API sind moeglich.' }] },
        { title: 'Sicherheit', items: [{ question: 'Sind meine Daten sicher?', answer: 'Ja. Daten sind bei Uebertragung und Speicherung verschluesselt, mit Enterprise-Zugriffskontrollen.' }, { question: 'Wo werden Daten gehostet?', answer: 'In sicherer Cloud-Infrastruktur mit regionalen Optionen fuer Enterprise-Kunden.' }] },
        { title: 'Kommerziell', items: [{ question: 'Kann ich jederzeit kuendigen?', answer: 'Ja. Kein Lock-in und Datenexport auf Wunsch.' }, { question: 'Gibt es eine Testphase?', answer: 'Ja, inklusive Testzugang und personalisierter Demo je nach Bedarf.' }, { question: 'Rechnet ihr in lokaler Waehrung ab?', answer: 'Fuer Enterprise-Konten in LatAm bieten wir lokale Abrechnungsoptionen.' }, { question: 'Was wenn ich in 30 Tagen keinen Wert sehe?', answer: 'Du bist durch unsere Zufriedenheitsgarantie gemaess Planbedingungen abgesichert.' }] },
      ],
    },
    finalCta: { urgency: 'Jeder Tag ohne Klarheit stärkt den Wettbewerb', title: 'Dein Business erzeugt Daten.', titleHighlight: 'Summer87 macht daraus Entscheidungen.', description: 'In 30 Minuten zeigen wir mit realen Fällen und Live-Copilot, was Founder sehen.', sub: 'Keine aufgezeichnete Demo. Kein PowerPoint.', ctaPrimary: 'Ich will meine personalisierte Demo', ctaSecondary: 'Ich schreibe lieber zuerst' },
    footer: { description: 'Der Finanz-Copilot für Founder und wachsende Unternehmen.', contact: 'Kontakt', links: { producto: 'Produkt', empresa: 'Unternehmen', legal: 'Rechtliches', comoFunciona: 'So funktioniert es', copilot: 'Copilot', integrations: 'Integrationen', pricing: 'Preise', casos: 'Anwendungsfälle', blog: 'Blog', faq: 'FAQ', contacto: 'Kontakt', privacidad: 'Datenschutz', terminos: 'AGB', seguridad: 'Sicherheit' }, rights: 'Alle Rechte vorbehalten.', systems: 'Alle Systeme betriebsbereit' },
    demo: {
      successTitle: 'Deine Demo ist gebucht',
      successDescriptionPrefix: 'Wir melden uns in weniger als 2 Arbeitsstunden. Pruefe deine E-Mail',
      successDescriptionSuffix: 'fuer die Details.',
      successListTitle: 'In der Zwischenzeit erhaeltst du:',
      successList: ['Bestaetigungs-E-Mail mit naechsten Schritten', 'Ressourcen zur Vorbereitung deiner Demo', 'Direkten Kontakt zu deinem Account Manager'],
      backHome: 'Zur Startseite',
      step: 'Schritt',
      of: 'von',
      continue: 'Weiter',
      back: 'Zurueck',
      reserve: 'Demo buchen',
      roles: ['Geschäftsleitung', 'Finanzleitung', 'Leitung Betrieb', 'Verantwortlich für Umsatz', 'Andere'],
      sizes: ['1-10', '11-50', '51-200', '+200'],
      industries: ['SaaS / Tech', 'Retail / E-commerce', 'Professionelle Services', 'Produktion / Distribution', 'Andere'],
      revenues: ['Unter USD 500K', 'USD 500K - USD 2M', 'USD 2M - USD 10M', '+USD 10M'],
      problems: ['Ich verstehe meine Zahlen nicht in Echtzeit', 'Meine Daten sind auf viele Tools verteilt', 'Ich entscheide ohne ausreichende Informationen', 'Mein Team verliert Zeit mit Report-Konsolidierung', 'Ich weiss nicht, welche Metriken Prioritaet haben'],
      urgencies: ['Ich brauche es sofort', 'In den naechsten 30 Tagen', 'Ich evaluiere Optionen'],
      step1: { title: 'Teilnehmerinformationen', subtitle: 'Diese Informationen helfen uns, die Demonstration an Ihren Kontext anzupassen.', roleLabel: 'Rolle innerhalb der Organisation', nameLabel: 'Vollstaendiger Name', namePlaceholder: 'Bsp.: Martin Garcia', emailLabel: 'Berufliche E-Mail', emailPlaceholder: 'name@unternehmen.com' },
      step2: { title: 'Dein Unternehmen', subtitle: 'Damit wir den relevantesten Use Case zeigen.', sizeLabel: 'Teamgroesse', industryLabel: 'Branche', revenueLabel: 'Geschaetzter Jahresumsatz' },
      step3: { title: 'Deine aktuelle Situation', subtitle: 'Damit wir die Demo auf das Wichtigste fokussieren.', problemsLabel: 'Was ist heute deine groesste Herausforderung? (mehrfach moeglich)', urgencyLabel: 'Wie dringend ist das fuer dich?' },
      panel: { title: 'Was siehst du in deiner Demo?', bullets: ['Setup mit deinen echten Integrationen', 'Dashboard fuer deine Branche konfiguriert', 'Copilot beantwortet Fragen zu deinem Business', 'Personalisierter 30-Tage-Aktionsplan'], quote: 'Die Demo dauerte 30 Minuten und ich ging mit 3 klaren Entscheidungen raus.', author: '- Lucia F., Head of Revenue', guaranteeTitle: 'Kein Risiko', guaranteeBody: '14 Tage kostenlos. 30-Tage-Garantie. Keine Kreditkarte noetig.' },
    },
  },
}

export type Dictionary = typeof esDictionary.es
export const dictionaries: Record<Locale, Dictionary> = esDictionary

export const extraDictionaries = {
  es: {
    heroExtraNarrative: 'Summer87 combina inteligencia de negocio, copilotos con IA y automatización para mejorar la visibilidad, la operación y la toma de decisiones.',
    navbarExtra: { servicesLabel: 'Servicios' },
    servicesPillars: {
      badge: 'Servicios principales',
      title: 'Los tres pilares de Summer87',
      description: 'Summer87 integra tres servicios complementarios para análisis, soporte de decisiones y automatización operativa.',
      items: [
        {
          title: 'Summer87 Intelligence',
          description: 'Visibilidad de negocio con análisis financiero y tableros accionables para seguimiento ejecutivo.',
          benefits: ['Indicadores financieros y operativos unificados', 'Alertas tempranas sobre desvíos relevantes', 'Sugerencias de decisión basadas en datos'],
          ctaLabel: 'Ver Intelligence',
          ctaHref: '#producto',
        },
        {
          title: 'Summer87 Copilot',
          description: 'Asistencia con IA para interpretar información, resolver preguntas de negocio y priorizar acciones.',
          benefits: ['Interpretación guiada de métricas clave', 'Recomendaciones contextualizadas por área', 'Priorización semanal de acciones'],
          ctaLabel: 'Ver Copilot',
          ctaHref: '#producto',
        },
        {
          title: 'Summer87 Automation',
          description: 'Automatización de flujos y conexión entre sistemas para reducir tareas manuales y mejorar coordinación.',
          benefits: ['Integración de herramientas y procesos', 'Automatización de tareas repetitivas', 'Flujos operativos consistentes entre equipos'],
          ctaLabel: 'Ver Automation',
          ctaHref: '#integraciones',
        },
      ],
    },
    howItWorks: {
      badge: 'Cómo funciona',
      title: 'De datos dispersos a',
      titleHighlight: 'decisiones claras.',
      description: 'En 4 pasos para conectar, analizar, recomendar y automatizar.',
      cta: 'Empezar ahora — sin tarjeta de crédito',
      note: 'Setup en 48 horas. Primera insight antes de 7 días.',
      steps: [
        {
          number: '01',
          title: 'Conectar datos y procesos',
          description: 'Centralizamos información financiera y operativa desde tus sistemas principales.',
          detail: 'Integración rápida de herramientas.',
          color: '#2F81F7',
          items: ['Fuentes financieras', 'Sistemas comerciales', 'Herramientas operativas', 'Actualización continua'],
        },
        {
          number: '02',
          title: 'Analizar información crítica',
          description: 'Summer87 Intelligence interpreta tendencias, variaciones y métricas clave en contexto.',
          detail: 'Análisis continuo y estructurado.',
          color: '#7C3AED',
          items: ['KPI estratégicos', 'Detección de desvíos', 'Análisis causal', 'Tableros accionables'],
        },
        {
          number: '03',
          title: 'Recibir recomendaciones',
          description: 'Summer87 Copilot responde preguntas de negocio y sugiere prioridades de acción.',
          detail: 'Soporte para decisiones diarias.',
          color: '#3FB950',
          items: ['Preguntas y respuestas', 'Recomendaciones', 'Priorización', 'Guía contextual'],
        },
        {
          number: '04',
          title: 'Automatizar acciones repetitivas',
          description: 'Summer87 Automation coordina flujos operativos para reducir carga manual.',
          detail: 'Ejecución operativa más eficiente.',
          color: '#D29922',
          items: ['Flujos automáticos', 'Integración entre sistemas', 'Menos tareas manuales', 'Mejor trazabilidad'],
        },
      ],
    },
    useCases: {
      badge: 'Casos de uso',
      title: 'Para tu industria,',
      titleHighlight: 'tu problema.',
      description: 'Summer87 entiende el contexto de tu negocio. No es un análisis genérico.',
      problemLabel: 'Problema:',
      solutionLabel: 'Summer87:',
      metricsLabel: 'KPIs monitoreados',
      resultLabel: 'Resultado real',
      cases: [
        { industry: 'Intelligence financiero', icon: '⬡', color: '#2F81F7', problem: 'Las métricas cambian sin contexto consolidado.', solution: 'Summer87 Intelligence conecta indicadores y facilita decisiones con mayor claridad.', metrics: ['MRR', 'Margen', 'Churn', 'NRR'], result: 'Mayor visibilidad para decisiones semanales.' },
        { industry: 'Copilot de decisión', icon: '◈', color: '#7C3AED', problem: 'El equipo necesita interpretar datos con rapidez.', solution: 'Summer87 Copilot responde consultas y recomienda prioridades operativas.', metrics: ['Preguntas resueltas', 'Tiempo de análisis', 'Prioridades definidas', 'Acciones por semana'], result: 'Mejor alineación entre áreas y foco de ejecución.' },
        { industry: 'Automatización operativa', icon: '◉', color: '#3FB950', problem: 'Procesos manuales generan demoras y retrabajo.', solution: 'Summer87 Automation orquesta flujos y reduce tareas repetitivas.', metrics: ['Flujos automatizados', 'Tiempo operativo', 'Errores manuales', 'Cumplimiento de procesos'], result: 'Operación más eficiente y consistente.' },
        { industry: 'Manufactura / Distribución', icon: '◆', color: '#D29922', problem: 'Flujo de caja impredecible.', solution: 'Summer87 proyecta cash flow 90 días con riesgo por ciclos.', metrics: ['Cash flow proyectado', 'DSO y DPO', 'Ciclo de conversión', 'Capital de trabajo'], result: 'Negociaron condiciones antes del punto crítico.' },
      ],
    },
    integrations: {
      badge: 'Integraciones',
      title: 'Conecta con lo que',
      titleHighlight: 'ya usás.',
      description: 'Más de 40 integraciones disponibles. Sin código, sin consultores, sin semanas de configuración.',
      moreAvailable: 'más disponibles',
      notFoundTitle: '¿No encontrás tu herramienta?',
      notFoundBody: 'Tenemos API abierta para integraciones custom. Hablamos.',
      contact: 'Contactar',
      items: [
        { name: 'Stripe', category: 'Pagos', color: '#635BFF' },
        { name: 'QuickBooks', category: 'Contabilidad', color: '#2CA01C' },
        { name: 'Xero', category: 'Contabilidad', color: '#13B5EA' },
        { name: 'Shopify', category: 'E-commerce', color: '#95BF47' },
        { name: 'HubSpot', category: 'CRM', color: '#FF7A59' },
        { name: 'Salesforce', category: 'CRM', color: '#00A1E0' },
        { name: 'Mercado Pago', category: 'Pagos', color: '#009EE3' },
        { name: 'Google Sheets', category: 'Hojas de cálculo', color: '#34A853' },
        { name: 'Slack', category: 'Notificaciones', color: '#4A154B' },
        { name: 'Notion', category: 'Productividad', color: '#000000' },
        { name: 'Pipedrive', category: 'CRM', color: '#26292C' },
        { name: 'WooCommerce', category: 'E-commerce', color: '#7F54B3' },
      ],
    },
    testimonials: {
      badge: 'Clientes reales',
      title: 'Lo que dicen quienes',
      titleHighlight: 'ya lo usan.',
      description: 'Founders y ejecutivos que antes decidían por intuición.',
      starsAria: '5 estrellas',
      stats: [
        { value: '120+', label: 'Empresas activas', color: '#2F81F7' },
        { value: '94%', label: 'Retención a 6 meses', color: '#3FB950' },
        { value: '48h', label: 'Tiempo medio de setup', color: '#D29922' },
        { value: '4.9/5', label: 'NPS promedio', color: '#7C3AED' },
      ],
      items: [
        { quote: 'En dos semanas entendí mi negocio mejor que en dos años de Excel.', author: 'Martin G.', role: 'Founder & CEO', company: 'HR SaaS, Series A', avatar: 'M', gradient: 'from-[#2F81F7] to-[#1D4ED8]', metric: 'Churn reducido 40% en 60 días', metricColor: '#3FB950' },
        { quote: 'Ahora entiendo contexto financiero todos los días, no al cierre mensual.', author: 'Carolina V.', role: 'CFO', company: 'Retail, 85 empleados', avatar: 'C', gradient: 'from-[#7C3AED] to-[#5B21B6]', metric: 'Visibilidad en tiempo real sin analistas', metricColor: '#2F81F7' },
        { quote: 'Conectamos todo en 48h y ya la primera semana hubo insight accionable.', author: 'Diego R.', role: 'Director de Operaciones', company: 'Distribuidor industrial', avatar: 'D', gradient: 'from-[#059669] to-[#047857]', metric: 'Setup en 48h, primera acción en 7 días', metricColor: '#D29922' },
      ],
    },
    heroMockup: {
      appUrl: 'app.summer87.com/dashboard',
      live: 'Live',
      summaryEyebrow: 'Resumen ejecutivo',
      summaryTitle: 'Hoy sabés exactamente dónde estás parado.',
      date: '24 Abr',
      timeAgo: 'hace 2 min',
      metrics: [
        { label: 'MRR', value: '', change: '▲ +12% vs mes anterior' },
        { label: 'Churn', value: '2.3%', change: '▲ Atención urgente' },
        { label: 'Runway', value: '14 mo.', change: '● Estable' },
      ],
      actionTitle: 'Acción requerida hoy',
      actionBody: 'CAC subió 28% esta semana. Corregí antes del viernes o perdés {{amount}}.',
      copilotTitle: 'Summer87 Copilot',
      copilotQuestion: '¿Qué debería priorizar esta semana?',
      copilotAnswer: '1) Mover 30% del presupuesto de Meta a Google. 2) Llamar a Acme y Nexo. 3) El resto puede esperar.',
      floatingValue: '{{amount}}',
      floatingLabel: 'MRR este mes',
    },
    pricingSection: {
      perMonth: '/mes',
      billedAnnually: 'Facturado anual —',
      perYear: '/año',
      billedMonthly: 'Facturado mes a mes',
      customTitle: 'Precio personalizado',
      customSubtitle: 'Según volumen y requisitos',
      plans: [
        { name: 'Starter', tagline: 'Para equipos que necesitan claridad operativa hoy', priceMonthly: 299, priceAnnual: 239, cta: 'Empezar prueba gratis', ctaHref: '#demo', highlight: false, badge: null, pitch: 'Incluye Intelligence, Copilot y automatización inicial.', features: ['Hasta 3 integraciones', 'Dashboard ejecutivo (Intelligence)', 'Alertas inteligentes', 'Copilot (50 consultas/mes)', 'Automation básica de tareas', 'Reporte semanal automático', 'Soporte por email'], notIncluded: ['Alertas ilimitadas', 'Copilot ilimitado', 'Analítica predictiva', 'Onboarding dedicado'] },
        { name: 'Growth', tagline: 'Para equipos que escalan con foco en ejecución', priceMonthly: 799, priceAnnual: 639, cta: 'Ver demo personalizada', ctaHref: '#demo', highlight: true, badge: 'Más solicitado', pitch: 'Intelligence, Copilot y Automation con alcance ampliado.', features: ['Integraciones ilimitadas', 'Dashboard + vistas custom', 'Alertas ilimitadas', 'Copilot ilimitado', 'Automation avanzada de flujos', 'Reportes automáticos', 'Analítica predictiva', 'Hasta 10 usuarios', 'Soporte prioritario', 'Onboarding en 48h'], notIncluded: ['SLA enterprise', 'SSO / SAML', 'Instancia dedicada'] },
        { name: 'Enterprise', tagline: 'Para organizaciones con requisitos específicos', priceMonthly: null, priceAnnual: null, cta: 'Hablar con ventas', ctaHref: '#contacto', highlight: false, badge: null, pitch: 'SLA, SSO, instancia dedicada y CSM experto.', features: ['Todo en Growth, más:', 'Usuarios ilimitados', 'SLA contractual 99.9%', 'SSO / SAML', 'Instancia dedicada', 'Integraciones custom API', 'Customer Success dedicado', 'Onboarding custom', 'Facturación local'], notIncluded: [] },
      ],
      guarantees: [
        { title: 'Garantía de 30 días', desc: 'Si no ves valor concreto en 30 días, devolvemos tu inversión.' },
        { title: 'Setup en 48 horas', desc: 'Nuestro equipo implementa sin proyectos largos ni consultoría externa.' },
        { title: 'Sin contratos ni lock-in', desc: 'Cancelás cuando quieras y tus datos siempre son tuyos.' },
      ],
    },
    demoExtra: { starsAria: '5 estrellas' },
    finalCtaExtra: {
      responsePrefix: 'Te respondemos en menos de',
      responseHighlight: '2 horas hábiles.',
      responseSuffix: 'Sí, de verdad.',
      trust: [
        { value: '14 días', label: 'gratis para empezar' },
        { value: 'Sin tarjeta', label: 'de crédito requerida' },
        { value: '48 horas', label: 'para el primer setup' },
        { value: '30 días', label: 'garantía o devolvemos' },
      ],
      starsAria: '5 estrellas',
      quote: 'La demo duró 30 minutos. Salí con 3 decisiones concretas para la semana. Firmamos esa misma tarde.',
      author: 'Martín G. — Founder, SaaS de RRHH',
    },
    notFound: {
      title: 'Esta página no existe.',
      body: 'Pero tu negocio sí. Volvé al inicio y entendé tus números.',
      cta: 'Volver al inicio',
    },
  },
  en: {
    heroExtraNarrative: 'Summer87 combines business intelligence, AI copilots and automation to improve visibility, operations and decision support.',
    navbarExtra: { servicesLabel: 'Services' },
    servicesPillars: {
      badge: 'Core services',
      title: 'The three pillars of Summer87',
      description: 'Summer87 brings together three complementary services for analysis, decision support and operational automation.',
      items: [
        { title: 'Summer87 Intelligence', description: 'Business intelligence with financial analysis, actionable dashboards and early alerts.', benefits: ['Unified financial and operational KPIs', 'Early detection of relevant deviations', 'Data-based decision suggestions'], ctaLabel: 'Explore Intelligence', ctaHref: '#producto' },
        { title: 'Summer87 Copilot', description: 'AI copilot to interpret data, answer business questions and guide priorities.', benefits: ['Guided metric interpretation', 'Contextual recommendations', 'Weekly action prioritization'], ctaLabel: 'Explore Copilot', ctaHref: '#producto' },
        { title: 'Summer87 Automation', description: 'Workflow automation and system integration to reduce manual effort and improve consistency.', benefits: ['Connected tools and processes', 'Automation of repetitive tasks', 'Cross-system operational flows'], ctaLabel: 'Explore Automation', ctaHref: '#integraciones' },
      ],
    },
    howItWorks: {
      badge: 'How it works',
      title: 'From scattered data to',
      titleHighlight: 'clear decisions.',
      description: 'In 4 steps to connect, analyze, recommend and automate.',
      cta: 'Start now — no credit card',
      note: 'Setup in 48 hours. First insight in under 7 days.',
      steps: [
        { number: '01', title: 'Connect data and processes', description: 'Integrate financial and operational systems into one view.', detail: 'Fast integration setup.', color: '#2F81F7', items: ['Financial sources', 'Commercial systems', 'Operational tools', 'Continuous sync'] },
        { number: '02', title: 'Analyze critical information', description: 'Summer87 Intelligence highlights trends and key performance changes.', detail: 'Continuous structured analysis.', color: '#7C3AED', items: ['Strategic KPIs', 'Deviation detection', 'Root-cause analysis', 'Actionable dashboards'] },
        { number: '03', title: 'Receive recommendations', description: 'Summer87 Copilot answers questions and suggests action priorities.', detail: 'Decision support for teams.', color: '#3FB950', items: ['Q&A guidance', 'Recommendations', 'Prioritization', 'Business context'] },
        { number: '04', title: 'Automate repetitive actions', description: 'Summer87 Automation orchestrates recurring workflows across systems.', detail: 'More efficient execution.', color: '#D29922', items: ['Automated flows', 'System integration', 'Less manual work', 'Operational traceability'] },
      ],
    },
    useCases: { badge: 'Use cases', title: 'For your industry,', titleHighlight: 'your problem.', description: 'Use cases for business intelligence, AI copilot guidance and operational automation.', problemLabel: 'Problem:', solutionLabel: 'Summer87:', metricsLabel: 'Tracked KPIs', resultLabel: 'Real outcome', cases: [{ industry: 'SaaS / Tech', icon: '⬡', color: '#2F81F7', problem: 'MRR grows while margin drops.', solution: 'Summer87 Intelligence detects margin erosion and guides the first action.', metrics: ['MRR + expansion', 'CAC by channel', 'Churn by cohort', 'NRR'], result: 'Margin recovered in 45 days.' }, { industry: 'Decision Copilot', icon: '◈', color: '#7C3AED', problem: 'Teams need faster interpretation of changing metrics.', solution: 'Summer87 Copilot answers business questions and prioritizes next actions.', metrics: ['Questions resolved', 'Analysis time', 'Priority clarity', 'Actions executed'], result: 'Faster alignment and execution.' }, { industry: 'Workflow Automation', icon: '◉', color: '#3FB950', problem: 'Manual coordination delays recurring operations.', solution: 'Summer87 Automation orchestrates repetitive workflows across systems.', metrics: ['Automated flows', 'Manual tasks reduced', 'Process cycle time', 'Error rate'], result: 'Higher operational consistency.' }, { industry: 'Manufacturing / Distribution', icon: '◆', color: '#D29922', problem: 'Unpredictable cash flow.', solution: 'Summer87 projects 90-day cash risk across cycles.', metrics: ['Projected cash flow', 'DSO and DPO', 'Conversion cycle', 'Working capital'], result: 'Renegotiated terms before critical cash pressure.' }] },
    integrations: { badge: 'Integrations', title: 'Connect what you', titleHighlight: 'already use.', description: '40+ integrations available. No code and no consultants.', moreAvailable: 'more available', notFoundTitle: "Can't find your tool?", notFoundBody: 'We offer open API support for custom integrations.', contact: 'Contact', items: [{ name: 'Stripe', category: 'Payments', color: '#635BFF' }, { name: 'QuickBooks', category: 'Accounting', color: '#2CA01C' }, { name: 'Xero', category: 'Accounting', color: '#13B5EA' }, { name: 'Shopify', category: 'E-commerce', color: '#95BF47' }, { name: 'HubSpot', category: 'CRM', color: '#FF7A59' }, { name: 'Salesforce', category: 'CRM', color: '#00A1E0' }, { name: 'Mercado Pago', category: 'Payments', color: '#009EE3' }, { name: 'Google Sheets', category: 'Spreadsheets', color: '#34A853' }, { name: 'Slack', category: 'Notifications', color: '#4A154B' }, { name: 'Notion', category: 'Productivity', color: '#000000' }, { name: 'Pipedrive', category: 'CRM', color: '#26292C' }, { name: 'WooCommerce', category: 'E-commerce', color: '#7F54B3' }] },
    testimonials: {
      badge: 'Real clients',
      title: 'What teams already using it',
      titleHighlight: 'are saying.',
      description: 'Founders and executives now deciding with clarity.',
      starsAria: '5 stars',
      stats: [
        { value: '120+', label: 'Active companies', color: '#2F81F7' },
        { value: '94%', label: '6-month retention', color: '#3FB950' },
        { value: '48h', label: 'Average setup time', color: '#D29922' },
        { value: '4.9/5', label: 'Average NPS', color: '#7C3AED' },
      ],
      items: [
        { quote: 'In two weeks I understood my business better than in two years of Excel.', author: 'Martin G.', role: 'Founder & CEO', company: 'HR SaaS, Series A', avatar: 'M', gradient: 'from-[#2F81F7] to-[#1D4ED8]', metric: 'Churn reduced 40% in 60 days', metricColor: '#3FB950' },
        { quote: 'Now we understand context daily, not only at month-end.', author: 'Carolina V.', role: 'CFO', company: 'Retail, 85 employees', avatar: 'C', gradient: 'from-[#7C3AED] to-[#5B21B6]', metric: 'Real-time visibility without analysts', metricColor: '#2F81F7' },
        { quote: 'Everything connected in 48h and week-one actions were clear.', author: 'Diego R.', role: 'Director of Operations', company: 'Industrial distributor', avatar: 'D', gradient: 'from-[#059669] to-[#047857]', metric: 'Setup in 48h, first action in 7 days', metricColor: '#D29922' },
      ],
    },
    heroMockup: { appUrl: 'app.summer87.com/dashboard', live: 'Live', summaryEyebrow: 'Executive summary', summaryTitle: 'Today you know exactly where you stand.', date: 'Apr 24', timeAgo: '2 min ago', metrics: [{ label: 'MRR', value: '', change: '▲ +12% vs last mo.' }, { label: 'Churn', value: '2.3%', change: '▲ Urgent attention' }, { label: 'Runway', value: '14 mo.', change: '● Stable' }], actionTitle: 'Action required today', actionBody: 'CAC up 28% this week. Fix before Friday or lose {{amount}}.', copilotTitle: 'Summer87 Copilot', copilotQuestion: 'What should I prioritize this week?', copilotAnswer: '1) Move 30% of Meta budget to Google. 2) Call Acme and Nexo. 3) Everything else can wait.', floatingValue: '{{amount}}', floatingLabel: 'MRR this month' },
    pricingSection: { perMonth: '/mo', billedAnnually: 'Billed annually —', perYear: '/year', billedMonthly: 'Billed month to month', customTitle: 'Custom pricing', customSubtitle: 'Based on volume and requirements', plans: [{ name: 'Starter', tagline: 'For teams that need operational clarity now', priceMonthly: 299, priceAnnual: 239, cta: 'Start free trial', ctaHref: '#demo', highlight: false, badge: null, pitch: 'Includes Intelligence, Copilot and initial automation.', features: ['Up to 3 integrations', 'Executive dashboard (Intelligence)', 'Smart alerts', 'AI Copilot (50 queries/month)', 'Basic workflow automation', 'Weekly report', 'Email support'], notIncluded: ['Unlimited alerts', 'Unlimited Copilot', 'Predictive analytics', 'Dedicated onboarding'] }, { name: 'Growth', tagline: 'For teams scaling with execution discipline', priceMonthly: 799, priceAnnual: 639, cta: 'See personalized demo', ctaHref: '#demo', highlight: true, badge: 'Most requested', pitch: 'Expanded Intelligence, Copilot and Automation coverage.', features: ['Unlimited integrations', 'Executive dashboard + custom views', 'Unlimited alerts', 'Unlimited Copilot', 'Advanced workflow automation', 'Automated reports', 'Predictive analytics', 'Up to 10 users', 'Priority support', '48h onboarding'], notIncluded: ['Enterprise SLA', 'SSO / SAML', 'Dedicated instance'] }, { name: 'Enterprise', tagline: 'For organizations with specific requirements', priceMonthly: null, priceAnnual: null, cta: 'Talk to sales', ctaHref: '#contacto', highlight: false, badge: null, pitch: 'SLA, SSO, dedicated instance and expert CSM.', features: ['Everything in Growth, plus:', 'Unlimited users', '99.9% contractual SLA', 'SSO / SAML', 'Dedicated instance', 'Custom API integrations', 'Dedicated Customer Success', 'Custom onboarding', 'Local currency billing'], notIncluded: [] }], guarantees: [{ title: '30-day money-back guarantee', desc: 'If you do not see concrete value in 30 days, we refund.' }, { title: 'Setup in 48 hours', desc: 'Our team implements without long projects.' }, { title: 'No contracts. No lock-in.', desc: 'Cancel anytime and keep your data.' }] },
    demoExtra: { starsAria: '5 stars' },
    finalCtaExtra: {
      responsePrefix: 'We reply in less than',
      responseHighlight: '2 business hours.',
      responseSuffix: 'Yes, really.',
      trust: [
        { value: '14 days', label: 'free to start' },
        { value: 'No card', label: 'required' },
        { value: '48 hours', label: 'for initial setup' },
        { value: '30 days', label: 'money-back guarantee' },
      ],
      starsAria: '5 stars',
      quote: 'The demo took 30 minutes. I left with 3 clear weekly decisions.',
      author: 'Martin G. — Founder, HR SaaS',
    },
    notFound: { title: 'This page does not exist.', body: 'But your business does. Go back home and understand your numbers.', cta: 'Back to home' },
  },
  de: {
    heroExtraNarrative: 'Summer87 kombiniert Business Intelligence, KI-Copilot und Automation für bessere Transparenz, operative Steuerung und fundierte Entscheidungen.',
    navbarExtra: { servicesLabel: 'Services' },
    servicesPillars: {
      badge: 'Kernservices',
      title: 'Die drei Säulen von Summer87',
      description: 'Summer87 vereint drei zentrale Services für Analyse, Entscheidungsunterstützung und operative Automation.',
      items: [
        { title: 'Summer87 Intelligence', description: 'Business Intelligence mit Finanzanalyse, umsetzbaren Dashboards und frühen Alerts.', benefits: ['Vereinheitlichte Finanz- und Operations-KPIs', 'Früherkennung relevanter Abweichungen', 'Datenbasierte Entscheidungsvorschläge'], ctaLabel: 'Intelligence ansehen', ctaHref: '#producto' },
        { title: 'Summer87 Copilot', description: 'KI-Copilot zur Interpretation von Daten, Beantwortung von Fragen und Priorisierung von Maßnahmen.', benefits: ['Geführte Metrik-Interpretation', 'Kontextbezogene Empfehlungen', 'Wöchentliche Priorisierung'], ctaLabel: 'Copilot ansehen', ctaHref: '#producto' },
        { title: 'Summer87 Automation', description: 'Workflow-Automation und Systemintegration zur Reduktion manueller Aufgaben.', benefits: ['Verknüpfte Tools und Prozesse', 'Automatisierung wiederkehrender Aufgaben', 'Konsistente operative Abläufe'], ctaLabel: 'Automation ansehen', ctaHref: '#integraciones' },
      ],
    },
    howItWorks: {
      badge: 'So funktioniert es',
      title: 'Von verstreuten Daten zu',
      titleHighlight: 'klaren Entscheidungen.',
      description: 'In 4 Schritten: verbinden, analysieren, empfehlen und automatisieren.',
      cta: 'Jetzt starten — ohne Kreditkarte',
      note: 'Setup in 48 Stunden. Erster Insight in unter 7 Tagen.',
      steps: [
        { number: '01', title: 'Daten und Prozesse verbinden', description: 'Finanz- und operative Systeme in einer Sicht zusammenführen.', detail: 'Schnelle Integrationsphase.', color: '#2F81F7', items: ['Finanzquellen', 'Kommerzielle Systeme', 'Operationstools', 'Kontinuierliche Synchronisierung'] },
        { number: '02', title: 'Kritische Informationen analysieren', description: 'Summer87 Intelligence zeigt Trends und relevante Abweichungen.', detail: 'Kontinuierliche Analyse.', color: '#7C3AED', items: ['Strategische KPIs', 'Abweichungserkennung', 'Ursachenanalyse', 'Umsetzbare Dashboards'] },
        { number: '03', title: 'Empfehlungen erhalten', description: 'Summer87 Copilot beantwortet Fragen und priorisiert nächste Schritte.', detail: 'Entscheidungsunterstützung für Teams.', color: '#3FB950', items: ['Q&A-Unterstützung', 'Empfehlungen', 'Priorisierung', 'Business-Kontext'] },
        { number: '04', title: 'Wiederholbare Aktionen automatisieren', description: 'Summer87 Automation koordiniert wiederkehrende Abläufe systemübergreifend.', detail: 'Effizientere Ausführung.', color: '#D29922', items: ['Automatisierte Flows', 'Systemintegration', 'Weniger manuelle Arbeit', 'Operative Nachvollziehbarkeit'] },
      ],
    },
    useCases: { badge: 'Anwendungsfälle', title: 'Für deine Branche,', titleHighlight: 'dein Problem.', description: 'Anwendungsfälle für Business Intelligence, KI-Copilot und operative Automation.', problemLabel: 'Problem:', solutionLabel: 'Summer87:', metricsLabel: 'Überwachte KPIs', resultLabel: 'Reales Ergebnis', cases: [{ industry: 'SaaS / Tech', icon: '⬡', color: '#2F81F7', problem: 'MRR wächst, Marge fällt.', solution: 'Summer87 Intelligence erkennt Margentreiber und priorisiert den ersten Hebel.', metrics: ['MRR + Expansion', 'CAC nach Kanal', 'Churn nach Kohorten', 'NRR'], result: 'Marge in 45 Tagen verbessert.' }, { industry: 'Decision Copilot', icon: '◈', color: '#7C3AED', problem: 'Teams müssen schwankende Metriken schneller interpretieren.', solution: 'Summer87 Copilot beantwortet Business-Fragen und priorisiert Maßnahmen.', metrics: ['Beantwortete Fragen', 'Analysezeit', 'Priorisierung', 'Ausgeführte Maßnahmen'], result: 'Schnellere Abstimmung und Umsetzung.' }, { industry: 'Workflow Automation', icon: '◉', color: '#3FB950', problem: 'Manuelle Koordination bremst wiederkehrende Abläufe.', solution: 'Summer87 Automation orchestriert repetitive Workflows systemübergreifend.', metrics: ['Automatisierte Flows', 'Weniger manuelle Arbeit', 'Prozesslaufzeit', 'Fehlerquote'], result: 'Höhere operative Konsistenz.' }, { industry: 'Produktion / Distribution', icon: '◆', color: '#D29922', problem: 'Unvorhersehbarer Cashflow.', solution: 'Summer87 projiziert 90-Tage-Cashrisiko über Zyklen.', metrics: ['Cashflow Prognose', 'DSO und DPO', 'Konversionszyklus', 'Working Capital'], result: 'Lieferkonditionen vor kritischem Punkt verbessert.' }] },
    integrations: { badge: 'Integrationen', title: 'Verbinde, was du', titleHighlight: 'bereits nutzt.', description: '40+ Integrationen verfügbar. Ohne Code, ohne Berater.', moreAvailable: 'mehr verfügbar', notFoundTitle: 'Tool nicht gefunden?', notFoundBody: 'Wir haben eine offene API für Custom-Integrationen.', contact: 'Kontakt', items: [{ name: 'Stripe', category: 'Payments', color: '#635BFF' }, { name: 'QuickBooks', category: 'Buchhaltung', color: '#2CA01C' }, { name: 'Xero', category: 'Buchhaltung', color: '#13B5EA' }, { name: 'Shopify', category: 'E-commerce', color: '#95BF47' }, { name: 'HubSpot', category: 'CRM', color: '#FF7A59' }, { name: 'Salesforce', category: 'CRM', color: '#00A1E0' }, { name: 'Mercado Pago', category: 'Payments', color: '#009EE3' }, { name: 'Google Sheets', category: 'Tabellen', color: '#34A853' }, { name: 'Slack', category: 'Benachrichtigungen', color: '#4A154B' }, { name: 'Notion', category: 'Produktivität', color: '#000000' }, { name: 'Pipedrive', category: 'CRM', color: '#26292C' }, { name: 'WooCommerce', category: 'E-commerce', color: '#7F54B3' }] },
    testimonials: {
      badge: 'Echte Kunden',
      title: 'Was Teams sagen, die es',
      titleHighlight: 'bereits nutzen.',
      description: 'Founder und Führungskräfte entscheiden jetzt mit Klarheit.',
      starsAria: '5 Sterne',
      stats: [
        { value: '120+', label: 'Aktive Unternehmen', color: '#2F81F7' },
        { value: '94%', label: '6-Monats-Retention', color: '#3FB950' },
        { value: '48h', label: 'Durchschnittliches Setup', color: '#D29922' },
        { value: '4.9/5', label: 'Durchschnittlicher NPS', color: '#7C3AED' },
      ],
      items: [
        { quote: 'In zwei Wochen habe ich mein Business besser verstanden als in zwei Jahren mit Excel.', author: 'Martin G.', role: 'Founder & CEO', company: 'HR SaaS, Series A', avatar: 'M', gradient: 'from-[#2F81F7] to-[#1D4ED8]', metric: 'Churn in 60 Tagen um 40% gesenkt', metricColor: '#3FB950' },
        { quote: 'Jetzt haben wir täglich Kontext statt nur Monatsabschluss.', author: 'Carolina V.', role: 'CFO', company: 'Retail, 85 Mitarbeitende', avatar: 'C', gradient: 'from-[#7C3AED] to-[#5B21B6]', metric: 'Echtzeit-Transparenz ohne Analysten', metricColor: '#2F81F7' },
        { quote: 'In 48h war alles verbunden und erste Maßnahmen waren klar.', author: 'Diego R.', role: 'Director of Operations', company: 'Industriedistributor', avatar: 'D', gradient: 'from-[#059669] to-[#047857]', metric: 'Setup in 48h, erste Aktion in 7 Tagen', metricColor: '#D29922' },
      ],
    },
    heroMockup: { appUrl: 'app.summer87.com/dashboard', live: 'Live', summaryEyebrow: 'Executive Summary', summaryTitle: 'Heute weißt du genau, wo du stehst.', date: '24 Apr', timeAgo: 'vor 2 Min', metrics: [{ label: 'MRR', value: '', change: '▲ +12% vs Vormonat' }, { label: 'Churn', value: '2.3%', change: '▲ Dringende Aufmerksamkeit' }, { label: 'Runway', value: '14 mo.', change: '● Stabil' }], actionTitle: 'Aktion heute erforderlich', actionBody: 'CAC +28% diese Woche. Vor Freitag korrigieren oder {{amount}} verlieren.', copilotTitle: 'Summer87 Copilot', copilotQuestion: 'Was soll ich diese Woche priorisieren?', copilotAnswer: '1) 30% Meta-Budget zu Google verschieben. 2) Acme und Nexo anrufen. 3) Rest kann warten.', floatingValue: '{{amount}}', floatingLabel: 'MRR diesen Monat' },
    pricingSection: { perMonth: '/Monat', billedAnnually: 'Jährlich abgerechnet —', perYear: '/Jahr', billedMonthly: 'Monatlich abgerechnet', customTitle: 'Individueller Preis', customSubtitle: 'Nach Volumen und Anforderungen', plans: [{ name: 'Starter', tagline: 'Für Teams mit Bedarf an operativer Klarheit', priceMonthly: 299, priceAnnual: 239, cta: 'Kostenlos testen', ctaHref: '#demo', highlight: false, badge: null, pitch: 'Enthält Intelligence, Copilot und erste Automation.', features: ['Bis zu 3 Integrationen', 'Executive Dashboard (Intelligence)', 'Smart Alerts', 'AI Copilot (50 Anfragen/Monat)', 'Basis-Workflow-Automation', 'Wöchentlicher Report', 'E-Mail-Support'], notIncluded: ['Unbegrenzte Alerts', 'Unbegrenzter Copilot', 'Predictive Analytics', 'Dediziertes Onboarding'] }, { name: 'Growth', tagline: 'Für skalierende Teams mit Fokus auf Umsetzung', priceMonthly: 799, priceAnnual: 639, cta: 'Personalisierte Demo', ctaHref: '#demo', highlight: true, badge: 'Meist angefragt', pitch: 'Erweiterte Abdeckung für Intelligence, Copilot und Automation.', features: ['Unbegrenzte Integrationen', 'Dashboard + Custom Views', 'Unbegrenzte Alerts', 'Unbegrenzter Copilot', 'Erweiterte Workflow-Automation', 'Automatisierte Reports', 'Predictive Analytics', 'Bis zu 10 Nutzer', 'Priority Support', 'Onboarding in 48h'], notIncluded: ['Enterprise SLA', 'SSO / SAML', 'Dedizierte Instanz'] }, { name: 'Enterprise', tagline: 'Für Organisationen mit speziellen Anforderungen', priceMonthly: null, priceAnnual: null, cta: 'Mit Sales sprechen', ctaHref: '#contacto', highlight: false, badge: null, pitch: 'SLA, SSO, dedizierte Instanz und CSM.', features: ['Alles aus Growth, plus:', 'Unbegrenzte Nutzer', '99.9% SLA vertraglich', 'SSO / SAML', 'Dedizierte Instanz', 'Custom API Integrationen', 'Dedizierter Customer Success', 'Custom Onboarding', 'Lokale Währungsabrechnung'], notIncluded: [] }], guarantees: [{ title: '30-Tage-Geld-zurück-Garantie', desc: 'Wenn kein klarer Mehrwert sichtbar wird, erstatten wir.' }, { title: 'Setup in 48 Stunden', desc: 'Implementierung ohne lange Projekte.' }, { title: 'Keine Verträge, kein Lock-in', desc: 'Jederzeit kündbar, Daten bleiben bei dir.' }] },
    demoExtra: { starsAria: '5 Sterne' },
    finalCtaExtra: {
      responsePrefix: 'Wir antworten in weniger als',
      responseHighlight: '2 Arbeitsstunden.',
      responseSuffix: 'Ja, wirklich.',
      trust: [
        { value: '14 Tage', label: 'kostenlos zum Start' },
        { value: 'Keine Karte', label: 'erforderlich' },
        { value: '48 Stunden', label: 'für das erste Setup' },
        { value: '30 Tage', label: 'Geld-zurück-Garantie' },
      ],
      starsAria: '5 Sterne',
      quote: 'Die Demo dauerte 30 Minuten. Ich ging mit 3 klaren Entscheidungen raus.',
      author: 'Martin G. — Founder, HR SaaS',
    },
    notFound: { title: 'Diese Seite existiert nicht.', body: 'Aber dein Business schon. Geh zur Startseite und verstehe deine Zahlen.', cta: 'Zur Startseite' },
  },
} as Record<Locale, {
  heroExtraNarrative: string
  navbarExtra: { servicesLabel: string }
  servicesPillars: { badge: string; title: string; description: string; items: Array<{ title: string; description: string; benefits: string[]; ctaLabel: string; ctaHref: string }> }
  howItWorks: { badge: string; title: string; titleHighlight: string; description: string; cta: string; note: string; steps: Array<{ number: string; title: string; description: string; detail: string; color: string; items: string[] }> }
  useCases: { badge: string; title: string; titleHighlight: string; description: string; problemLabel: string; solutionLabel: string; metricsLabel: string; resultLabel: string; cases: Array<{ industry: string; icon: string; color: string; problem: string; solution: string; metrics: string[]; result: string }> }
  integrations: { badge: string; title: string; titleHighlight: string; description: string; moreAvailable: string; notFoundTitle: string; notFoundBody: string; contact: string; items: Array<{ name: string; category: string; color: string }> }
  testimonials: { badge: string; title: string; titleHighlight: string; description: string; starsAria: string; stats: Array<{ value: string; label: string; color: string }>; items: Array<{ quote: string; author: string; role: string; company: string; avatar: string; gradient: string; metric: string; metricColor: string }> }
  finalCtaExtra: { responsePrefix: string; responseHighlight: string; responseSuffix: string; trust: Array<{ value: string; label: string }>; starsAria: string; quote: string; author: string }
  heroMockup: { appUrl: string; live: string; summaryEyebrow: string; summaryTitle: string; date: string; timeAgo: string; metrics: Array<{ label: string; value: string; change: string }>; actionTitle: string; actionBody: string; copilotTitle: string; copilotQuestion: string; copilotAnswer: string; floatingValue: string; floatingLabel: string }
  pricingSection: { perMonth: string; billedAnnually: string; perYear: string; billedMonthly: string; customTitle: string; customSubtitle: string; plans: Array<{ name: string; tagline: string; priceMonthly: number | null; priceAnnual: number | null; cta: string; ctaHref: string; highlight: boolean; badge: string | null; pitch: string; features: string[]; notIncluded: string[] }>; guarantees: Array<{ title: string; desc: string }> }
  demoExtra: { starsAria: string }
  notFound: { title: string; body: string; cta: string }
}>

type ExtraDictionary = (typeof extraDictionaries)[Locale]

type Ctx = { locale: Locale; setLocale: (value: Locale) => void; t: Dictionary & ExtraDictionary }
const LanguageContext = createContext<Ctx | null>(null)

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && isLocale(saved)) return saved
  return DEFAULT_LOCALE
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    setLocale(initialLocale)
    window.localStorage.setItem(STORAGE_KEY, initialLocale)
  }, [initialLocale])

  useEffect(() => {
    const stored = readStoredLocale()
    if (stored !== initialLocale) {
      window.localStorage.setItem(STORAGE_KEY, initialLocale)
    }
  }, [initialLocale])

  const handleSetLocale = (value: Locale) => {
    setLocale(value)
    window.localStorage.setItem(STORAGE_KEY, value)
  }

  const value = useMemo(
    () => ({ locale, setLocale: handleSetLocale, t: { ...dictionaries[locale], ...extraDictionaries[locale] } }),
    [locale]
  )
  return createElement(LanguageContext.Provider, { value }, children)
}

export function useTranslation(): Ctx {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider')
  return ctx
}

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const LANGUAGE_OPTIONS: Record<Locale, { code: string; label: string }> = {
    es: { code: 'ES', label: 'Español' },
    en: { code: 'EN', label: 'English' },
    de: { code: 'DE', label: 'Deutsch' },
  }

  const switchLocale = (targetLocale: Locale) => {
    setLocale(targetLocale)
    if (!pathname) return
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 0) {
      router.replace(`/${targetLocale}`)
      return
    }
    if (isLocale(segments[0])) {
      segments[0] = targetLocale
      router.replace(`/${segments.join('/')}`)
      return
    }
    router.replace(`/${targetLocale}/${segments.join('/')}`)
  }

  return createElement(
    'select',
    {
      value: locale,
      onChange: (event: { target: { value: string } }) => {
        const nextLocale = event.target.value
        if (!isLocale(nextLocale)) return
        switchLocale(nextLocale)
      },
      className: `h-9 rounded-lg border border-[#30363D] bg-[#161B22] px-2 text-xs font-semibold text-[#F0F6FC] outline-none ${className}`.trim(),
      'aria-label': 'Language selector',
    },
    ...LOCALES.map((item) =>
      createElement(
        'option',
        { key: item, value: item },
        `[${LANGUAGE_OPTIONS[item].code}] ${LANGUAGE_OPTIONS[item].label}`
      )
    )
  )
}
