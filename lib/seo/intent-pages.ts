import { type Locale } from '@/lib/i18n/shared'

export const INTENT_SLUGS = [
  'how-to-understand-my-business',
  'business-cash-flow-analysis',
  'financial-decision-software',
  'why-businesses-fail-with-data',
] as const

export type IntentSlug = (typeof INTENT_SLUGS)[number]

type IntentContent = {
  title: string
  description: string
  keywords: string[]
  h1: string
  intro: string
  whatIs: string
  howItWorks: string[]
  whenToUse: string[]
  forWho: string[]
  examples: string[]
  commonMistakes: string[]
  ignoreConsequences: string[]
  fixes: string[]
  faqs: Array<{ question: string; answer: string }>
  cta: {
    title: string
    body: string
    button: string
    problem: string
    loss: string
    action: string
  }
  ui: {
    whatIs: string
    howItWorks: string
    whenToUse: string
    whoFor: string
    examples: string
    commonMistakes: string
    ignoreConsequences: string
    fixes: string
    faq: string
    leadTitle: string
    leadButton: string
    linksTitle: string
    linksCountLabel: string
    backHome: string
    problemLabel: string
    riskLabel: string
    actionLabel: string
    inputCompanySize: string
    inputMonthlyRevenue: string
  linkHome: string
  linkDemo: string
  linkPricing: string
  linkFaq: string
  linkHowItWorks: string
  }
}

const EN_UI = {
  whatIs: 'Common areas of confusion',
  howItWorks: 'How it works in practice',
  whenToUse: 'When it is useful to review this',
  whoFor: 'Who cannot afford to ignore this',
  examples: 'Examples with real financial impact',
  commonMistakes: 'Common mistakes',
  ignoreConsequences: 'What happens if you ignore this',
  fixes: 'How teams address this',
  faq: 'FAQ: real objections and friction',
  leadTitle: 'Get a tailored action brief',
  leadButton: 'Get instant analysis',
  linksTitle: 'Related resources',
  linksCountLabel: 'Internal links',
  backHome: 'Back to Summer87 main page',
  problemLabel: 'Problem',
  riskLabel: 'Risk',
  actionLabel: 'Action now',
  inputCompanySize: 'Company size',
  inputMonthlyRevenue: 'Monthly revenue',
  linkHome: 'Home',
  linkDemo: 'Book demo',
  linkPricing: 'Pricing',
  linkFaq: 'FAQ',
  linkHowItWorks: 'How it works',
}

const ES_UI = {
  whatIs: 'Qué es lo que la mayoría entiende mal sobre esto',
  howItWorks: 'Cómo funciona en la realidad',
  whenToUse: 'Cuándo conviene revisarlo',
  whoFor: 'Quién no puede ignorar esto',
  examples: 'Ejemplos con impacto económico real',
  commonMistakes: 'Errores comunes',
  ignoreConsequences: 'Qué pasa si lo ignorás',
  fixes: 'Cómo lo abordan los equipos',
  faq: 'FAQ: objeciones y fricción real',
  leadTitle: 'Recibí un diagnóstico inicial',
  leadButton: 'Obtener análisis instantáneo',
  linksTitle: 'Recursos relacionados',
  linksCountLabel: 'Links internos',
  backHome: 'Volver al inicio de Summer87',
  problemLabel: 'Problema',
  riskLabel: 'Riesgo',
  actionLabel: 'Acción ahora',
  inputCompanySize: 'Tamaño de empresa',
  inputMonthlyRevenue: 'Facturación mensual',
  linkHome: 'Inicio',
  linkDemo: 'Reservar demo',
  linkPricing: 'Pricing',
  linkFaq: 'FAQ',
  linkHowItWorks: 'Cómo funciona',
}

const DE_UI = {
  whatIs: 'Was die meisten daran falsch verstehen',
  howItWorks: 'Wie es in der Realität funktioniert',
  whenToUse: 'Wenn du bereits Geld verlierst',
  whoFor: 'Wer das nicht ignorieren kann',
  examples: 'Beispiele mit echtem finanziellen Effekt',
  commonMistakes: 'Häufige Fehler',
  ignoreConsequences: 'Was passiert, wenn du es ignorierst',
  fixes: 'Wie Teams damit umgehen',
  faq: 'FAQ: echte Einwände und Reibung',
  leadTitle: 'Erhalte eine erste Analyse',
  leadButton: 'Sofortanalyse erhalten',
  linksTitle: 'Verwandte Ressourcen',
  linksCountLabel: 'Interne Links',
  backHome: 'Zur Summer87 Startseite',
  problemLabel: 'Problem',
  riskLabel: 'Risiko',
  actionLabel: 'Aktion jetzt',
  inputCompanySize: 'Unternehmensgröße',
  inputMonthlyRevenue: 'Monatsumsatz',
  linkHome: 'Start',
  linkDemo: 'Demo buchen',
  linkPricing: 'Preise',
  linkFaq: 'FAQ',
  linkHowItWorks: 'So funktioniert es',
}

export const intentPageContent: Record<Locale, Record<IntentSlug, IntentContent>> = {
  en: {
    'how-to-understand-my-business': {
      title: 'How to understand your business (before hidden problems cost you money)',
      description:
        'Understand your business numbers before margin leaks compound: KPI context, cash-flow signals, and practical decisions.',
      keywords: ['how to understand my business', 'business numbers', 'financial clarity', 'dashboard alternative'],
      h1: 'How to understand your business before problems become expensive',
      intro:
        'Many teams realize they need more financial clarity after performance changes. Reviewing signals early supports more consistent decisions over time.',
      whatIs:
        'It means knowing what changed, why it changed, and what to do this week to protect margin and cash.',
      howItWorks: ['Unify finance + revenue data.', 'Detect root cause quickly.', 'Prioritize top 3 actions by impact.'],
      whenToUse: ['You review performance after month-end.', 'Margin variation is hard to explain.', 'Teams need aligned priorities.'],
      forWho: ['Founders and CEOs.', 'Finance and RevOps.', 'Operators responsible for execution.'],
      examples: ['Improve payback after CAC variation.', 'Detect retention patterns earlier.', 'Support runway planning with weekly reviews.'],
      commonMistakes: ['Tracking too many KPIs.', 'Monthly-only review cadence.', 'Confusing activity with economics.'],
      ignoreConsequences: ['Visibility remains limited.', 'Planning becomes less predictable.', 'Decisions become more reactive.'],
      fixes: ['Weekly decision loop.', 'Owner per action.', 'Measure outcome, not only reporting.'],
      faqs: [
        { question: 'Why can business data be difficult to interpret?', answer: 'Because many tools show events without connecting them to decision context.' },
        { question: 'Why are deviations often detected later than expected?', answer: 'Because many risks evolve weekly while reporting is reviewed monthly.' },
        { question: 'Is this just another dashboard?', answer: 'No. It helps prioritize actions in addition to showing outcomes.' },
      ],
      cta: {
        title: 'Improve clarity in financial decisions',
        body: 'Review current performance and identify the most relevant next actions.',
        button: 'Request a personalized demo',
        problem: 'You have data visibility but need clearer prioritization.',
        loss: 'Delayed alignment can reduce decision quality over time.',
        action: 'Get a clear view and coordinate next steps this week.',
      },
      ui: EN_UI,
    },
    'business-cash-flow-analysis': {
      title: 'Business cash flow analysis (before runway pressure forces bad decisions)',
      description: 'Identify cash leaks early and improve liquidity decisions with real operational context.',
      keywords: ['cash flow analysis', 'runway risk', 'burn rate', 'cash leaks'],
      h1: 'Business cash flow analysis that leads to immediate action',
      intro:
        'Cash-flow variation often starts gradually through collection delays and spending mix changes. Early review improves planning quality.',
      whatIs: 'A weekly operating model that shows where cash is created and where it is destroyed.',
      howItWorks: ['Track inflows/outflows by segment.', 'Detect burn drivers.', 'Prioritize immediate liquidity moves.'],
      whenToUse: ['Burn trend is increasing.', 'Collections are less predictable.', 'Cost decisions need stronger context.'],
      forWho: ['Founders managing runway.', 'Finance teams.', 'Operations leaders.'],
      examples: ['Extend runway through budget reallocation.', 'Improve cash-conversion bottlenecks.'],
      commonMistakes: ['Using revenue as cash proxy.', 'Ignoring receivables delays.', 'Cutting without contribution logic.'],
      ignoreConsequences: ['Lower forecasting confidence.', 'Less flexibility in planning.', 'More reactive funding decisions.'],
      fixes: ['Weekly runway thresholds.', 'Payback-based allocation.', 'Collection discipline.'],
      faqs: [
        { question: "Why don't I understand cash pressure?", answer: 'Because P&L and cash timing diverge.' },
        { question: 'Why do I detect cash risk too late?', answer: 'Because monthly reporting misses weekly deterioration.' },
        { question: 'Is this different from a dashboard?', answer: 'Yes. It explains causes and next moves.' },
      ],
      cta: {
        title: 'Strengthen cash-flow visibility',
        body: 'Identify where cash performance can be improved and what to prioritize first.',
        button: 'Identify operational improvement opportunities',
        problem: 'Cash decisions rely on delayed signals.',
        loss: 'Each week of delay reduces runway options.',
        action: 'Get clarity in minutes and protect cash now.',
      },
      ui: EN_UI,
    },
    'financial-decision-software': {
      title: 'Financial decision software (before slow priorities damage your margins)',
      description: 'Compare decision software focused on action, impact, and speed, not just reporting.',
      keywords: ['financial decision software', 'decision intelligence', 'dashboard alternative'],
      h1: 'Financial decision software that tells you what to move first',
      intro:
        'Many organizations have data available, but priorities are not always clear. A structured approach improves execution and alignment.',
      whatIs: 'A decision layer that converts metrics into ranked actions with expected economic impact.',
      howItWorks: ['Unify signals across teams.', 'Explain cause and urgency.', 'Rank actions by impact.'],
      whenToUse: ['Dashboard says what happened, not what to do.', 'Teams are misaligned.', 'Execution is too slow.'],
      forWho: ['Executive teams.', 'Finance + RevOps.', 'Growth operators.'],
      examples: ['Prioritize retention over acquisition.', 'Reallocate budget to protect contribution margin.'],
      commonMistakes: ['Buying more BI for a prioritization problem.', 'No owner per action.', 'Analysis loops too long.'],
      ignoreConsequences: ['Slower execution.', 'Conflicting priorities.', 'Lower decision consistency.'],
      fixes: ['Weekly top-3 action board.', 'Clear ownership.', 'Fast outcome tracking.'],
      faqs: [
        { question: "Why don't I understand numbers across teams?", answer: 'Because tools are fragmented and context is missing.' },
        { question: 'Why do issues appear late?', answer: 'Because static reporting surfaces lagging signals.' },
        { question: 'Is this just another dashboard?', answer: 'No. It is a prioritization and action system.' },
      ],
      cta: {
        title: 'Turn data into coordinated execution',
        body: 'Review and prioritize high-impact actions in a single session.',
        button: 'Request a personalized demo',
        problem: 'You see metrics but cannot prioritize confidently.',
        loss: 'Slow prioritization burns time and cash.',
        action: 'Get a clear decision map now.',
      },
      ui: EN_UI,
    },
    'why-businesses-fail-with-data': {
      title: 'Why businesses fail with data (even when dashboards look healthy)',
      description: 'Discover why data-rich companies still lose money: late detection, noise, and decision paralysis.',
      keywords: ['why businesses fail with data', 'dashboard paralysis', 'data overload'],
      h1: 'Why businesses fail with data even when they track everything',
      intro:
        'Visibility without prioritization can make execution harder. Reviewing context early supports more consistent outcomes.',
      whatIs: 'Data failure is seeing metrics but missing timely, accountable action.',
      howItWorks: ['Fragmented definitions.', 'Slow decision loops.', 'No impact-based priorities.'],
      whenToUse: ['Meetings end without clear actions.', 'Reports arrive later than needed.', 'Local KPIs hide broader trends.'],
      forWho: ['Founders.', 'CFOs.', 'Operations teams.'],
      examples: ['80 KPIs and still no priority.', 'Clicks up, payback down.'],
      commonMistakes: ['More dashboards, same decisions.', 'Monthly control for weekly risks.', 'No action ownership.'],
      ignoreConsequences: ['Delayed reaction.', 'Gradual margin pressure.', 'More reactive strategy cycles.'],
      fixes: ['One economic priority model.', 'Weekly risk review.', 'Outcome-first execution tracking.'],
      faqs: [
        { question: "Why don't I understand numbers despite tracking everything?", answer: 'Because volume is not clarity without prioritization.' },
        { question: 'Why do problems appear too late?', answer: 'Because teams optimize siloed KPIs, not shared economics.' },
        { question: 'Is this just another dashboard?', answer: 'No. It maps urgency, impact, and next move.' },
      ],
      cta: {
        title: 'Convert visibility into better control',
        body: 'Identify where performance can be improved and prioritize the first actions.',
        button: 'Obtain a clear view of business performance',
        problem: 'You are data-rich but decision-poor.',
        loss: 'Delayed action compounds financial damage.',
        action: 'Get clarity in minutes and execute now.',
      },
      ui: EN_UI,
    },
  },
  es: {
    'how-to-understand-my-business': {
      title: 'Cómo entender tu negocio (antes de que los problemas te cuesten plata)',
      description: 'Entendé tus números antes de perder margen: contexto financiero y decisiones accionables.',
      keywords: ['como entender mi negocio', 'numeros del negocio', 'claridad financiera', 'dashboard alternativa'],
      h1: 'Cómo entender tu negocio antes de que los problemas sean caros',
      intro:
        'Muchos equipos detectan que necesitan mayor claridad financiera cuando el desempeño cambia. Revisarlo a tiempo mejora la toma de decisiones.',
      whatIs:
        'Es saber qué cambió, por qué cambió y qué mover esta semana para proteger caja y rentabilidad.',
      howItWorks: ['Unificás datos financieros y comerciales.', 'Detectás causa raíz.', 'Priorizás acciones por impacto.'],
      whenToUse: ['Decisiones tardías.', 'Margen inestable.', 'Ruido de métricas.'],
      forWho: ['Founders y CEOs.', 'Finanzas y RevOps.', 'Equipos de operaciones.'],
      examples: ['Recuperar payback tras suba de CAC.', 'Frenar fuga de churn.', 'Proteger runway.'],
      commonMistakes: ['Demasiados KPIs sin orden.', 'Revisión mensual.', 'Confundir actividad con salud económica.'],
      ignoreConsequences: ['Se mantiene baja visibilidad.', 'La planificación pierde previsibilidad.', 'La estrategia se vuelve más reactiva.'],
      fixes: ['Cadencia semanal.', 'Dueño por acción.', 'Medir resultado, no solo reporte.'],
      faqs: [
        { question: '¿Por qué puede resultar difícil interpretar los datos?', answer: 'Porque muchas herramientas muestran eventos sin contexto para decidir.' },
        { question: '¿Por qué los desvíos suelen detectarse tarde?', answer: 'Porque los riesgos cambian semanalmente y muchas revisiones son mensuales.' },
        { question: '¿Esto es solo otro dashboard?', answer: 'No. También ayuda a priorizar acciones.' },
      ],
      cta: {
        title: 'Mejorar la claridad para decidir',
        body: 'Revisá el desempeño actual y priorizá las acciones más relevantes.',
        button: 'Solicitar una demostración',
        problem: 'Tenés datos, pero no prioridades claras.',
        loss: 'Cada demora amplifica pérdida financiera.',
        action: 'Obtené claridad en minutos y actuá esta semana.',
      },
      ui: ES_UI,
    },
    'business-cash-flow-analysis': {
      title: 'Análisis de flujo de caja (antes de que el runway te obligue a recortar mal)',
      description: 'Detectá fugas de caja temprano y mejorá decisiones de liquidez con contexto real.',
      keywords: ['analisis flujo de caja', 'riesgo de runway', 'burn rate', 'fugas de caja'],
      h1: 'Análisis de flujo de caja que termina en acción inmediata',
      intro:
        'Las variaciones de caja suelen acumularse de forma gradual. Revisarlas de forma anticipada mejora la planificación financiera.',
      whatIs: 'Un modelo operativo semanal para detectar dónde se crea y se destruye caja.',
      howItWorks: ['Seguimiento por segmento.', 'Detección de drivers de burn.', 'Acciones priorizadas de liquidez.'],
      whenToUse: ['Sube el burn.', 'Cobros inestables.', 'Recortes sin confianza.'],
      forWho: ['Founders.', 'Equipos de finanzas.', 'Operaciones.'],
      examples: ['Extender runway reasignando inversión.', 'Mejorar ciclo de caja.'],
      commonMistakes: ['Usar facturación como proxy de caja.', 'Ignorar demoras de cobro.', 'Recortar sin análisis de contribución.'],
      ignoreConsequences: ['Menor previsibilidad de runway.', 'Menor flexibilidad operativa.', 'Decisiones financieras más reactivas.'],
      fixes: ['Umbrales semanales.', 'Asignación por payback.', 'Disciplina de cobranzas.'],
      faqs: [
        { question: '¿Por qué no entiendo la presión de caja?', answer: 'Porque P&L y caja no se mueven igual en el tiempo.' },
        { question: '¿Por qué detecto tarde el riesgo?', answer: 'Porque el deterioro es semanal y la revisión mensual.' },
        { question: '¿Esto es distinto de un dashboard?', answer: 'Sí. Explica causa y próxima acción.' },
      ],
      cta: {
        title: 'Fortalecer la visibilidad de caja',
        body: 'Identificá oportunidades de mejora y definí prioridades de acción.',
        button: 'Identificar oportunidades de mejora en tu operación',
        problem: 'Decidís caja con señales tardías.',
        loss: 'Cada semana reduce opciones de runway.',
        action: 'Obtené claridad en minutos y protegé caja hoy.',
      },
      ui: ES_UI,
    },
    'financial-decision-software': {
      title: 'Software para decisiones financieras (antes de que la lentitud te coma margen)',
      description: 'Compará software orientado a acción y resultado económico, no solo reporte.',
      keywords: ['software decisiones financieras', 'decision intelligence', 'alternativa a dashboard'],
      h1: 'Software financiero que te dice qué mover primero',
      intro:
        'Muchas empresas cuentan con datos, pero necesitan una mejor priorización para decidir con mayor consistencia.',
      whatIs: 'Una capa de decisión que transforma métricas en acciones ordenadas por impacto económico.',
      howItWorks: ['Une señales entre equipos.', 'Explica causa y urgencia.', 'Ordena acciones por impacto.'],
      whenToUse: ['Dashboard sin siguiente paso.', 'Prioridades desalineadas.', 'Ejecución lenta.'],
      forWho: ['Equipos ejecutivos.', 'Finanzas y RevOps.', 'Operaciones de crecimiento.'],
      examples: ['Priorizar retención sobre adquisición.', 'Reasignar presupuesto para proteger margen.'],
      commonMistakes: ['Más BI para un problema de prioridad.', 'Sin owner por acción.', 'Ciclos eternos de análisis.'],
      ignoreConsequences: ['Ejecución más lenta.', 'Prioridades conflictivas.', 'Menor consistencia en resultados.'],
      fixes: ['Top 3 semanal.', 'Ownership claro.', 'Medición rápida de impacto.'],
      faqs: [
        { question: '¿Por qué no entiendo números entre equipos?', answer: 'Porque las herramientas están fragmentadas y sin contexto común.' },
        { question: '¿Por qué aparecen tarde los problemas?', answer: 'Porque el reporting estático muestra señales atrasadas.' },
        { question: '¿Esto es solo otro dashboard?', answer: 'No. Es priorización y acción.' },
      ],
      cta: {
        title: 'Convertí datos en ejecución coordinada',
        body: 'Obtené una priorización clara de acciones en una sesión en vivo.',
        button: 'Solicitar una demostración',
        problem: 'Ves métricas, pero no priorizás con confianza.',
        loss: 'Priorizar lento quema tiempo y caja.',
        action: 'Definí hoy tu mapa de decisiones.',
      },
      ui: ES_UI,
    },
    'why-businesses-fail-with-data': {
      title: 'Por qué las empresas fallan con datos (aunque sus dashboards se vean “bien”)',
      description: 'Entendé por qué empresas con muchos datos igual pierden dinero: ruido, demora y parálisis.',
      keywords: ['por que fallan con datos', 'paralisis dashboard', 'sobrecarga de datos'],
      h1: 'Por qué las empresas fallan con datos aunque midan todo',
      intro:
        'La visibilidad sin priorización puede dificultar la ejecución. Revisar contexto y foco permite decidir con mayor claridad.',
      whatIs: 'Falla de datos es ver métricas, pero no convertirlas en acción responsable a tiempo.',
      howItWorks: ['Definiciones fragmentadas.', 'Decisión lenta.', 'Sin prioridad por impacto.'],
      whenToUse: ['Reuniones sin acción.', 'Reportes siempre tarde.', 'KPIs locales vs resultado global.'],
      forWho: ['Founders.', 'CFOs.', 'Operaciones.'],
      examples: ['80 KPIs sin foco.', 'Clicks suben y payback empeora.'],
      commonMistakes: ['Más dashboards, mismas decisiones.', 'Control mensual para riesgo semanal.', 'Sin responsables claros.'],
      ignoreConsequences: ['Reacción más lenta.', 'Presión gradual sobre márgenes.', 'Ciclos de decisión reactivos.'],
      fixes: ['Marco económico único.', 'Review semanal de riesgo.', 'Seguimiento por resultado.'],
      faqs: [
        { question: '¿Por qué no entiendo números si mido todo?', answer: 'Porque volumen no es claridad sin priorización.' },
        { question: '¿Por qué aparecen tarde los problemas?', answer: 'Porque se optimizan silos y no economía compartida.' },
        { question: '¿Esto es solo otro dashboard?', answer: 'No. Mapea urgencia, impacto y próximo movimiento.' },
      ],
      cta: {
        title: 'Convertí visibilidad en control operativo',
        body: 'Detectá oportunidades de mejora y definí el orden de acción.',
        button: 'Obtener una visión clara del estado de tu negocio',
        problem: 'Tenés muchos datos y poca ejecución.',
        loss: 'La demora en actuar multiplica daño financiero.',
        action: 'Obtené claridad en minutos y ejecutá ahora.',
      },
      ui: ES_UI,
    },
  },
  de: {
    'how-to-understand-my-business': {
      title: 'Wie du dein Business verstehst (bevor versteckte Probleme Marge verbrennen)',
      description: 'Verstehe deine Zahlen frühzeitig: klare Finanzsignale und schnelle, priorisierte Entscheidungen.',
      keywords: ['business verstehen', 'finanzielle klarheit', 'zahlen verstehen', 'dashboard alternative'],
      h1: 'Wie du dein Business verstehst, bevor Probleme teuer werden',
      intro:
        'Viele Founder merken erst bei sinkender Marge, dass sie ihre Zahlen nicht wirklich verstehen. Dann ist Geld bereits verloren.',
      whatIs: 'Zu verstehen heißt: was änderte sich, warum, und welche Maßnahme schützt jetzt Cash und Marge.',
      howItWorks: ['Finanz- und Revenue-Daten bündeln.', 'Ursache schnell erkennen.', 'Top-Aktionen nach Impact priorisieren.'],
      whenToUse: ['Späte Entscheidungen.', 'Unklare Margenschwankung.', 'Team ohne Prioritätsklarheit.'],
      forWho: ['Founder und CEOs.', 'Finance und RevOps.', 'Operations-Teams.'],
      examples: ['Payback nach CAC-Schock stabilisieren.', 'Churn-Leakage stoppen.', 'Runway aktiv schützen.'],
      commonMistakes: ['Zu viele KPIs ohne Fokus.', 'Nur monatliche Reviews.', 'Aktivität statt Wirtschaftlichkeit.'],
      ignoreConsequences: ['Marge erodiert.', 'Burn steigt.', 'Strategie wird reaktiv.'],
      fixes: ['Wöchentliche Entscheidungszyklen.', 'Owner pro Maßnahme.', 'Outcome statt nur Reporting messen.'],
      faqs: [
        { question: 'Warum verstehe ich meine Zahlen nicht?', answer: 'Weil viele Tools Ereignisse zeigen, aber keinen Entscheidungs-Kontext.' },
        { question: 'Warum erscheinen Probleme zu spät?', answer: 'Risiken ändern sich wöchentlich, Reports werden monatlich gelesen.' },
        { question: 'Ist das nur ein Dashboard?', answer: 'Nein. Es priorisiert, was jetzt zu tun ist.' },
      ],
      cta: {
        title: 'Hör auf zu raten, während Marge verloren geht',
        body: 'Sieh live, was in deinem Business passiert und welche Maßnahmen zuerst zählen.',
        button: 'Sieh, was wirklich in deinem Business passiert',
        problem: 'Du hast Daten, aber keine klare Prioritätsliste.',
        loss: 'Jede Verzögerung erhöht den finanziellen Schaden.',
        action: 'Hol dir Klarheit in Minuten und handle diese Woche.',
      },
      ui: DE_UI,
    },
    'business-cash-flow-analysis': {
      title: 'Cashflow-Analyse (bevor Runway-Druck schlechte Kürzungen erzwingt)',
      description: 'Erkenne Cash-Leaks früh und verbessere Liquiditätsentscheidungen mit echtem Kontext.',
      keywords: ['cashflow analyse', 'runway risiko', 'burn rate', 'cash leaks'],
      h1: 'Cashflow-Analyse mit sofort umsetzbaren Entscheidungen',
      intro:
        'Cash-Probleme eskalieren selten plötzlich. Sie wachsen in stillen Leaks, bis der Druck auf Runway und Entscheidungen steigt.',
      whatIs: 'Ein wöchentliches Entscheidungsmodell, das zeigt, wo Liquidität entsteht und verloren geht.',
      howItWorks: ['Ein-/Auszahlungen segmentiert verfolgen.', 'Burn-Treiber erkennen.', 'Liquiditätsmaßnahmen priorisieren.'],
      whenToUse: ['Burn steigt.', 'Einzahlungen schwanken.', 'Kürzungen ohne Sicherheit.'],
      forWho: ['Founder.', 'Finance-Teams.', 'Operations.'],
      examples: ['Runway durch Reallokation verlängern.', 'Cash Conversion verbessern.'],
      commonMistakes: ['Umsatz als Cash-Proxy.', 'Forderungen zu spät steuern.', 'Kürzen ohne Deckungsbeitrag.'],
      ignoreConsequences: ['Kürzerer Runway.', 'Notfallkürzungen.', 'Reaktives Fundraising.'],
      fixes: ['Wöchentliche Runway-Grenzen.', 'Payback-basierte Allokation.', 'Disziplin bei Einzug und Terms.'],
      faqs: [
        { question: 'Warum verstehe ich Cash-Druck nicht?', answer: 'Weil GuV und Cash zeitlich auseinanderlaufen.' },
        { question: 'Warum erkenne ich Risiken zu spät?', answer: 'Monatliche Reviews verpassen wöchentliche Verschlechterung.' },
        { question: 'Ist das anders als ein Dashboard?', answer: 'Ja. Es zeigt Ursache und nächste Maßnahme.' },
      ],
      cta: {
        title: 'Behebe Cash-Leaks bevor sie kritisch werden',
        body: 'Sieh exakt, wo Geld verloren geht und was du zuerst ändern solltest.',
        button: 'Finde, was dich Geld kostet',
        problem: 'Cash-Steuerung basiert auf verspäteten Signalen.',
        loss: 'Jede Woche Verzögerung reduziert Runway-Optionen.',
        action: 'Hol dir Klarheit in Minuten und sichere Liquidität.',
      },
      ui: DE_UI,
    },
    'financial-decision-software': {
      title: 'Software für Finanzentscheidungen (bevor langsame Prioritäten Marge schädigen)',
      description: 'Vergleiche Entscheidungssoftware mit Fokus auf Action, Impact und Geschwindigkeit.',
      keywords: ['finanz entscheidungssoftware', 'decision intelligence', 'dashboard alternative'],
      h1: 'Software, die sagt, welche Finanzentscheidung zuerst zählt',
      intro:
        'Unternehmen scheitern selten an fehlenden Daten. Sie scheitern an langsamer Priorisierung bei steigenden Kosten.',
      whatIs: 'Eine Decision-Layer, die Kennzahlen in priorisierte Maßnahmen mit wirtschaftlichem Effekt übersetzt.',
      howItWorks: ['Signale teamübergreifend vereinheitlichen.', 'Ursache + Dringlichkeit erklären.', 'Aktionen nach Impact ranken.'],
      whenToUse: ['Dashboard ohne nächsten Schritt.', 'Prioritätenkonflikte.', 'Langsame Ausführung.'],
      forWho: ['Executive Teams.', 'Finance + RevOps.', 'Growth Operations.'],
      examples: ['Retention vor Acquisition priorisieren.', 'Budget für Marge reallokieren.'],
      commonMistakes: ['Mehr BI statt Priorisierungslogik.', 'Kein Owner je Maßnahme.', 'Zu lange Analysezyklen.'],
      ignoreConsequences: ['Langsame Ausführung.', 'Widersprüchliche Entscheidungen.', 'Kumulierte Verluste.'],
      fixes: ['Top-3 Entscheidungsboard pro Woche.', 'Klare Ownership.', 'Schnelles Outcome-Tracking.'],
      faqs: [
        { question: 'Warum verstehe ich Zahlen teamübergreifend nicht?', answer: 'Weil Tools fragmentiert sind und gemeinsamer Kontext fehlt.' },
        { question: 'Warum sehe ich Probleme zu spät?', answer: 'Statisches Reporting zeigt oft nur Nachlaufindikatoren.' },
        { question: 'Ist das nur ein weiteres Dashboard?', answer: 'Nein. Es ist ein Priorisierungs- und Handlungssystem.' },
      ],
      cta: {
        title: 'Mach aus Daten sofortige Umsetzung',
        body: 'Erhalte live die Maßnahmen mit dem höchsten wirtschaftlichen Effekt.',
        button: 'Hol dir Klarheit in Minuten',
        problem: 'Metriken sind sichtbar, Prioritäten nicht.',
        loss: 'Langsame Priorisierung verbrennt Zeit und Cash.',
        action: 'Erstelle jetzt deinen Entscheidungsplan.',
      },
      ui: DE_UI,
    },
    'why-businesses-fail-with-data': {
      title: 'Warum Unternehmen trotz Daten scheitern (auch wenn Dashboards gesund wirken)',
      description: 'Warum datenreiche Unternehmen dennoch Geld verlieren: späte Erkennung, Rauschen und Entscheidungsstau.',
      keywords: ['warum daten scheitern', 'dashboard paralysis', 'datenüberlastung'],
      h1: 'Warum Unternehmen trotz vieler Daten scheitern',
      intro:
        'Sichtbarkeit ohne Priorisierung erzeugt falsche Sicherheit. Wenn das Problem sichtbar wird, ist der finanzielle Schaden oft schon passiert.',
      whatIs: 'Datenscheitern heißt: Kennzahlen sehen, aber zu spät handeln.',
      howItWorks: ['Fragmentierte Definitionen.', 'Langsame Entscheidungszyklen.', 'Keine Impact-Priorisierung.'],
      whenToUse: ['Meetings ohne Aktion.', 'Reports kommen zu spät.', 'Lokale KPIs verdecken globalen Rückgang.'],
      forWho: ['Founder.', 'CFOs.', 'Operations.'],
      examples: ['80 KPIs ohne Fokus.', 'Clicks steigen, Payback sinkt.'],
      commonMistakes: ['Mehr Dashboards, gleiche Entscheidungen.', 'Monatsrhythmus für Wochenrisiken.', 'Kein klares Ownership.'],
      ignoreConsequences: ['Späte Reaktion.', 'Leise Margenerosion.', 'Reaktive Strategie.'],
      fixes: ['Ein wirtschaftliches Prioritätsmodell.', 'Wöchentliche Risiko-Reviews.', 'Outcome-orientierte Ausführung.'],
      faqs: [
        { question: 'Warum verstehe ich Zahlen trotz Tracking nicht?', answer: 'Volumen ist ohne Priorisierung keine Klarheit.' },
        { question: 'Warum erscheinen Probleme zu spät?', answer: 'Silo-KPIs ersetzen keine gemeinsame ökonomische Sicht.' },
        { question: 'Ist das nur ein Dashboard?', answer: 'Nein. Es zeigt Dringlichkeit, Impact und nächste Aktion.' },
      ],
      cta: {
        title: 'Verwechsle Sichtbarkeit nicht mit Kontrolle',
        body: 'Finde, wo dein Business Wert verliert und welche Korrektur zuerst zählt.',
        button: 'Sieh, was wirklich in deinem Business passiert',
        problem: 'Du bist datenreich und entscheidungsschwach.',
        loss: 'Verzögerte Aktion erhöht finanziellen Schaden.',
        action: 'Hol dir Klarheit in Minuten und handle sofort.',
      },
      ui: DE_UI,
    },
  },
}
