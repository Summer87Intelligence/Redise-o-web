'use client'

import { createContext, createElement, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  DEFAULT_LOCALE,
  LOCALES,
  STORAGE_KEY,
  isLocale,
  type Locale,
} from '@/lib/i18n/shared'
import { trackEvent } from '@/lib/analytics'

const esDictionary = {
  es: {
    navbar: { home: 'Inicio', links: { problem: 'Problema', services: 'Servicios', howItWorks: 'Cómo funciona', useCases: 'Casos de uso', origin: 'Origen', faq: 'FAQ', producto: 'Servicios', comoFunciona: 'Cómo trabajamos', casos: 'Casos de uso', pricing: 'Servicios' }, cta: 'Agendar una reunión', aria: { home: 'Summer87 inicio', nav: 'Navegación principal', open: 'Abrir menú', close: 'Cerrar menú', mobileMenu: 'Menú mobile' } },
    hero: { badge: 'Servicios consultivos con IA aplicada', title: 'Dejá de adivinar.', titleHighlight: 'Empezá a decidir.', description: 'Acompañamiento consultivo: datos, IA y automatización para alinear finanzas, operaciones y crecimiento.', descriptionStrong: 'Recomendaciones y diagnóstico, no promesas genéricas.', bullets: ['Claridad en qué medir y con qué contexto', 'Criterios de prioridad acordes a tu realidad', 'Hoja de ruta acorde a lo que hoy sostenés'], sub: 'Para equipos que necesitan más claridad comercial, operativa y financiera.', ctaPrimary: 'Agendar una reunión', ctaSecondary: 'Contactar por WhatsApp', social: 'Acompañamos procesos de decisión en áreas clave', statusNote: 'Solicitar una demostración · Implementación coordinada' },
    problem: { badge: 'El problema real', title: 'El problema no es que te falten datos.', titleHighlight: 'Es que nadie te los traduce.', description: 'Cada día que tu negocio opera sin claridad financiera es un día que dejás plata sobre la mesa.', cards: [{ headline: 'Tus datos viven en 5 herramientas. Tu claridad, en ninguna.', body: 'Stripe te dice cuánto facturaste. QuickBooks cuánto gastaste. El CRM cuánto vendiste. Ninguna te dice qué está pasando ni qué hacer.', cost: 'Costo real: decisiones con información incompleta todos los días.' }, { headline: 'Cuando llega el reporte, el momento ya pasó.', body: 'El cierre periódico llega tarde. Para entonces ya tomaste decisiones sin la info correcta y el costo se multiplica.', cost: 'Costo real: siempre reaccionás tarde y el margen se erosiona.' }, { headline: 'Sabés que algo está mal, pero no dónde.', body: 'Cae el margen: ¿CAC, churn, ticket promedio o todo junto? Sin correlación solo queda adivinar.', cost: 'Costo real: tiempo y dinero en el problema equivocado.' }], note: 'Summer87 no es otra herramienta para sumar a tu stack.', noteHighlight: 'Es la capa que conecta todo y te dice qué hacer.' },
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
        generatedReply: 'Con tus datos actuales, el principal driver es la caida de conversion en cuentas clave. Te recomiendo revisar hoy el pipeline con ventas para evitar impacto en forecast.',
      },
      footerCta: 'Queres ver esto con tus datos reales?',
      footerDescription: 'En 30 minutos te mostramos cómo podría verse tu negocio con un enfoque consultivo.',
      footerButton: 'Ver mi demo personalizada',
    },
    pricing: { badge: 'Servicios consultivos', title: 'Servicios diseñados para mejorar decisiones,', titleHighlight: 'operación y crecimiento', description: 'Tres líneas de trabajo complementarias para convertir datos, procesos y conocimiento comercial en acciones medibles.', sub: 'Acompañamiento consultivo con hoja de ruta y ejecución conjunta.' },
    faq: {
      badge: 'Preguntas frecuentes',
      title: 'Todo lo que necesitás',
      titleHighlight: 'saber.',
      description: 'Si tu pregunta no está acá, escribinos a',
      categories: [
        {
          title: 'Producto',
          items: [
            { question: 'En qué consiste Summer87?', answer: 'Summer87 conecta tus fuentes financieras y operativas, interpreta los datos con IA y te orienta con recomendaciones accionables.' },
            { question: 'En qué se diferencia de Power BI o Tableau?', answer: 'Power BI y Tableau requieren analistas. Summer87 está diseñado para decisiones ejecutivas sin depender de un equipo de datos.' },
            { question: 'Qué es el Copilot?', answer: 'Es una interfaz conversacional para preguntar en lenguaje natural y recibir respuestas accionables sobre tu negocio.' },
            { question: 'Necesito un equipo de datos para usar Summer87?', answer: 'No. El equipo de Summer87 acompaña la implementación y el producto está pensado para founders y directivos.' },
          ],
        },
        {
          title: 'Implementacion',
          items: [
            { question: 'Cuánto tiempo lleva el setup?', answer: 'El setup inicial se coordina en un plazo corto y en los primeros ciclos de trabajo se obtienen insights accionables.' },
            { question: 'Qué integraciones tienen disponibles?', answer: 'Más de 40 integraciones disponibles, incluyendo Stripe, QuickBooks, Shopify, HubSpot y Salesforce.' },
            { question: 'Qué pasa si mis datos están en Excel?', answer: 'Podemos conectarlo mediante importación CSV/Excel o vía Google Sheets/API.' },
          ],
        },
        {
          title: 'Seguridad',
          items: [
            { question: 'Mis datos financieros están seguros?', answer: 'Sí. Usamos cifrado TLS en tránsito y cifrado en reposo, con controles de acceso y buenas prácticas corporativas.' },
            { question: 'Dónde se alojan los datos?', answer: 'Se alojan en infraestructura cloud segura, con opciones regionales para cuentas corporativas.' },
          ],
        },
        {
          title: 'Comercial',
          items: [
            { question: '¿Cómo funciona la contratación?', answer: 'Trabajamos con acuerdos claros según el alcance definido en la etapa inicial. Las condiciones se ajustan al tipo de implementación y acompañamiento requerido.' },
            { question: '¿Cómo iniciamos el trabajo?', answer: 'Comenzamos con una reunión de diagnóstico para entender tu contexto, definir prioridades y evaluar el encaje de Summer87 en tu operación.' },
            { question: '¿Cómo se define el precio?', answer: 'El costo se determina en función del alcance, complejidad de integraciones y nivel de acompañamiento requerido. No trabajamos con planes genéricos.' },
            { question: 'Qué pasa si no veo valor?', answer: 'Se revisa el alcance junto al equipo y se ajusta el plan de trabajo en función de los objetivos definidos.' },
          ],
        },
      ],
    },
    finalCta: { urgency: 'Definí próximos pasos con foco operativo', title: 'Tu negocio genera datos.', titleHighlight: 'Summer87 los convierte en decisiones.', description: 'En una reunión te mostramos cómo aplicar Summer87 en tu contexto comercial y operativo.', sub: 'Enfoque consultivo, claro y accionable.', ctaPrimary: 'Agendar una reunión', ctaSecondary: 'Contactar por WhatsApp' },
    footer: { description: 'El copiloto financiero para founders y empresas en crecimiento.', contact: 'Contacto', links: { producto: 'Producto', empresa: 'Empresa', legal: 'Legal', comoFunciona: 'Cómo funciona', copilot: 'Copilot', integrations: 'Integraciones', pricing: 'Servicios', casos: 'Casos de uso', blog: 'Blog', faq: 'FAQ', contacto: 'Contacto', privacidad: 'Privacidad', terminos: 'Términos', seguridad: 'Seguridad' }, rights: 'Todos los derechos reservados.', systems: 'Todos los sistemas operativos' },
    demo: {
      successTitle: 'Solicitud recibida',
      successDescription: 'Gracias. El equipo de Summer87 revisará tu contexto y se pondrá en contacto para coordinar una reunión.',
      successListTitle: 'Próximos pasos:',
      successList: ['Revisaremos la información enviada', 'Identificaremos el enfoque más relevante', 'Te contactaremos por el canal indicado'],
      backHome: 'Volver al inicio',
      step: 'Paso',
      of: 'de',
      continue: 'Continuar',
      back: 'Atrás',
      reserve: 'Solicitar reunión',
      roles: ['Dirección general', 'Dirección financiera', 'Dirección de operaciones', 'Responsable comercial', 'Otro'],
      sizes: ['1–10', '11–50', '51–200', '+200'],
      industries: ['SaaS / Tech', 'Retail / E-commerce', 'Servicios profesionales', 'Manufactura / Distribución', 'Otro'],
      services: ['Neuroventas', 'Motores inteligentes de negocio', 'Summer87 Business Intelligence', 'No estoy seguro'],
      problems: ['No tengo claridad suficiente sobre mis números', 'Los datos están dispersos en varias herramientas', 'Tomo decisiones con información incompleta', 'El equipo pierde tiempo consolidando reportes', 'No sé qué métricas priorizar'],
      urgencies: ['Lo necesito cuanto antes', 'En los próximos 30 días', 'Estoy evaluando opciones'],
      step1: { title: 'Información del participante', subtitle: 'Esta información nos permite entender el contexto inicial y preparar una conversación útil.', roleLabel: 'Rol dentro de la organización', nameLabel: 'Nombre completo', namePlaceholder: 'Ej.: Martín García', emailLabel: 'Email profesional', emailPlaceholder: 'nombre@empresa.com', whatsappLabel: 'WhatsApp', whatsappPlaceholder: '+598 98 000 000' },
      step2: { title: 'Contexto de la empresa', subtitle: 'Esto ayuda a enfocar la reunión en procesos, datos y prioridades reales.', sizeLabel: 'Tamaño del equipo', industryLabel: 'Industria', serviceLabel: 'Servicio de interés' },
      step3: { title: 'Situación actual', subtitle: 'Seleccioná los puntos que hoy te gustaría ordenar o mejorar.', problemsLabel: 'Mayor desafío actual:', urgencyLabel: 'Urgencia:', commentLabel: 'Comentario adicional', commentPlaceholder: 'Contexto adicional que ayude a preparar la reunión (opcional)' },
      panel: { title: 'Qué vamos a revisar', bullets: ['Contexto operativo y comercial', 'Procesos donde hoy se pierde visibilidad', 'Oportunidades de automatización o análisis', 'Próximos pasos recomendados'], note: 'Una reunión clara permite entender si Summer87 puede aportar valor antes de hablar de implementación.' },
    },
  },
  en: {
    navbar: { home: 'Home', links: { problem: 'Problem', services: 'Services', howItWorks: 'How it works', useCases: 'Use cases', origin: 'Origin', faq: 'FAQ', producto: 'Services', comoFunciona: 'How we work', casos: 'Use cases', pricing: 'Services' }, cta: 'Schedule a meeting', aria: { home: 'Summer87 home', nav: 'Main navigation', open: 'Open menu', close: 'Close menu', mobileMenu: 'Mobile menu' } },
    hero: { badge: 'Consulting services with applied AI', title: 'Stop guessing.', titleHighlight: 'Start deciding.', description: 'Consultative support: data, AI and automation to align finance, operations and growth.', descriptionStrong: 'Recommendations and diagnosis, not generic promises.', bullets: ['Clarity on what to measure and in what context', 'Priority criteria aligned with your reality', 'A roadmap aligned with what you sustain today'], sub: 'For teams that need commercial, operational and financial clarity.', ctaPrimary: 'Schedule a meeting', ctaSecondary: 'Contact via WhatsApp', social: 'We support decision processes across key areas', statusNote: 'Request a demo · Coordinated implementation' },
    problem: { badge: 'The real problem', title: "The problem isn't lack of data.", titleHighlight: "It's the lack of translation.", description: 'Every day without financial clarity is money left on the table.', cards: [{ headline: 'Your data lives in 5 tools. Your clarity in none.', body: 'Each tool shows one slice. None explains what is actually happening or what to do next.', cost: 'Real cost: daily decisions with incomplete information.' }, { headline: 'When reports arrive, the window is gone.', body: 'By month-end close, critical moves were already made without context.', cost: 'Real cost: late reaction and shrinking margin.' }, { headline: 'You know something is wrong, not where.', body: 'Margin drops but root cause stays hidden without a layer connecting all signals.', cost: 'Real cost: time and money on the wrong problem.' }], note: 'Summer87 is not one more tool in your stack.', noteHighlight: 'It is the decision layer across your existing systems.' },
    whatIs: { badge: 'What Summer87 is', title: 'Financial intelligence', titleHighlight: 'for modern organizations.', description: 'Summer87 turns data into clear next actions in executive language.', features: [{ title: 'Tells you what to do, not only what happened', description: 'It explains cause and ranks the next move by impact.' }, { title: 'Filters noise, prioritizes impact', description: 'You see what matters now, not endless dashboards.' }, { title: 'Speaks like a CFO', description: 'Business language, not analyst jargon.' }, { title: 'Flags risk before it becomes expensive', description: '24/7 monitoring to catch deviations early.' }], isNotTitle: 'Summer87 is NOT', isNotSub: 'So you avoid wasting time comparing wrong tools', isNotItems: ['Accounting software', 'A CRM or ERP', 'A dashboard you configure and forget', 'A tool that needs analysts', 'Another delayed contextless report', 'Power BI with a different name'], isTitle: 'Summer87 IS', isDescription: 'Your AI financial analyst: connected data, interpreted context, prioritized actions.', stats: [{ value: '48h', label: 'First setup', sublabel: 'No consultants' }, { value: '< 7d', label: 'First insight', sublabel: 'Guaranteed' }, { value: '30d', label: 'Visible ROI', sublabel: 'Or full refund' }] },
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
        { label: 'Churn', value: '2.3%', change: '+0.4pp', trend: 'down', detail: 'recent period' },
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
        generatedReply: 'Based on your current data, the main driver is lower key-account conversion. I recommend a sales pipeline check-in today before it impacts forecast.',
      },
      footerCta: 'Want to see this with your real data?',
      footerDescription: 'In 30 minutes we walk you through how your business could look with a consulting-led approach.',
      footerButton: 'See my personalized demo',
    },
    pricing: { badge: 'Consulting services', title: 'Services designed to improve decisions,', titleHighlight: 'operations and performance', description: 'Three complementary lines of work to turn data, processes and commercial knowledge into measurable actions.', sub: 'Consulting engagement with roadmap and execution support.' },
    faq: {
      badge: 'Frequently asked questions',
      title: 'Everything you need to',
      titleHighlight: 'know.',
      description: 'If your question is not here, write to',
      categories: [
        { title: 'Product', items: [{ question: 'What does Summer87 do?', answer: 'Summer87 connects your financial and operational data, interprets it with AI, and recommends clear next actions.' }, { question: 'How is it different from Power BI or Tableau?', answer: 'Power BI and Tableau are analyst tools. Summer87 is built for executive decision-making without a data team.' }, { question: 'What is Copilot?', answer: 'A conversational interface that answers business questions in natural language with contextual recommendations.' }, { question: 'Do I need a data team?', answer: 'No. We handle setup and Summer87 is designed for founders and leaders.' }] },
        { title: 'Implementation', items: [{ question: 'How long does setup take?', answer: 'Initial setup is coordinated in a short timeframe and actionable insights typically arrive in the first work cycles.' }, { question: 'Which integrations are available?', answer: '40+ integrations including Stripe, QuickBooks, Shopify, HubSpot, and Salesforce.' }, { question: 'What if my data is in Excel?', answer: 'We support CSV/Excel imports and can connect through Sheets or API.' }] },
        { title: 'Security', items: [{ question: 'Is my financial data secure?', answer: 'Yes. We use encryption in transit and at rest with corporate-grade access controls.' }, { question: 'Where is data hosted?', answer: 'Data is hosted on secure cloud infrastructure with regional options for corporate accounts.' }] },
        { title: 'Commercial', items: [{ question: 'How does contracting work?', answer: 'We work with clear agreements based on the scope defined during the initial stage. Terms are adjusted to the type of implementation and level of support required.' }, { question: 'How do we get started?', answer: 'We start with a diagnostic meeting to understand your context, define priorities, and evaluate Summer87 fit for your operation.' }, { question: 'How is pricing defined?', answer: 'Pricing is defined based on scope, integration complexity, and the level of support required. We do not work with generic plans.' }, { question: 'What if I do not see value?', answer: 'We agree a measurable implementation roadmap and review progress with your team.' }] },
      ],
    },
    finalCta: { urgency: 'Define next steps with operational focus', title: 'Your business generates data.', titleHighlight: 'Summer87 turns it into decisions.', description: 'In a meeting we show how to apply Summer87 to your commercial and operational context.', sub: 'Consulting approach, clear and actionable.', ctaPrimary: 'Schedule a meeting', ctaSecondary: 'Contact via WhatsApp' },
    footer: { description: 'The financial copilot for founders and scaling companies.', contact: 'Contact', links: { producto: 'Product', empresa: 'Company', legal: 'Legal', comoFunciona: 'How it works', copilot: 'Copilot', integrations: 'Integrations', pricing: 'Services', casos: 'Use cases', blog: 'Blog', faq: 'FAQ', contacto: 'Contact', privacidad: 'Privacy', terminos: 'Terms', seguridad: 'Security' }, rights: 'All rights reserved.', systems: 'All systems operational' },
    demo: {
      successTitle: 'Request received',
      successDescription: 'Thank you. The Summer87 team will review your context and get in touch to coordinate a meeting.',
      successListTitle: 'Next steps:',
      successList: ['We will review the information submitted', 'We will identify the most relevant approach', 'We will contact you via the channel indicated'],
      backHome: 'Back to home',
      step: 'Step',
      of: 'of',
      continue: 'Continue',
      back: 'Back',
      reserve: 'Request a meeting',
      roles: ['General management', 'Finance management', 'Operations management', 'Commercial lead', 'Other'],
      sizes: ['1–10', '11–50', '51–200', '+200'],
      industries: ['SaaS / Tech', 'Retail / E-commerce', 'Professional services', 'Manufacturing / Distribution', 'Other'],
      services: ['Neurosales', 'Intelligent business engines', 'Summer87 Business Intelligence', 'Not sure yet'],
      problems: ['I lack sufficient clarity about my numbers', 'Data is scattered across multiple tools', 'I make decisions with incomplete information', 'The team spends time consolidating reports', 'I do not know which metrics to prioritize'],
      urgencies: ['I need it as soon as possible', 'In the next 30 days', 'I am evaluating options'],
      step1: { title: 'Participant information', subtitle: 'This helps us understand the initial context and prepare a useful conversation.', roleLabel: 'Role within the organization', nameLabel: 'Full name', namePlaceholder: 'e.g. Martin Garcia', emailLabel: 'Professional email', emailPlaceholder: 'name@company.com', whatsappLabel: 'WhatsApp', whatsappPlaceholder: '+1 555 000 0000' },
      step2: { title: 'Company context', subtitle: 'This helps focus the meeting on real processes, data and priorities.', sizeLabel: 'Team size', industryLabel: 'Industry', serviceLabel: 'Service of interest' },
      step3: { title: 'Current situation', subtitle: 'Select the areas you would like to clarify or improve.', problemsLabel: 'Biggest current challenge:', urgencyLabel: 'Urgency:', commentLabel: 'Additional comments', commentPlaceholder: 'Additional context to help prepare the meeting (optional)' },
      panel: { title: 'What we will review', bullets: ['Operational and commercial context', 'Processes where visibility is currently lost', 'Automation or analysis opportunities', 'Recommended next steps'], note: 'A clear initial meeting helps determine whether Summer87 can add value before discussing implementation.' },
    },
  },
  de: {
    navbar: { home: 'Start', links: { problem: 'Problem', services: 'Leistungen', howItWorks: 'So funktioniert es', useCases: 'Anwendungsfälle', origin: 'Ursprung', faq: 'FAQ', producto: 'Leistungen', comoFunciona: 'So arbeiten wir', casos: 'Anwendungsfälle', pricing: 'Leistungen' }, cta: 'Termin vereinbaren', aria: { home: 'Summer87 Startseite', nav: 'Hauptnavigation', open: 'Menü öffnen', close: 'Menü schließen', mobileMenu: 'Mobiles Menü' } },
    hero: { badge: 'Beratungsleistungen mit angewandter KI', title: 'Hör auf zu raten.', titleHighlight: 'Beginne zu entscheiden.', description: 'Beratende Begleitung: Daten, KI und Automatisierung, um Finanzen, Betrieb und Wachstum aufeinander abzustimmen.', descriptionStrong: 'Empfehlungen und Diagnose, keine generischen Versprechen.', bullets: ['Klarheit darüber, was Sie in welchem Kontext messen sollten', 'Prioritätskriterien, die zu Ihrer Realität passen', 'Eine Roadmap, die zu Ihrer heutigen Ausgangslage passt'], sub: 'Für Teams mit Bedarf an vertrieblicher, operativer und finanzieller Klarheit.', ctaPrimary: 'Termin vereinbaren', ctaSecondary: 'Per WhatsApp kontaktieren', social: 'Wir begleiten Entscheidungsprozesse in zentralen Bereichen', statusNote: 'Demo anfordern · Koordinierte Umsetzung' },
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
        generatedReply: 'Dein Haupttreiber ist aktuell die sinkende Conversion bei Schluesselkunden. Ich empfehle heute ein Sales-Review, bevor der Forecast betroffen ist.',
      },
      footerCta: 'Willst du das mit deinen echten Daten sehen?',
      footerDescription: 'In 30 Minuten zeigen wir dir, wie dein Business mit Beratungsfokus aussehen könnte.',
      footerButton: 'Meine personalisierte Demo',
    },
    pricing: { badge: 'Beratungsleistungen', title: 'Leistungen für bessere Entscheidungen,', titleHighlight: 'Abläufe und Wachstum', description: 'Drei komplementäre Leistungsbereiche, um Daten, Prozesse und Vertriebswissen in messbare Maßnahmen zu übersetzen.', sub: 'Beratungsansatz mit gemeinsamer Roadmap und Umsetzung.' },
    faq: {
      badge: 'Haufige Fragen',
      title: 'Alles, was du',
      titleHighlight: 'wissen musst.',
      description: 'Wenn deine Frage nicht hier ist, schreib an',
      categories: [
        { title: 'Produkt', items: [{ question: 'Was macht Summer87?', answer: 'Summer87 verbindet Finanz- und operative Daten, interpretiert sie mit KI und liefert klare Empfehlungen.' }, { question: 'Wie unterscheidet es sich von Power BI oder Tableau?', answer: 'Power BI und Tableau sind Analysten-Tools. Summer87 ist fuer schnelle Executive-Entscheidungen gebaut.' }, { question: 'Was ist der Copilot?', answer: 'Eine Konversationsoberflaeche, die Fragen in natuerlicher Sprache mit kontextbezogenen Empfehlungen beantwortet.' }, { question: 'Brauche ich ein Data-Team?', answer: 'Nein. Wir uebernehmen das Setup und Summer87 ist fuer Founder und Fuehrungskraefte optimiert.' }] },
        { title: 'Implementierung', items: [{ question: 'Wie lange dauert das Setup?', answer: 'Das Basis-Setup dauert 48 Stunden, erste Insights kommen meist in der ersten Woche.' }, { question: 'Welche Integrationen gibt es?', answer: '40+ Integrationen, darunter Stripe, QuickBooks, Shopify, HubSpot und Salesforce.' }, { question: 'Was wenn meine Daten in Excel sind?', answer: 'CSV/Excel-Import sowie Anbindung ueber Sheets oder API sind moeglich.' }] },
        { title: 'Sicherheit', items: [{ question: 'Sind meine Daten sicher?', answer: 'Ja. Daten sind bei Uebertragung und Speicherung verschluesselt, mit Zugriffskontrollen auf Unternehmensniveau.' }, { question: 'Wo werden Daten gehostet?', answer: 'In sicherer Cloud-Infrastruktur mit regionalen Optionen fuer Unternehmenskunden.' }] },
        { title: 'Kommerziell', items: [{ question: 'Wie funktioniert die Zusammenarbeit vertraglich?', answer: 'Wir arbeiten mit klaren Vereinbarungen auf Basis des in der Startphase definierten Umfangs. Die Konditionen richten sich nach Art der Implementierung und dem benoetigten Begleitungsgrad.' }, { question: 'Wie starten wir die Zusammenarbeit?', answer: 'Wir beginnen mit einem Diagnosetermin, um deinen Kontext zu verstehen, Prioritaeten zu definieren und den Summer87-Fit fuer deinen Betrieb zu bewerten.' }, { question: 'Wie wird der Preis festgelegt?', answer: 'Der Preis richtet sich nach Umfang, Integrationskomplexitaet und dem benoetigten Begleitungsgrad. Wir arbeiten nicht mit generischen Standardplaenen.' }, { question: 'Was wenn ich in 30 Tagen keinen Wert sehe?', answer: 'Wir arbeiten mit abgestimmter Roadmap und messen Fortschritte gemeinsam mit deinem Team.' }] },
      ],
    },
    finalCta: { urgency: 'Nächste Schritte mit operativem Fokus definieren', title: 'Dein Business erzeugt Daten.', titleHighlight: 'Summer87 macht daraus Entscheidungen.', description: 'In einem Termin zeigen wir, wie Summer87 in deinem vertrieblichen und operativen Kontext eingesetzt wird.', sub: 'Beratungsansatz, klar und umsetzbar.', ctaPrimary: 'Termin vereinbaren', ctaSecondary: 'Per WhatsApp kontaktieren' },
    footer: { description: 'Der Finanz-Copilot für Founder und wachsende Unternehmen.', contact: 'Kontakt', links: { producto: 'Produkt', empresa: 'Unternehmen', legal: 'Rechtliches', comoFunciona: 'So funktioniert es', copilot: 'Copilot', integrations: 'Integrationen', pricing: 'Leistungen', casos: 'Anwendungsfälle', blog: 'Blog', faq: 'FAQ', contacto: 'Kontakt', privacidad: 'Datenschutz', terminos: 'AGB', seguridad: 'Sicherheit' }, rights: 'Alle Rechte vorbehalten.', systems: 'Alle Systeme betriebsbereit' },
    demo: {
      successTitle: 'Anfrage eingegangen',
      successDescription: 'Vielen Dank. Das Summer87-Team wird deinen Kontext prüfen und sich melden, um ein Gespräch zu koordinieren.',
      successListTitle: 'Nächste Schritte:',
      successList: ['Wir prüfen die übermittelten Informationen', 'Wir identifizieren den relevantesten Ansatz', 'Wir kontaktieren dich über den angegebenen Kanal'],
      backHome: 'Zur Startseite',
      step: 'Schritt',
      of: 'von',
      continue: 'Weiter',
      back: 'Zurück',
      reserve: 'Termin anfragen',
      roles: ['Geschäftsleitung', 'Finanzleitung', 'Leitung Betrieb', 'Vertriebsleitung', 'Andere'],
      sizes: ['1–10', '11–50', '51–200', '+200'],
      industries: ['SaaS / Tech', 'Retail / E-commerce', 'Professionelle Dienstleistungen', 'Produktion / Distribution', 'Andere'],
      services: ['Neurovertrieb', 'Intelligente Business-Engines', 'Summer87 Business Intelligence', 'Noch nicht sicher'],
      problems: ['Ich habe keine ausreichende Klarheit über meine Zahlen', 'Daten sind auf mehrere Tools verteilt', 'Ich treffe Entscheidungen mit unvollständigen Informationen', 'Das Team verliert Zeit mit Report-Konsolidierung', 'Ich weiß nicht, welche Metriken Priorität haben'],
      urgencies: ['So bald wie möglich', 'In den nächsten 30 Tagen', 'Ich evaluiere Optionen'],
      step1: { title: 'Teilnehmerinformationen', subtitle: 'Diese Informationen helfen uns, den Kontext zu verstehen und ein nützliches Gespräch vorzubereiten.', roleLabel: 'Rolle innerhalb der Organisation', nameLabel: 'Vollständiger Name', namePlaceholder: 'z.B. Martin Garcia', emailLabel: 'Berufliche E-Mail', emailPlaceholder: 'name@unternehmen.com', whatsappLabel: 'WhatsApp', whatsappPlaceholder: '+49 000 000 0000' },
      step2: { title: 'Unternehmenskontext', subtitle: 'Das hilft, das Gespräch auf echte Prozesse, Daten und Prioritäten zu fokussieren.', sizeLabel: 'Teamgröße', industryLabel: 'Branche', serviceLabel: 'Leistung von Interesse' },
      step3: { title: 'Aktuelle Situation', subtitle: 'Wähle die Bereiche aus, die du gerne ordnen oder verbessern möchtest.', problemsLabel: 'Größte aktuelle Herausforderung:', urgencyLabel: 'Dringlichkeit:', commentLabel: 'Zusätzliche Anmerkungen', commentPlaceholder: 'Zusätzlicher Kontext zur Vorbereitung des Gesprächs (optional)' },
      panel: { title: 'Was wir besprechen werden', bullets: ['Operativer und kommerzieller Kontext', 'Prozesse mit aktuell fehlender Transparenz', 'Automatisierungs- oder Analysemöglichkeiten', 'Empfohlene nächste Schritte'], note: 'Ein klares erstes Gespräch hilft festzustellen, ob Summer87 Mehrwert bieten kann, bevor über Implementierung gesprochen wird.' },
    },
  },
}

export type Dictionary = typeof esDictionary.es
export const dictionaries: Record<Locale, Dictionary> = esDictionary

export const extraDictionaries = {
  es: {
    heroExtraNarrative: 'Summer87 combina inteligencia de negocio, copilotos con IA y automatización para mejorar la visibilidad, la operación y la toma de decisiones.',
    originStory: {
      eyebrow: 'El origen de Summer87',
      title: 'Una historia que nace del software real',
      intro:
        'Summer87 nace como homenaje a una etapa clave en la historia del software: una forma de construir soluciones más potentes, orientadas a resolver problemas reales.',
      expandedParagraphs: [
        'A finales de los años 80, cuando aún trabajábamos en entornos como MS-DOS, BASIC, COBOL, Fortran, dBase III o WordStar, surgió Clipper Summer87: una nueva forma de programar, más potente, más amigable y más orientada a construir soluciones reales.',
        'Fui parte de ese momento.',
        'Desarrollé de forma independiente una de las primeras agendas electrónicas en Uruguay para Federal Express, en una época donde en Estados Unidos se utilizaban soluciones como Lotus.',
        'Era una etapa donde “picar código” significaba construir desde cero. En paralelo, fui parte del nacimiento de una empresa líder como Memory Computación, donde comenzó una etapa clave de comprensión de los procesos de las empresas, trabajando como Analista Funcional. Cada empresa, un mundo.',
        'Luego llegó la etapa de compartir conocimiento: tuve el privilegio de ser docente en la carrera de Analista de Sistemas en el Universitario Autónomo del Sur, hoy parte de la UDE.',
        'Hoy, esa misma visión evoluciona hacia una nueva etapa: la construcción de motores inteligentes de negocio basados en inteligencia artificial, datos y estrategia.',
      ],
      highlight: 'No buscamos adaptarnos al cambio, sino entenderlo antes y transformarlo en oportunidades concretas.',
      signatureName: 'Daniel Odella',
      signatureRole: 'CEO, Summer87 SAS',
      readMore: 'Leer historia completa',
      readLess: 'Ver menos',
      expandedCta: 'Hablar sobre tu caso →',
    },
    navbarExtra: { servicesLabel: 'Servicios' },
    heroServiceChips: ['Neuroventas', 'Motores inteligentes de negocio', 'Summer87 Business Intelligence'],
    howWeWork: {
      title: 'Cómo trabajamos',
      subtitle: 'Un proceso consultivo, claro y medible para pasar del diagnóstico a la implementación.',
      steps: [
        { title: 'Diagnóstico', description: 'Relevamos procesos, datos, herramientas y objetivos.' },
        { title: 'Diseño', description: 'Definimos la solución, prioridades, flujos y criterios de éxito.' },
        { title: 'Implementación', description: 'Construimos o integramos los componentes necesarios.' },
        { title: 'Seguimiento', description: 'Medimos adopción, resultados y próximos ajustes.' },
      ],
    },
    trustBlock: {
      title: 'Enfoque de trabajo',
      items: ['Trabajo consultivo', 'IA aplicada', 'Automatización', 'BI a medida', 'Montevideo, Uruguay'],
    },
    contactShort: {
      title: 'Solicitar contacto',
      subtitle: 'Compartí tu contexto y coordinamos una reunión de trabajo.',
      fields: { name: 'Nombre', company: 'Empresa', email: 'Email', service: 'Servicio de interés', message: 'Mensaje' },
      services: ['Neuroventas', 'Motores inteligentes de negocio', 'Summer87 Business Intelligence', 'No estoy seguro/a'],
      submit: 'Solicitar contacto',
      confirmation: 'Gracias. El equipo de Summer87 revisará la información y se pondrá en contacto.',
    },
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
      cta: 'Iniciar proceso',
      note: 'Implementación coordinada y primeros insights en etapas iniciales.',
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
      badge: 'Escenarios representativos',
      title: 'Ejemplos de aplicación en',
      titleHighlight: 'situaciones habituales.',
      description: 'Casos de referencia para trabajo consultivo y priorización operativa.',
      starsAria: '5 estrellas',
      stats: [
        { value: '01', label: 'Diagnóstico consultivo', color: '#2F81F7' },
        { value: '02', label: 'Diseño y priorización', color: '#3FB950' },
        { value: '03', label: 'Implementación guiada', color: '#D29922' },
        { value: '04', label: 'Seguimiento operativo', color: '#7C3AED' },
      ],
      items: [
        { quote: 'El equipo alineó lenguaje comercial y criterios de avance en pocas sesiones de trabajo.', author: 'Equipo de gestión', role: 'Área comercial', company: 'Situación habitual de ventas', avatar: 'G', gradient: 'from-[#2F81F7] to-[#1D4ED8]', metric: 'Priorización de tareas', metricColor: '#3FB950' },
        { quote: 'La dirección financiera logró ordenar indicadores y seguimiento sin fricción entre áreas.', author: 'Dirección financiera', role: 'Gestión económica', company: 'Escenario representativo', avatar: 'F', gradient: 'from-[#7C3AED] to-[#5B21B6]', metric: 'Seguimiento sugerido', metricColor: '#2F81F7' },
        { quote: 'Operaciones definió flujos y responsabilidades con mejor coordinación entre sistemas.', author: 'Operaciones', role: 'Ejecución operativa', company: 'Ejemplo de aplicación', avatar: 'O', gradient: 'from-[#059669] to-[#047857]', metric: 'Acción recomendada', metricColor: '#D29922' },
      ],
    },
    heroMockup: {
      appUrl: 'app.summer87.com/dashboard',
      live: 'Live',
      summaryEyebrow: 'Resumen ejecutivo',
      summaryTitle: 'Hoy tenés una lectura clara del estado operativo.',
      metrics: [
        { label: 'Indicador operativo', value: '', change: 'Tendencia relevante' },
        { label: 'Desvío detectado', value: '', change: 'Acción recomendada' },
        { label: 'Seguimiento', value: '', change: 'Priorización sugerida' },
      ],
      actionTitle: 'Acción requerida hoy',
      actionBody: 'Se detectó un desvío relevante esta semana. Revisar con el equipo para definir prioridad.',
      copilotTitle: 'Summer87 Copilot',
      copilotQuestion: '¿Qué debería priorizar esta semana?',
      copilotAnswer: '1) Revisar prioridades comerciales. 2) Definir responsables por frente. 3) Dar seguimiento semanal.',
      floatingValue: '{{amount}}',
      floatingLabel: 'MRR este mes',
      liveInsights: [
        'Se detectó un desvío relevante esta semana. Revisar con el equipo para definir la prioridad.',
        'Revisar prioridades comerciales antes del próximo cierre. Definir criterios de avance claros.',
        'Validar desvíos operativos y asignar responsables. El seguimiento semanal reduce el impacto.',
      ],
    },
    servicesSection: {
      badge: 'Servicios consultivos',
      title: 'Servicios diseñados para mejorar decisiones, operación y crecimiento',
      subtitle: 'Tres líneas de trabajo complementarias para convertir datos, procesos y conocimiento comercial en acciones medibles.',
      meetingCta: 'Agendar una reunión',
      contactLabel: 'Contacto directo',
      lines: [
        {
          label: 'Línea 01',
          title: 'Neuroventas',
          short: 'Comportamiento, mensaje y proceso comercial alineados.',
          description: 'Ayudamos a mejorar cómo vende la organización: lenguaje, etapas del embudo, objeciones y handoff entre marketing y ventas, con foco en conversaciones que avanzan y métricas definidas.',
          benefits: ['Mapa de recorrido comercial', 'Guiones y criterios de calificación', 'Capacitación breve y aplicable', 'Seguimiento por indicadores acordados'],
        },
        {
          label: 'Línea 02',
          title: 'Motores inteligentes de negocio',
          short: 'IA, datos y automatización con sentido de negocio.',
          description: 'Transformamos conocimiento en sistemas de decisión: diagnóstico de procesos, integraciones pragmáticas, agentes o reglas donde corresponde, y tableros que responden a preguntas reales de dirección y operación.',
          benefits: ['Diagnóstico de procesos y datos', 'Diseño de integraciones', 'Automatización por etapas', 'Tableros y gobierno de información'],
        },
        {
          label: 'Línea 03',
          title: 'Summer87 Business Intelligence',
          short: 'BI y software a medida cuando aporta ventaja.',
          description: 'Reporting, alertas y flujos operativos alineados a procesos reales; módulos cuando un ERP genérico no encaja, con trazabilidad, permisos y hoja de ruta de implementación acordada.',
          benefits: ['Diseño por procesos y preguntas de negocio', 'Reportes y alertas accionables', 'Automatización de tareas repetitivas', 'Acompañamiento en adopción'],
        },
      ],
    },
    financialIntelligence: {
      eyebrow: 'QUÉ ES SUMMER87',
      title: 'La inteligencia financiera que antes solo tenían las grandes.',
      subtitle: 'Summer87 interpreta datos, procesos y señales del negocio para ayudarte a decidir con más contexto.',
      features: [
        { title: 'Te dice qué mirar, no solo qué pasó.', description: 'Organiza señales financieras, comerciales y operativas para que puedas priorizar con mejor criterio.' },
        { title: 'Filtra ruido y prioriza impacto.', description: 'Reduce métricas dispersas y concentra la atención en los puntos que pueden cambiar el resultado.' },
        { title: 'Habla en lenguaje de negocio.', description: 'Convierte información técnica en recomendaciones entendibles para equipos de dirección y operación.' },
        { title: 'Detecta desvíos antes de que escalen.', description: 'Ayuda a identificar variaciones relevantes y oportunidades de mejora antes de que se conviertan en problemas mayores.' },
      ],
      isNotTitle: 'Summer87 NO es',
      isNotItems: ['Un software contable', 'Un CRM o ERP', 'Un dashboard que configurás y olvidás', 'Una herramienta que requiere analistas', 'Otro reporte tardío y sin contexto', 'Power BI con otro nombre'],
      isTitle: 'Summer87 SÍ es',
      isDescription: 'Tu capa de inteligencia de negocio: conecta datos, interpreta contexto y ayuda a definir qué priorizar.',
    },
    demoExtra: { starsAria: '5 estrellas' },
    whatYouGet: {
      title: 'Qué incluye una reunión',
      items: [
        'Diagnóstico inicial del negocio',
        'Revisión de procesos actuales',
        'Identificación de oportunidades',
        'Recomendación de próximos pasos',
      ],
    },
    leadModal: {
      title: 'Agendar una reunión',
      subtitle: 'Contanos tu contexto. El equipo de Summer87 se pone en contacto para coordinar.',
      closeAria: 'Cerrar',
      submit: 'Agendar reunión',
      sending: 'Enviando…',
      successTitle: 'Reunión solicitada',
      successBody: 'El equipo de Summer87 se pone en contacto en las próximas horas para coordinar.',
      errorGeneric: 'No pudimos enviar. Intentá de nuevo en unos minutos.',
      requiredField: 'Este campo es obligatorio',
      invalidEmail: 'Email no válido',
      sizePlaceholder: 'Seleccioná una opción',
      companySizes: ['1-10 personas', '11-50 personas', '51-200 personas', 'Más de 200'],
      problemPlaceholder: '¿Cuál es el principal desafío que querés resolver?',
      channelLabel: 'Canal preferido de contacto',
      channelOptions: { whatsapp: 'WhatsApp', email: 'Email' },
      fields: { name: 'Nombre', email: 'Email', company: 'Empresa', size: 'Tamaño de empresa', problem: 'Problema principal', channel: 'Canal preferido' },
      waTemplate: 'Hola, soy {name} de {company} ({size}). Quiero coordinar una reunión con Summer87.',
    },
    servicesPageDetail: {
      pageTitle: 'Servicios',
      pageSubtitle: 'Tres líneas de trabajo. Un enfoque consultivo.',
      intro: 'Tres líneas de trabajo consultivo. Cada una con diagnóstico, entregables y acompañamiento acordado.',
      cta: 'Agendar una reunión',
      labels: { solves: 'Qué resuelve', forWho: 'Para quién', deliverables: 'Entregables', example: 'Ejemplo' },
      items: [
        {
          name: 'Neuroventas',
          solves: 'Alineá lenguaje comercial, etapas del embudo y criterios de calificación con métricas acordadas.',
          forWho: 'Equipos de ventas y marketing que trabajan con leads dispersos o conversaciones que no avanzan.',
          deliverables: ['Mapa de recorrido y criterios de oportunidad', 'Guiones o guías por etapa (breves y practicables)', 'Indicadores de seguimiento semanales o quincenales', 'Sesiones de ajuste con el equipo'],
          example: 'Una PyME con varias fuentes de leads unifica criterios de ICP y prioriza dos canales con seguimiento medible en 4 semanas.',
        },
        {
          name: 'Motores inteligentes de negocio',
          solves: 'Diseñá flujos con integraciones, reglas o asistentes en los puntos donde hoy se pierde tiempo o información.',
          forWho: 'Operaciones, finanzas o IT que coordinan entre planillas, ERP y canales manuales.',
          deliverables: ['Diagnóstico de proceso y datos', 'Diseño de integración o automatización por fases', 'Controles básicos y trazabilidad', 'Panel o alertas mínimas para decisiones reales'],
          example: 'Un área con cierres en planillas reduce un cierre quincenal de 2 días a un flujo con validaciones y responsables claros.',
        },
        {
          name: 'Summer87 Business Intelligence',
          solves: 'Poné indicadores y reportes alineados a las preguntas de negocio, con alertas cuando importa actuar.',
          forWho: 'Dirección y finanzas que necesitan una lectura común, no diez versiones de la “verdad”.',
          deliverables: ['Mapa de métricas y fuentes', 'Diseño de reportes o alertas accionables', 'Definición de gobierno mínimo (quién mira qué)', 'Plan de adopción y seguimiento'],
          example: 'Un equipo pasa de exportar archivos a un tablero semanal con 5 KPIs y responsable por desvío.',
        },
      ],
    },
    problemReality: {
      eyebrow: 'EL PROBLEMA REAL',
      title: 'El problema no es que te falten datos.',
      titleHighlight: 'Es que nadie los traduce.',
      subtitle:
        'Cada día que tu negocio opera sin claridad financiera es un día que se toman decisiones con información incompleta.',
      cards: [
        {
          number: '01',
          title: 'Tus datos viven en varias herramientas. Tu claridad, en ninguna.',
          body: 'Stripe te dice cuánto facturaste. QuickBooks cuánto gastaste. El CRM cuánto vendiste. Ninguna te dice qué está pasando ni qué hacer.',
          cost: 'Costo real: decisiones con información incompleta.',
        },
        {
          number: '02',
          title: 'Cuando llega el reporte, el momento ya pasó.',
          body: 'El cierre mensual llega tarde. Para entonces ya se tomaron decisiones sin la información correcta.',
          cost: 'Costo real: reacción tardía y margen erosionado.',
        },
        {
          number: '03',
          title: 'Sabés que algo está mal, pero no dónde.',
          body: 'Cae el margen, sube el churn o baja la conversión, pero el origen del problema no aparece con claridad.',
          cost: 'Costo real: tiempo y dinero en el problema equivocado.',
        },
      ],
      bridge:
        'Summer87 no es otra herramienta para sumar al stack. Es la capa que conecta, interpreta y convierte información en decisiones.',
    },
    howItWorksConsultive: {
      eyebrow: 'CÓMO FUNCIONA',
      title: 'De datos dispersos a decisiones claras.',
      subtitle: 'En 4 pasos para conectar, analizar, recomendar y automatizar.',
      steps: [
        {
          number: '01',
          title: 'Conectar datos y procesos',
          body: 'Centralizamos información financiera, comercial y operativa desde tus sistemas principales.',
          badge: 'Integración rápida de herramientas.',
          bullets: ['Fuentes financieras', 'Sistemas comerciales', 'Herramientas operativas', 'Actualización continua'],
          color: '#2F81F7',
        },
        {
          number: '02',
          title: 'Analizar información crítica',
          body: 'Summer87 Intelligence interpreta tendencias, variaciones y métricas clave en contexto.',
          badge: 'Análisis continuo y estructurado.',
          bullets: ['KPI estratégicos', 'Detección de desvíos', 'Análisis causal', 'Tableros accionables'],
          color: '#7C3AED',
        },
        {
          number: '03',
          title: 'Recibir recomendaciones',
          body: 'Summer87 Copilot responde preguntas de negocio y sugiere prioridades de acción.',
          badge: 'Soporte para decisiones diarias.',
          bullets: ['Preguntas y respuestas', 'Recomendaciones', 'Priorización', 'Guía contextual'],
          color: '#3FB950',
        },
        {
          number: '04',
          title: 'Automatizar acciones repetitivas',
          body: 'Summer87 Automation coordina flujos operativos para reducir carga manual.',
          badge: 'Ejecución operativa más eficiente.',
          bullets: ['Flujos automáticos', 'Integración entre sistemas', 'Menos tareas manuales', 'Mejor trazabilidad'],
          color: '#D29922',
        },
      ],
    },
    notFound: {
      title: 'Esta página no existe.',
      body: 'Pero tu negocio sí. Volvé al inicio y entendé tus números.',
      cta: 'Volver al inicio',
    },
  },
  en: {
    heroExtraNarrative: 'Summer87 combines business intelligence, AI copilots and automation to improve visibility, operations and decision support.',
    originStory: {
      eyebrow: 'The origin of Summer87',
      title: 'A story rooted in real software',
      intro:
        'Summer87 is a tribute to a pivotal chapter in software history: a way to build more powerful solutions focused on solving real problems.',
      expandedParagraphs: [
        'In the late 1980s, while we still worked in environments such as MS-DOS, BASIC, COBOL, Fortran, dBase III or WordStar, Clipper Summer87 emerged: a new way to program—more powerful, more approachable, and more oriented toward building real solutions.',
        'I was part of that moment.',
        'I independently developed one of the first electronic agendas in Uruguay for Federal Express, at a time when solutions such as Lotus were widely used in the United States.',
        'It was an era where writing code meant building from scratch. In parallel, I was part of the birth of a leading company such as Memory Computación, where a crucial phase began in understanding business processes, working as a Functional Analyst. Every company, a world of its own.',
        'Then came the phase of sharing knowledge: I had the privilege of teaching in the Systems Analyst program at Universitario Autónomo del Sur, today part of UDE.',
        'Today, that same vision evolves toward a new stage: building intelligent business engines grounded in artificial intelligence, data and strategy.',
      ],
      highlight:
        'We do not seek merely to adapt to change, but to understand it earlier and turn it into concrete opportunities.',
      signatureName: 'Daniel Odella',
      signatureRole: 'CEO, Summer87 SAS',
      readMore: 'Read full story',
      readLess: 'Show less',
      expandedCta: 'Discuss your case →',
    },
    navbarExtra: { servicesLabel: 'Services' },
    heroServiceChips: ['Neurosales', 'Intelligent business engines', 'Summer87 Business Intelligence'],
    howWeWork: {
      title: 'How we work',
      subtitle: 'A clear and measurable consulting process from diagnosis to implementation.',
      steps: [
        { title: 'Diagnosis', description: 'We map processes, data, tools and objectives.' },
        { title: 'Design', description: 'We define solution scope, priorities, flows and success criteria.' },
        { title: 'Implementation', description: 'We build or integrate the required components.' },
        { title: 'Follow-up', description: 'We track adoption, outcomes and next adjustments.' },
      ],
    },
    trustBlock: {
      title: 'Working approach',
      items: ['Consulting approach', 'Applied AI', 'Automation', 'Custom BI', 'Montevideo, Uruguay'],
    },
    contactShort: {
      title: 'Request contact',
      subtitle: 'Share your context and we will schedule a working session.',
      fields: { name: 'Name', company: 'Company', email: 'Email', service: 'Service of interest', message: 'Message' },
      services: ['Neurosales', 'Intelligent business engines', 'Summer87 Business Intelligence', 'I am not sure yet'],
      submit: 'Request contact',
      confirmation: 'Thank you. The Summer87 team will review the information and get in touch.',
    },
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
      cta: 'Start process',
      note: 'Coordinated implementation and early-stage insights.',
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
      badge: 'Representative scenarios',
      title: 'Application examples for',
      titleHighlight: 'common working situations.',
      description: 'Reference scenarios for consulting work and operational prioritization.',
      starsAria: '5 stars',
      stats: [
        { value: '01', label: 'Consulting diagnosis', color: '#2F81F7' },
        { value: '02', label: 'Design and prioritization', color: '#3FB950' },
        { value: '03', label: 'Guided implementation', color: '#D29922' },
        { value: '04', label: 'Operational follow-up', color: '#7C3AED' },
      ],
      items: [
        { quote: 'The team aligned commercial language and qualification criteria in focused sessions.', author: 'Management team', role: 'Commercial area', company: 'Common sales scenario', avatar: 'G', gradient: 'from-[#2F81F7] to-[#1D4ED8]', metric: 'Task prioritization', metricColor: '#3FB950' },
        { quote: 'Finance leadership organized indicators and follow-up routines across areas.', author: 'Finance leadership', role: 'Economic management', company: 'Representative scenario', avatar: 'F', gradient: 'from-[#7C3AED] to-[#5B21B6]', metric: 'Suggested follow-up', metricColor: '#2F81F7' },
        { quote: 'Operations defined flows and responsibilities with better cross-system coordination.', author: 'Operations', role: 'Operational execution', company: 'Application example', avatar: 'O', gradient: 'from-[#059669] to-[#047857]', metric: 'Recommended action', metricColor: '#D29922' },
      ],
    },
    heroMockup: { appUrl: 'app.summer87.com/dashboard', live: 'Live', summaryEyebrow: 'Executive summary', summaryTitle: 'You have a clear operational readout today.', metrics: [{ label: 'Operational indicator', value: '', change: 'Relevant trend' }, { label: 'Detected deviation', value: '', change: 'Recommended action' }, { label: 'Follow-up', value: '', change: 'Suggested prioritization' }], actionTitle: 'Action required today', actionBody: 'A relevant deviation was detected this week. Review with your team to set priority.', copilotTitle: 'Summer87 Copilot', copilotQuestion: 'What should I prioritize this week?', copilotAnswer: '1) Review commercial priorities. 2) Assign owners by workstream. 3) Track progress weekly.', floatingValue: 'Operational indicator', floatingLabel: 'Current status', liveInsights: ['A relevant deviation was detected this week. Review with your team to set priority.', 'Review commercial priorities before the next closing. Set clear advancement criteria.', 'Validate operational deviations and assign owners. Weekly tracking reduces impact.'] },
    servicesSection: { badge: 'Consulting services', title: 'Services designed to improve decisions, operations and performance', subtitle: 'Three complementary lines of work to turn data, processes and commercial knowledge into measurable actions.', meetingCta: 'Schedule a meeting', contactLabel: 'Direct contact', lines: [{ label: 'Line 01', title: 'Neurosales', short: 'Aligned behavior, messaging and commercial process.', description: 'We improve how the organization sells: language, funnel stages, objection handling and marketing-sales handoff, focused on advancing conversations with defined metrics.', benefits: ['Commercial journey mapping', 'Scripts and qualification criteria', 'Short, practical training', 'Tracking with agreed indicators'] }, { label: 'Line 02', title: 'Intelligent business engines', short: 'AI, data and automation with business purpose.', description: 'We turn knowledge into decision systems through process diagnostics, pragmatic integrations, agents or rules where needed, and dashboards that answer real management and operations questions.', benefits: ['Process and data diagnostics', 'Integration design', 'Phased automation', 'Dashboards and information governance'] }, { label: 'Line 03', title: 'Summer87 Business Intelligence', short: 'BI and tailored software when it creates an advantage.', description: 'Reporting, alerts and operational flows aligned with real processes; custom modules when generic ERP does not fit, with traceability, permissions and an agreed implementation roadmap.', benefits: ['Process and question-driven design', 'Actionable reports and alerts', 'Automation of repetitive tasks', 'Adoption support'] }] },
    financialIntelligence: {
      eyebrow: 'WHAT SUMMER87 IS',
      title: 'The financial intelligence that used to belong only to large organizations.',
      subtitle: 'Summer87 interprets data, processes and business signals to help you decide with more context.',
      features: [
        { title: 'Tells you what to watch, not only what happened.', description: 'Organizes financial, commercial and operational signals so you can prioritize with better judgment.' },
        { title: 'Filters noise and prioritizes impact.', description: 'Reduces scattered metrics and focuses attention on the points that can change outcomes.' },
        { title: 'Speaks in business language.', description: 'Turns technical information into understandable recommendations for leadership and operations teams.' },
        { title: 'Detects deviations before they escalate.', description: 'Helps identify relevant variations and improvement opportunities before they become larger problems.' },
      ],
      isNotTitle: 'Summer87 is NOT',
      isNotItems: ['Accounting software', 'A CRM or ERP', 'A dashboard you configure and forget', 'A tool that requires analysts', 'Another delayed, contextless report', 'Power BI with a different name'],
      isTitle: 'Summer87 IS',
      isDescription: 'Your business intelligence layer: connects data, interprets context and helps define what to prioritize.',
    },
    demoExtra: { starsAria: '5 stars' },
    whatYouGet: {
      title: 'What a meeting includes',
      items: [
        'Initial business diagnosis',
        'Review of current processes',
        'Opportunity identification',
        'Recommended next steps',
      ],
    },
    leadModal: {
      title: 'Schedule a meeting',
      subtitle: 'Share your context. The Summer87 team will reach out to coordinate.',
      closeAria: 'Close',
      submit: 'Schedule meeting',
      sending: 'Sending…',
      successTitle: 'Meeting requested',
      successBody: 'The Summer87 team will reach out within the next few hours to coordinate.',
      errorGeneric: 'Could not send. Please try again in a few minutes.',
      requiredField: 'This field is required',
      invalidEmail: 'Invalid email',
      sizePlaceholder: 'Select an option',
      companySizes: ['1-10 people', '11-50 people', '51-200 people', 'More than 200'],
      problemPlaceholder: 'What is the main challenge you want to solve?',
      channelLabel: 'Preferred contact channel',
      channelOptions: { whatsapp: 'WhatsApp', email: 'Email' },
      fields: { name: 'Name', email: 'Email', company: 'Company', size: 'Company size', problem: 'Main challenge', channel: 'Preferred channel' },
      waTemplate: 'Hi, I am {name} from {company} ({size}). I would like to schedule a meeting with Summer87.',
    },
    servicesPageDetail: {
      pageTitle: 'Services',
      pageSubtitle: 'Three service lines. One consulting approach.',
      intro: 'Three consulting lines. Each with diagnosis, deliverables, and agreed follow-up.',
      cta: 'Schedule a meeting',
      labels: { solves: 'What it addresses', forWho: 'For whom', deliverables: 'Deliverables', example: 'Example' },
      items: [
        {
          name: 'Neurosales',
          solves: 'Align commercial language, funnel stages, and qualification criteria with agreed metrics.',
          forWho: 'Sales and marketing teams working with scattered leads or stalled conversations.',
          deliverables: ['Journey map and opportunity criteria', 'Short, practical scripts or guides by stage', 'Weekly or bi-weekly follow-up indicators', 'Adjustment sessions with the team'],
          example: 'An SME with several lead sources unifies ICP criteria and prioritizes two channels with measurable follow-up in 4 weeks.',
        },
        {
          name: 'Intelligent business engines',
          solves: 'Design flows with integrations, rules, or assistants where time or information is lost today.',
          forWho: 'Operations, finance, or IT coordinating spreadsheets, ERP, and manual channels.',
          deliverables: ['Process and data diagnosis', 'Phased integration or automation design', 'Basic controls and traceability', 'Minimum dashboard or alerts for real decisions'],
          example: 'A team that closes in spreadsheets reduces a bi-weekly close from 2 days to a flow with validations and clear owners.',
        },
        {
          name: 'Summer87 Business Intelligence',
          solves: 'Put indicators and reports behind the business questions, with alerts when it is time to act.',
          forWho: 'Leadership and finance that need a shared read, not ten versions of the truth.',
          deliverables: ['Metrics and sources map', 'Actionable report or alert design', 'Minimum governance (who looks at what)', 'Adoption and follow-up plan'],
          example: 'A team moves from file exports to a weekly dashboard with 5 KPIs and an owner per deviation.',
        },
      ],
    },
    problemReality: {
      eyebrow: 'THE REAL PROBLEM',
      title: 'The problem is not a lack of data.',
      titleHighlight: 'It is that no one translates it.',
      subtitle:
        'Every day your business operates without financial clarity is a day decisions are made on incomplete information.',
      cards: [
        {
          number: '01',
          title: 'Your data lives in several tools. Your clarity, in none of them.',
          body: 'Stripe shows what you billed. QuickBooks what you spent. The CRM what you sold. None tells you what is going on or what to do.',
          cost: 'Real cost: decisions made on incomplete information.',
        },
        {
          number: '02',
          title: 'By the time the report arrives, the moment has already passed.',
          body: 'The monthly close arrives late. By then, decisions have already been taken without the right information.',
          cost: 'Real cost: late reaction and eroded margin.',
        },
        {
          number: '03',
          title: 'You know something is wrong, but not where.',
          body: 'Margin falls, churn rises, or conversion drops, yet the root cause does not appear with clarity.',
          cost: 'Real cost: time and money on the wrong problem.',
        },
      ],
      bridge:
        'Summer87 is not another tool to add to the stack. It is the layer that connects, interprets, and turns information into decisions.',
    },
    howItWorksConsultive: {
      eyebrow: 'HOW IT WORKS',
      title: 'From scattered data to clear decisions.',
      subtitle: 'In four steps to connect, analyze, recommend, and automate.',
      steps: [
        {
          number: '01',
          title: 'Connect data and processes',
          body: 'We centralize financial, commercial, and operational information from your core systems.',
          badge: 'Rapid tool integration.',
          bullets: ['Financial sources', 'Commercial systems', 'Operational tools', 'Continuous updates'],
          color: '#2F81F7',
        },
        {
          number: '02',
          title: 'Analyze critical information',
          body: 'Summer87 Intelligence interprets trends, variances, and key metrics in context.',
          badge: 'Continuous, structured analysis.',
          bullets: ['Strategic KPIs', 'Deviation detection', 'Root-cause analysis', 'Actionable dashboards'],
          color: '#7C3AED',
        },
        {
          number: '03',
          title: 'Receive recommendations',
          body: 'Summer87 Copilot answers business questions and suggests action priorities.',
          badge: 'Support for day-to-day decisions.',
          bullets: ['Q&A', 'Recommendations', 'Prioritization', 'Contextual guidance'],
          color: '#3FB950',
        },
        {
          number: '04',
          title: 'Automate repetitive actions',
          body: 'Summer87 Automation coordinates operational workflows to reduce manual workload.',
          badge: 'More efficient operational execution.',
          bullets: ['Automated flows', 'Cross-system integration', 'Less manual work', 'Better traceability'],
          color: '#D29922',
        },
      ],
    },
    notFound: { title: 'This page does not exist.', body: 'But your business does. Go back home and understand your numbers.', cta: 'Back to home' },
  },
  de: {
    heroExtraNarrative: 'Summer87 kombiniert Business Intelligence, KI-Copilot und Automation für bessere Transparenz, operative Steuerung und fundierte Entscheidungen.',
    originStory: {
      eyebrow: 'Der Ursprung von Summer87',
      title: 'Eine Geschichte aus echter Software',
      intro:
        'Summer87 ist eine Hommage an eine entscheidende Phase in der Softwaregeschichte: eine Art, leistungsfähigere Lösungen zu bauen, die echte Probleme lösen.',
      expandedParagraphs: [
        'Ende der 1980er Jahre, als wir noch in Umgebungen wie MS-DOS, BASIC, COBOL, Fortran, dBase III oder WordStar arbeiteten, entstand Clipper Summer87: eine neue Art zu programmieren—leistungsfähiger, zugänglicher und stärker darauf ausgerichtet, reale Lösungen zu schaffen.',
        'Ich war Teil dieser Zeit.',
        'Ich entwickelte eigenständig eine der ersten elektronischen Terminkalender in Uruguay für Federal Express, zu einer Zeit, in den USA Lösungen wie Lotus üblich waren.',
        'Es war eine Phase, in der „Code schreiben“ bedeutete, von Grund auf zu bauen. Parallel war ich Teil der Entstehung eines führenden Unternehmens wie Memory Computación, wo eine entscheidende Phase des Verständnisses für Unternehmensprozesse begann—als Funktionsanalyst. Jedes Unternehmen, eine eigene Welt.',
        'Dann kam die Phase des Wissensteilens: Ich hatte das Privileg, in der Ausbildung zum Systemanalysten am Universitario Autónomo del Sur zu unterrichten, heute Teil der UDE.',
        'Heute entwickelt sich dieselbe Vision weiter: zum Aufbau intelligenter Business-Engines auf Basis von Künstlicher Intelligenz, Daten und Strategie.',
      ],
      highlight:
        'Wir wollen uns nicht nur dem Wandel anpassen, sondern ihn früher verstehen und in konkrete Chancen verwandeln.',
      signatureName: 'Daniel Odella',
      signatureRole: 'CEO, Summer87 SAS',
      readMore: 'Ganze Geschichte lesen',
      readLess: 'Weniger anzeigen',
      expandedCta: 'Über Ihren Fall sprechen →',
    },
    navbarExtra: { servicesLabel: 'Services' },
    heroServiceChips: ['Neurovertrieb', 'Intelligente Business-Engines', 'Summer87 Business Intelligence'],
    howWeWork: {
      title: 'So arbeiten wir',
      subtitle: 'Ein klarer und messbarer Beratungsprozess von der Analyse bis zur Umsetzung.',
      steps: [
        { title: 'Analyse', description: 'Wir erfassen Prozesse, Daten, Tools und Ziele.' },
        { title: 'Design', description: 'Wir definieren Lösung, Prioritäten, Abläufe und Erfolgskriterien.' },
        { title: 'Umsetzung', description: 'Wir bauen oder integrieren die benötigten Komponenten.' },
        { title: 'Nachverfolgung', description: 'Wir messen Adoption, Ergebnisse und nächste Anpassungen.' },
      ],
    },
    trustBlock: {
      title: 'Arbeitsansatz',
      items: ['Beratungsansatz', 'Angewandte KI', 'Automatisierung', 'Individuelle BI', 'Montevideo, Uruguay'],
    },
    contactShort: {
      title: 'Kontakt anfordern',
      subtitle: 'Teile deinen Kontext und wir vereinbaren einen Arbeitstermin.',
      fields: { name: 'Name', company: 'Unternehmen', email: 'E-Mail', service: 'Service-Interesse', message: 'Nachricht' },
      services: ['Neurovertrieb', 'Intelligente Business-Engines', 'Summer87 Business Intelligence', 'Ich bin nicht sicher'],
      submit: 'Kontakt anfordern',
      confirmation: 'Vielen Dank. Das Summer87 Team prüft die Informationen und meldet sich.',
    },
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
      badge: 'Repräsentative Szenarien',
      title: 'Anwendungsbeispiele für',
      titleHighlight: 'typische Arbeitssituationen.',
      description: 'Referenzszenarien für Beratungsarbeit und operative Priorisierung.',
      starsAria: '5 Sterne',
      stats: [
        { value: '01', label: 'Beratungsanalyse', color: '#2F81F7' },
        { value: '02', label: 'Design und Priorisierung', color: '#3FB950' },
        { value: '03', label: 'Begleitete Umsetzung', color: '#D29922' },
        { value: '04', label: 'Operative Nachverfolgung', color: '#7C3AED' },
      ],
      items: [
        { quote: 'Das Team hat Vertriebsbotschaften und Qualifizierungsregeln in fokussierten Sessions abgestimmt.', author: 'Management-Team', role: 'Vertriebsbereich', company: 'Typische Vertriebssituation', avatar: 'G', gradient: 'from-[#2F81F7] to-[#1D4ED8]', metric: 'Aufgabenpriorisierung', metricColor: '#3FB950' },
        { quote: 'Die Finanzleitung strukturierte Kennzahlen und Follow-up über mehrere Bereiche.', author: 'Finanzleitung', role: 'Wirtschaftliche Steuerung', company: 'Repräsentatives Szenario', avatar: 'F', gradient: 'from-[#7C3AED] to-[#5B21B6]', metric: 'Empfohlene Nachverfolgung', metricColor: '#2F81F7' },
        { quote: 'Operations definierte Abläufe und Verantwortlichkeiten mit besserer Systemkoordination.', author: 'Operations', role: 'Operative Umsetzung', company: 'Anwendungsbeispiel', avatar: 'O', gradient: 'from-[#059669] to-[#047857]', metric: 'Empfohlene Maßnahme', metricColor: '#D29922' },
      ],
    },
    heroMockup: { appUrl: 'app.summer87.com/dashboard', live: 'Live', summaryEyebrow: 'Executive Summary', summaryTitle: 'Heute liegt ein klarer operativer Überblick vor.', metrics: [{ label: 'Operativer Indikator', value: '', change: 'Relevanter Trend' }, { label: 'Erkannte Abweichung', value: '', change: 'Empfohlene Maßnahme' }, { label: 'Nachverfolgung', value: '', change: 'Empfohlene Priorisierung' }], actionTitle: 'Aktion heute erforderlich', actionBody: 'Diese Woche wurde eine relevante Abweichung erkannt. Mit dem Team priorisieren und nächste Schritte definieren.', copilotTitle: 'Summer87 Copilot', copilotQuestion: 'Was soll ich diese Woche priorisieren?', copilotAnswer: '1) Vertriebliche Prioritäten prüfen. 2) Verantwortliche je Bereich festlegen. 3) Wöchentlich nachverfolgen.', floatingValue: 'Operativer Indikator', floatingLabel: 'Aktueller Status', liveInsights: ['Diese Woche wurde eine relevante Abweichung erkannt. Mit dem Team priorisieren und nächste Schritte definieren.', 'Vertriebliche Prioritäten vor dem nächsten Abschluss prüfen. Klare Fortschrittsmaßstäbe festlegen.', 'Operative Abweichungen validieren und Verantwortliche festlegen. Wöchentliches Follow-up reduziert den Schaden.'] },
    servicesSection: { badge: 'Beratungsleistungen', title: 'Leistungen für bessere Entscheidungen, Abläufe und Wachstum', subtitle: 'Drei komplementäre Leistungsbereiche, um Daten, Prozesse und Vertriebswissen in messbare Maßnahmen zu übersetzen.', meetingCta: 'Gespräch vereinbaren', contactLabel: 'Direkter Kontakt', lines: [{ label: 'Linie 01', title: 'Neurovertrieb', short: 'Verhalten, Botschaft und Vertriebsprozess im Einklang.', description: 'Wir verbessern die Vertriebsarbeit der Organisation: Sprache, Funnel-Phasen, Einwandbehandlung und Marketing-Vertrieb-Handoff mit Fokus auf weiterführende Gespräche und definierte Kennzahlen.', benefits: ['Mapping der Customer Journey im Vertrieb', 'Leitfäden und Qualifizierungskriterien', 'Kurze, anwendbare Schulung', 'Messung über abgestimmte Indikatoren'] }, { label: 'Linie 02', title: 'Intelligente Business-Engines', short: 'KI, Daten und Automation mit Business-Fokus.', description: 'Wir transformieren Wissen in Entscheidungssysteme: Prozessdiagnose, pragmatische Integrationen, Agents oder Regeln an den richtigen Stellen und Dashboards für reale Fragen aus Führung und Operations.', benefits: ['Prozess- und Datenanalyse', 'Integrationsdesign', 'Stufenweise Automation', 'Dashboards und Informationsgovernance'] }, { label: 'Linie 03', title: 'Summer87 Business Intelligence', short: 'BI und individuelle Software, wenn sie Vorteile schafft.', description: 'Reporting, Alerts und operative Flows entlang realer Prozesse; Module dort, wo ein generisches ERP nicht passt, inklusive Nachvollziehbarkeit, Berechtigungen und abgestimmter Implementierungsroadmap.', benefits: ['Design nach Prozessen und Business-Fragen', 'Umsetzbare Reports und Alerts', 'Automation repetitiver Aufgaben', 'Begleitung bei der Adoption'] }] },
    financialIntelligence: {
      eyebrow: 'WAS SUMMER87 IST',
      title: 'Die Finanzintelligenz, die früher nur Großunternehmen hatten.',
      subtitle: 'Summer87 interpretiert Daten, Prozesse und Geschäftssignale, um dir zu helfen, mit mehr Kontext zu entscheiden.',
      features: [
        { title: 'Sagt dir, worauf du achten sollst, nicht nur was passiert ist.', description: 'Organisiert finanzielle, vertriebliche und operative Signale, damit du mit besserem Urteilsvermögen priorisieren kannst.' },
        { title: 'Filtert Rauschen und priorisiert Wirkung.', description: 'Reduziert verstreute Metriken und fokussiert die Aufmerksamkeit auf die Punkte, die das Ergebnis verändern können.' },
        { title: 'Spricht in Unternehmenssprache.', description: 'Wandelt technische Informationen in verständliche Empfehlungen für Führungs- und Betriebsteams um.' },
        { title: 'Erkennt Abweichungen, bevor sie eskalieren.', description: 'Hilft relevante Schwankungen und Verbesserungsmöglichkeiten zu identifizieren, bevor sie zu größeren Problemen werden.' },
      ],
      isNotTitle: 'Summer87 ist NICHT',
      isNotItems: ['Buchhaltungssoftware', 'Ein CRM oder ERP', 'Ein Dashboard zum Einrichten und Vergessen', 'Ein Tool, das Analysten benötigt', 'Ein weiterer verspäteter Report ohne Kontext', 'Power BI mit einem anderen Namen'],
      isTitle: 'Summer87 IST',
      isDescription: 'Deine Business-Intelligence-Schicht: verbindet Daten, interpretiert Kontext und hilft zu definieren, was zu priorisieren ist.',
    },
    demoExtra: { starsAria: '5 Sterne' },
    whatYouGet: {
      title: 'Was ein Gespräch beinhaltet',
      items: [
        'Erstdiagnose deines Geschäfts',
        'Überprüfung der aktuellen Prozesse',
        'Identifikation von Chancen',
        'Empfohlene nächste Schritte',
      ],
    },
    leadModal: {
      title: 'Termin vereinbaren',
      subtitle: 'Teile deinen Kontext. Das Summer87-Team meldet sich, um einen Termin zu koordinieren.',
      closeAria: 'Schließen',
      submit: 'Termin anfragen',
      sending: 'Wird gesendet…',
      successTitle: 'Termin angefragt',
      successBody: 'Das Summer87-Team meldet sich in den nächsten Stunden, um einen Termin zu koordinieren.',
      errorGeneric: 'Senden fehlgeschlagen. Bitte in ein paar Minuten erneut versuchen.',
      requiredField: 'Pflichtfeld',
      invalidEmail: 'Ungültige E-Mail',
      sizePlaceholder: 'Option auswählen',
      companySizes: ['1-10 Personen', '11-50 Personen', '51-200 Personen', 'Mehr als 200'],
      problemPlaceholder: 'Was ist die Hauptherausforderung, die du lösen möchtest?',
      channelLabel: 'Bevorzugter Kontaktkanal',
      channelOptions: { whatsapp: 'WhatsApp', email: 'E-Mail' },
      fields: { name: 'Name', email: 'E-Mail', company: 'Unternehmen', size: 'Unternehmensgröße', problem: 'Hauptproblem', channel: 'Bevorzugter Kanal' },
      waTemplate: 'Hallo, ich bin {name} von {company} ({size}). Ich möchte einen Termin mit Summer87 vereinbaren.',
    },
    servicesPageDetail: {
      pageTitle: 'Leistungen',
      pageSubtitle: 'Drei Leistungsbereiche. Ein Beratungsansatz.',
      intro: 'Drei Beratungslinien—jeweils mit Analyse, Lieferobjekten und abgestimmtem Begleiten.',
      cta: 'Gespräch vereinbaren',
      labels: { solves: 'Was es löst', forWho: 'Für wen', deliverables: 'Ergebnisse', example: 'Beispiel' },
      items: [
        {
          name: 'Neurovertrieb',
          solves: 'Sprache, Funnel-Phasen und Qualifizierungskriterien mit messbaren Kennzahlen verzahnen.',
          forWho: 'Vertrieb und Marketing mit verteilten Leads oder Gesprächen, die nicht vorankommen.',
          deliverables: ['Journey-Map und Kriterien', 'Kurze, praxisnahe Leitfäden pro Stufe', 'Wöchentliche oder zweiwöchentliche Kennzahlen', 'Anpassungssessions mit dem Team'],
          example: 'Ein KMU mit mehreren Quellen vereinheitlicht ICP und priorisiert zwei Kanäle mit messbarem Follow-up in 4 Wochen.',
        },
        {
          name: 'Intelligente Business-Engines',
          solves: 'Abläufe mit Integration, Regeln oder Assistenten dort, wo heute Zeit oder Information verloren geht.',
          forWho: 'Operations, Finanzen oder IT mit Planungen, ERP und manuellen Übergaben.',
          deliverables: ['Prozess- und Datendiagnose', 'Phasenweise Integrations- oder Automations-Design', 'Grundkontrolle und Nachvollziehbarkeit', 'Mindest-Dashboard oder Alerts für echte Entscheidungen'],
          example: 'Ein Team, das in Tabellen schließt, reduziert einen zweiwöchigen Abschluss auf einen Ablauf mit Prüfungen und klaren Verantwortlichen.',
        },
        {
          name: 'Summer87 Business Intelligence',
          solves: 'Kennzahlen und Reports an den Business-Fragen ausrichten—mit Alerts, wenn handeln nötig ist.',
          forWho: 'Führung und Finanzen, die eine gemeinsame Sicht brauchen, statt vieler „Wahrheiten“.',
          deliverables: ['KPI- und Quellenlandkarte', 'Report- oder Alert-Design', 'Mindest-Governance (wer schaut was)', 'Adoptions- und Follow-up-Plan'],
          example: 'Ein Team wechselt von Excel-Exporten zu einem wöchentlichen Dashboard mit 5 KPIs und Verantwortung pro Abweichung.',
        },
      ],
    },
    problemReality: {
      eyebrow: 'DAS EIGENTLICHE PROBLEM',
      title: 'Das Problem ist nicht, dass Daten fehlen.',
      titleHighlight: 'Es fehlt jemand, der sie in Entscheidungen übersetzt.',
      subtitle:
        'Jeder Tag, an dem Ihr Geschäft ohne finanzielle Klarheit arbeitet, ist ein Tag, an dem Entscheidungen mit unvollständigen Informationen getroffen werden.',
      cards: [
        {
          number: '01',
          title: 'Ihre Daten liegen in mehreren Tools. Ihre Klarheit in keinem.',
          body: 'Stripe zeigt, was fakturiert wurde. QuickBooks, was ausgegeben wurde. Das CRM, was verkauft wurde. Keines zeigt, was wirklich passiert—und was zu tun ist.',
          cost: 'Echte Kosten: Entscheidungen auf unvollständiger Informationsbasis.',
        },
        {
          number: '02',
          title: 'Wenn der Report ankommt, ist der Zeitpunkt vorbei.',
          body: 'Der Monatsabschluss kommt spät. Bis dahin sind oft bereits Entscheidungen ohne passende Information gefallen.',
          cost: 'Echte Kosten: verspätete Reaktion und erodierte Marge.',
        },
        {
          number: '03',
          title: 'Sie wissen, dass etwas nicht stimmt—aber nicht, wo.',
          body: 'Marge sinkt, Churn steigt oder die Konversion fällt, doch die Ursache bleibt unklar.',
          cost: 'Echte Kosten: Zeit und Geld im falschen Problem.',
        },
      ],
      bridge:
        'Summer87 ist kein weiteres Tool im Stack. Es ist die Schicht, die verbindet, interpretiert und Informationen in Entscheidungen verwandelt.',
    },
    howItWorksConsultive: {
      eyebrow: 'SO FUNKTIONIERT ES',
      title: 'Von verstreuten Daten zu klaren Entscheidungen.',
      subtitle: 'In vier Schritten: verbinden, analysieren, empfehlen und automatisieren.',
      steps: [
        {
          number: '01',
          title: 'Daten und Prozesse verbinden',
          body: 'Wir bündeln finanzielle, vertriebliche und operative Information aus Ihren Kernsystemen.',
          badge: 'Schnelle Integration Ihrer Werkzeuge.',
          bullets: ['Finanzquellen', 'Vertriebssysteme', 'Operative Werkzeuge', 'Kontinuierliche Aktualisierung'],
          color: '#2F81F7',
        },
        {
          number: '02',
          title: 'Kritische Informationen analysieren',
          body: 'Summer87 Intelligence interpretiert Trends, Abweichungen und zentrale Kennzahlen im Kontext.',
          badge: 'Kontinuierliche, strukturierte Analyse.',
          bullets: ['Strategische KPIs', 'Abweichungserkennung', 'Ursachenanalyse', 'Handlungsfähige Dashboards'],
          color: '#7C3AED',
        },
        {
          number: '03',
          title: 'Empfehlungen erhalten',
          body: 'Summer87 Copilot beantwortet Business-Fragen und schlägt Handlungsprioritäten vor.',
          badge: 'Unterstützung im Tagesgeschäft.',
          bullets: ['Fragen & Antworten', 'Empfehlungen', 'Priorisierung', 'Kontextuelle Orientierung'],
          color: '#3FB950',
        },
        {
          number: '04',
          title: 'Wiederholbare Aktionen automatisieren',
          body: 'Summer87 Automation steuert operative Abläufe und reduziert manuellen Aufwand.',
          badge: 'Effizientere operative Ausführung.',
          bullets: ['Automatisierte Abläufe', 'Integration zwischen Systemen', 'Weniger manuelle Aufgaben', 'Bessere Nachvollziehbarkeit'],
          color: '#D29922',
        },
      ],
    },
    notFound: { title: 'Diese Seite existiert nicht.', body: 'Aber dein Business schon. Geh zur Startseite und verstehe deine Zahlen.', cta: 'Zur Startseite' },
  },
} as Record<Locale, {
  heroExtraNarrative: string
  originStory: {
    eyebrow: string
    title: string
    intro: string
    expandedParagraphs: string[]
    highlight: string
    signatureName: string
    signatureRole: string
    readMore: string
    readLess: string
    expandedCta: string
  }
  navbarExtra: { servicesLabel: string }
  heroServiceChips: string[]
  howWeWork: { title: string; subtitle: string; steps: Array<{ title: string; description: string }> }
  trustBlock: { title: string; items: string[] }
  contactShort: { title: string; subtitle: string; fields: { name: string; company: string; email: string; service: string; message: string }; services: string[]; submit: string; confirmation: string }
  servicesPillars: { badge: string; title: string; description: string; items: Array<{ title: string; description: string; benefits: string[]; ctaLabel: string; ctaHref: string }> }
  howItWorks: { badge: string; title: string; titleHighlight: string; description: string; cta: string; note: string; steps: Array<{ number: string; title: string; description: string; detail: string; color: string; items: string[] }> }
  useCases: { badge: string; title: string; titleHighlight: string; description: string; problemLabel: string; solutionLabel: string; metricsLabel: string; resultLabel: string; cases: Array<{ industry: string; icon: string; color: string; problem: string; solution: string; metrics: string[]; result: string }> }
  integrations: { badge: string; title: string; titleHighlight: string; description: string; moreAvailable: string; notFoundTitle: string; notFoundBody: string; contact: string; items: Array<{ name: string; category: string; color: string }> }
  testimonials: { badge: string; title: string; titleHighlight: string; description: string; starsAria: string; stats: Array<{ value: string; label: string; color: string }>; items: Array<{ quote: string; author: string; role: string; company: string; avatar: string; gradient: string; metric: string; metricColor: string }> }
  heroMockup: { appUrl: string; live: string; summaryEyebrow: string; summaryTitle: string; metrics: Array<{ label: string; value: string; change: string }>; actionTitle: string; actionBody: string; copilotTitle: string; copilotQuestion: string; copilotAnswer: string; floatingValue: string; floatingLabel: string; liveInsights: string[] }
  servicesSection: { badge: string; title: string; subtitle: string; meetingCta: string; contactLabel: string; lines: Array<{ label: string; title: string; short: string; description: string; benefits: string[] }> }
  financialIntelligence: {
    eyebrow: string
    title: string
    subtitle: string
    features: Array<{ title: string; description: string }>
    isNotTitle: string
    isNotItems: string[]
    isTitle: string
    isDescription: string
  }
  demoExtra: { starsAria: string }
  whatYouGet: { title: string; items: string[] }
  leadModal: {
    title: string
    subtitle: string
    closeAria: string
    submit: string
    sending: string
    successTitle: string
    successBody: string
    errorGeneric: string
    requiredField: string
    invalidEmail: string
    sizePlaceholder: string
    companySizes: string[]
    problemPlaceholder: string
    channelLabel: string
    channelOptions: { whatsapp: string; email: string }
    fields: { name: string; email: string; company: string; size: string; problem: string; channel: string }
    waTemplate: string
  }
  servicesPageDetail: {
    pageTitle: string
    pageSubtitle: string
    intro: string
    cta: string
    labels: { solves: string; forWho: string; deliverables: string; example: string }
    items: Array<{
      name: string
      solves: string
      forWho: string
      deliverables: string[]
      example: string
    }>
  }
  problemReality: {
    eyebrow: string
    title: string
    titleHighlight: string
    subtitle: string
    cards: Array<{ number: string; title: string; body: string; cost: string }>
    bridge: string
  }
  howItWorksConsultive: {
    eyebrow: string
    title: string
    subtitle: string
    steps: Array<{ number: string; title: string; body: string; badge: string; bullets: string[]; color: string }>
  }
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
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const LANGUAGE_OPTIONS: Record<Locale, { code: string; label: string }> = {
    es: { code: 'ES', label: 'Español' },
    en: { code: 'EN', label: 'English' },
    de: { code: 'DE', label: 'Deutsch' },
  }

  const switchLocale = (targetLocale: Locale) => {
    if (targetLocale === locale) return
    trackEvent('change_language', { from: locale, to: targetLocale })
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return
      if (!dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return createElement(
    'div',
    {
      ref: dropdownRef,
      className: `relative inline-block ${className}`.trim(),
    },
    createElement(
      'button',
      {
        type: 'button',
        onClick: () => setOpen((current) => !current),
        className:
          'h-9 w-full min-w-[132px] rounded-lg border border-[#30363D] bg-[#161B22] px-3 text-sm text-white/80 transition-colors hover:bg-[#21262D] hover:text-white',
        'aria-label': 'Language selector',
        'aria-haspopup': 'listbox',
        'aria-expanded': open,
      },
      `[${LANGUAGE_OPTIONS[locale].code}] ${LANGUAGE_OPTIONS[locale].label}`
    ),
    open &&
      createElement(
        'div',
        {
          className:
            'absolute right-0 z-50 mt-2 min-w-[170px] bg-[#161B22] border border-[#30363D] rounded-lg shadow-lg overflow-hidden',
          role: 'listbox',
          'aria-label': 'Language options',
        },
        ...LOCALES.map((item) =>
          createElement(
            'button',
            {
              key: item,
              type: 'button',
              role: 'option',
              'aria-selected': locale === item,
              onClick: () => {
                switchLocale(item)
                setOpen(false)
              },
              className: `block w-full text-left px-3 py-2 text-sm cursor-pointer transition-colors ${
                locale === item
                  ? 'bg-[#2F81F7]/20 text-[#2F81F7]'
                  : 'text-white/80 hover:bg-[#21262D] hover:text-white'
              }`,
            },
            `[${LANGUAGE_OPTIONS[item].code}] ${LANGUAGE_OPTIONS[item].label}`
          )
        )
      )
  )
}
