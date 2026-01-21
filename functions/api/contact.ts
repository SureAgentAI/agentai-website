interface Env {
  RESEND_API_KEY: string
  TURNSTILE_SECRET_KEY?: string
}

type PagesFunction<E = unknown> = (context: {
  request: Request
  env: E
  params: Record<string, string>
  waitUntil: (promise: Promise<unknown>) => void
  passThroughOnException: () => void
}) => Response | Promise<Response>

interface ContactMeta {
  referrer?: string
  page_url?: string
  user_agent?: string
  timestamp?: string
  ip?: string
}

// Contact form request
interface ContactRequest {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  'cf-turnstile-response'?: string
  template?: 'contact' | 'demo' | 'about'
  // Demo-specific fields
  role?: string
  monthly_claims?: string
  preferred_time?: string
  _meta?: ContactMeta
}

const ALLOWED_ORIGINS = [
  'https://agentai.app',
  'https://www.agentai.app',
  'https://agentai-website.pages.dev',
  'http://localhost:5173',
  'http://localhost:5174',
]

function getCorsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get('Origin') || ''
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }
}

// Handle preflight OPTIONS request
export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
  return new Response(null, { status: 204, headers: getCorsHeaders(request) })
}

// Handle POST request
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const corsHeaders = getCorsHeaders(request)

  try {
    const data: ContactRequest = await request.json()
    const { name, email, template = 'contact', _meta } = data

    // Validate required fields
    const errors = validateForm(data)
    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ error: errors.join(', ') }),
        { status: 400, headers: corsHeaders }
      )
    }

    // Turnstile verification (if configured)
    const turnstileToken = data['cf-turnstile-response']
    if (env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const turnstileValid = await verifyTurnstile(
        turnstileToken,
        env.TURNSTILE_SECRET_KEY,
        request.headers.get('CF-Connecting-IP') || ''
      )
      if (!turnstileValid) {
        return new Response(
          JSON.stringify({ error: 'Verification failed. Please try again.' }),
          { status: 400, headers: corsHeaders }
        )
      }
    }

    // Check API key
    if (!env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { status: 503, headers: corsHeaders }
      )
    }

    // Build email with metadata
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const meta: ContactMeta = {
      ..._meta,
      ip,
      timestamp: _meta?.timestamp || new Date().toISOString(),
    }

    const isDemo = template === 'demo'
    const isAbout = template === 'about'
    const subject = isDemo
      ? `Demo Request: ${name}`
      : isAbout
        ? `About Page Inquiry: ${name}`
        : `New Contact: ${name}`

    const htmlBody = isDemo
      ? buildDemoEmailHtml(data, meta)
      : buildContactEmailHtml(data, meta, isAbout)

    // Send email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AgentAI Contact Form <noreply@agentai.biz>',
        to: ['sacha@agentai.app', 'michael@agentai.app'],
        reply_to: email,
        subject,
        html: htmlBody,
      }),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      console.error('Resend error:', errorText)
      return new Response(
        JSON.stringify({ error: 'Failed to send message. Please try again.' }),
        { status: 500, headers: corsHeaders }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Thank you! We will be in touch soon.' }),
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return new Response(
      JSON.stringify({ error: 'Invalid request.' }),
      { status: 400, headers: corsHeaders }
    )
  }
}

function validateForm(data: ContactRequest): string[] {
  const errors: string[] = []

  if (!data.name || data.name.length < 2 || data.name.length > 100) {
    errors.push('Name must be 2-100 characters')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email) || data.email.length > 254) {
    errors.push('Invalid email address')
  }

  if (!data.message || data.message.length < 5 || data.message.length > 5000) {
    errors.push('Message must be 5-5000 characters')
  }

  return errors
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  })
  const result = await response.json() as { success: boolean }
  return result.success
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return phone
}

function buildMetaSection(meta?: ContactMeta): string {
  const timestamp = meta?.timestamp
    ? new Date(meta.timestamp).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
    : 'N/A'

  return `
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin-top:24px;">
      <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;margin-bottom:12px;">Submission Details</div>
      <table style="width:100%;font-size:12px;">
        <tr>
          <td style="color:#64748b;padding:2px 8px 2px 0;width:80px;">Submitted</td>
          <td style="color:#334155;">${timestamp} (PT)</td>
        </tr>
        <tr>
          <td style="color:#64748b;padding:2px 8px 2px 0;">Referrer</td>
          <td style="color:#334155;">${meta?.referrer || 'direct'}</td>
        </tr>
        <tr>
          <td style="color:#64748b;padding:2px 8px 2px 0;vertical-align:top;">Page</td>
          <td style="color:#334155;word-break:break-all;">${meta?.page_url || 'N/A'}</td>
        </tr>
        <tr>
          <td style="color:#64748b;padding:2px 8px 2px 0;">IP</td>
          <td style="color:#334155;">${meta?.ip || 'N/A'}</td>
        </tr>
      </table>
    </div>
  `
}

function buildContactEmailHtml(data: ContactRequest, meta?: ContactMeta, isAbout?: boolean): string {
  const initials = data.name.split(' ').map(n => n.charAt(0).toUpperCase()).join('').slice(0, 2)
  const title = isAbout ? 'About Page Inquiry' : 'New Contact Inquiry'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:24px;">
      <img src="https://agentai.app/images/assets/logo.png" alt="AgentAI" style="height:40px;width:auto;" />
    </div>

    <!-- Main Card -->
    <div style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <!-- Header Bar -->
      <div style="background:linear-gradient(135deg,#6366f1 0%,#4f46e5 100%);padding:20px 24px;">
        <h1 style="margin:0;font-size:18px;color:#ffffff;font-weight:600;">${title}</h1>
      </div>

      <!-- Content -->
      <div style="padding:24px;">
        <!-- Contact Info -->
        <div style="display:flex;align-items:center;margin-bottom:20px;">
          <div style="width:48px;height:48px;background:#eef2ff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-right:16px;">
            <span style="font-size:18px;font-weight:600;color:#6366f1;">${initials}</span>
          </div>
          <div>
            <div style="font-size:16px;font-weight:600;color:#1e293b;">${escapeHtml(data.name)}</div>
            <div style="font-size:14px;color:#64748b;">${data.company ? escapeHtml(data.company) : 'No company specified'}</div>
            ${data.role ? `<div style="font-size:12px;color:#6366f1;margin-top:2px;">${escapeHtml(data.role)}</div>` : ''}
          </div>
        </div>

        <!-- Details Grid -->
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr>
            <td style="padding:10px 12px;background:#f8fafc;border-radius:6px 0 0 0;">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;margin-bottom:2px;">Email</div>
              <a href="mailto:${escapeHtml(data.email)}" style="font-size:14px;color:#6366f1;text-decoration:none;">${escapeHtml(data.email)}</a>
            </td>
            <td style="padding:10px 12px;background:#f8fafc;border-radius:0 6px 0 0;">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;margin-bottom:2px;">Phone</div>
              <div style="font-size:14px;color:#1e293b;">${data.phone ? formatPhone(data.phone) : '—'}</div>
            </td>
          </tr>
        </table>

        <!-- Message -->
        <div style="background:#fefce8;border-left:3px solid #eab308;padding:16px;border-radius:0 8px 8px 0;">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;color:#a16207;margin-bottom:8px;">Message</div>
          <div style="font-size:14px;color:#1e293b;line-height:1.6;">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
        </div>
      </div>
    </div>

    <!-- Meta Section -->
    ${buildMetaSection(meta)}

    <!-- Footer -->
    <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:24px;">
      agentai.app
    </p>
  </div>
</body>
</html>
  `.trim()
}

function buildDemoEmailHtml(data: ContactRequest, meta?: ContactMeta): string {
  const initials = data.name.split(' ').map(n => n.charAt(0).toUpperCase()).join('').slice(0, 2)

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Demo Request</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:24px;">
      <img src="https://agentai.app/images/assets/logo.png" alt="AgentAI" style="height:40px;width:auto;" />
    </div>

    <!-- Main Card -->
    <div style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <!-- Header Bar -->
      <div style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:20px 24px;display:flex;align-items:center;justify-content:space-between;">
        <h1 style="margin:0;font-size:18px;color:#ffffff;font-weight:600;">Demo Request</h1>
        <span style="background:rgba(255,255,255,0.2);color:#ffffff;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">New Lead</span>
      </div>

      <!-- Content -->
      <div style="padding:24px;">
        <!-- Contact Info -->
        <div style="background:#f0fdf4;border-radius:8px;padding:16px;margin-bottom:20px;">
          <div style="display:flex;align-items:center;">
            <div style="width:48px;height:48px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-right:16px;">
              <span style="font-size:18px;font-weight:600;color:#10b981;">${initials}</span>
            </div>
            <div>
              <div style="font-size:16px;font-weight:600;color:#1e293b;">${escapeHtml(data.name)}</div>
              <div style="font-size:14px;color:#64748b;">${data.company ? escapeHtml(data.company) : 'No company specified'}</div>
              ${data.role ? `<div style="font-size:12px;color:#10b981;margin-top:2px;">${escapeHtml(data.role)}</div>` : ''}
            </div>
          </div>
        </div>

        <!-- Demo Details -->
        <div style="display:flex;gap:12px;margin-bottom:20px;">
          <div style="flex:1;background:#f8fafc;border-radius:8px;padding:12px;">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;margin-bottom:6px;">Monthly Claims</div>
            <div style="font-size:13px;font-weight:500;color:#1e293b;">${data.monthly_claims || 'Not specified'}</div>
          </div>
          <div style="flex:1;background:#f8fafc;border-radius:8px;padding:12px;">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;margin-bottom:6px;">Preferred Time</div>
            <div style="font-size:13px;font-weight:500;color:#1e293b;">${data.preferred_time || 'Not specified'}</div>
          </div>
        </div>

        <!-- Contact Details -->
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr>
            <td style="padding:10px 12px;background:#f8fafc;border-radius:6px 0 0 6px;">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;margin-bottom:2px;">Email</div>
              <a href="mailto:${escapeHtml(data.email)}" style="font-size:14px;color:#10b981;text-decoration:none;">${escapeHtml(data.email)}</a>
            </td>
            <td style="padding:10px 12px;background:#f8fafc;border-radius:0 6px 6px 0;">
              <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;margin-bottom:2px;">Phone</div>
              <a href="tel:${data.phone}" style="font-size:14px;color:#10b981;text-decoration:none;">${data.phone ? formatPhone(data.phone) : '—'}</a>
            </td>
          </tr>
        </table>

        <!-- Additional Info -->
        ${data.message && data.message !== 'None' ? `
        <div style="background:#fefce8;border-left:3px solid #eab308;padding:16px;border-radius:0 8px 8px 0;">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;color:#a16207;margin-bottom:8px;">Additional Information</div>
          <div style="font-size:14px;color:#1e293b;line-height:1.6;">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
        </div>
        ` : ''}
      </div>
    </div>

    <!-- Meta Section -->
    ${buildMetaSection(meta)}

    <!-- Footer -->
    <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:24px;">
      agentai.app/demo
    </p>
  </div>
</body>
</html>
  `.trim()
}
