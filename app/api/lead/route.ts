import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO = 'hola@summer87.ai'

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

// CRM integration via webhook
async function sendToCrm(payload: Record<string, string>): Promise<void> {
  const url = process.env.CRM_WEBHOOK_URL
  if (!url) return
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error('[CRM] Webhook responded with status', res.status)
    }
  } catch (err) {
    console.error('[CRM] Webhook request failed', err)
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const company = String(body.company ?? '').trim()
  const email = String(body.email ?? '').trim()
  const companySize = String(body.companySize ?? '').trim()
  const mainProblem = String(body.mainProblem ?? '').trim()
  const preferredChannel = String(body.preferredChannel ?? '').trim()
  const source = String(body.source ?? '').trim()

  if (!name || !company || !email || !mainProblem) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
  }

  const emailText = `Nuevo lead Summer87
Nombre: ${name}
Empresa: ${company}
Email: ${email}
Tamaño: ${companySize || '(no indicado)'}
Problema principal: ${mainProblem}
Canal preferido: ${preferredChannel || '(no indicado)'}
Origen: ${source || '(no indicado)'}`

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'Email not configured' }, { status: 503 })
  }

  const from = process.env.RESEND_FROM || 'Summer87 <onboarding@resend.dev>'
  const resend = new Resend(apiKey)

  const crmPayload: Record<string, string> = {
    source: 'summer87-web',
    name,
    email,
    company,
    size: companySize,
    mainProblem,
    preferredChannel,
    message: mainProblem,
    createdAt: new Date().toISOString(),
  }

  const emailPromise = resend.emails.send({
    from,
    to: TO,
    subject: `Nuevo lead: ${name} — ${company}`,
    text: emailText,
  })

  const [emailResult] = await Promise.allSettled([emailPromise, sendToCrm(crmPayload)])

  if (emailResult.status === 'rejected') {
    console.error('[Email] Unexpected rejection', emailResult.reason)
    return NextResponse.json({ ok: false, error: 'Send failed' }, { status: 502 })
  }

  const { error } = emailResult.value
  if (error) {
    return NextResponse.json(
      { ok: false, error: typeof error === 'object' && 'message' in error ? String(error.message) : 'Send failed' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
