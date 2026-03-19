import { NextRequest, NextResponse } from 'next/server'

const rate_limit_map = new Map<string, { count: number; reset_at: number }>()
const MAX_REQUESTS = 3
const WINDOW_MS = 60 * 60 * 1000 // 1 hora

function is_rate_limited(ip: string): boolean {
  const now = Date.now()
  const entry = rate_limit_map.get(ip)

  if (!entry || now > entry.reset_at) {
    rate_limit_map.set(ip, { count: 1, reset_at: now + WINDOW_MS })
    return false
  }

  if (entry.count >= MAX_REQUESTS) return true

  entry.count++
  return false
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

    if (is_rate_limited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const { name, phone, message, date1, date2 } = await req.json()

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'name, phone and message are required' }, { status: 400 })
    }

    const backend_url = process.env.BACKEND_URL
    const api_secret = process.env.API_SECRET

    if (!backend_url || !api_secret) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    // Solicita JWT ao backend
    const token_res = await fetch(`${backend_url}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_secret }),
    })

    if (!token_res.ok) {
      return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 })
    }

    const { token } = await token_res.json()

    // Envia mensagem ao backend com JWT
    const contact_res = await fetch(`${backend_url}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, phone, message, date1, date2 }),
    })

    if (!contact_res.ok) {
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
