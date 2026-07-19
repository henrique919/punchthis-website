// Vercel serverless function — POST /api/early-access
//
// Real endpoint for the early-access form: validates server-side, rate
// limits, rejects bots via a honeypot field, and forwards accepted leads to
// EARLY_ACCESS_WEBHOOK_URL (a generic HTTPS webhook the operator points at
// whatever they use to collect leads — Slack incoming webhook, Zapier,
// Make.com, a Google Sheets connector, or a custom endpoint; any URL that
// accepts a JSON POST works). That is the one required configuration value —
// set EARLY_ACCESS_WEBHOOK_URL in the Vercel project's environment
// variables. Until it's set, the endpoint responds honestly with a
// "not configured" error instead of a fake success.
//
// Same endpoint handles both the initial (email-only) capture and the
// follow-up (name/role/company) step — it always upserts by email, so the
// second call is just the first call with more fields filled in.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LEN = 200;

// Best-effort, single-instance rate limit. Serverless functions don't share
// memory across instances/cold starts, so this only bounds abuse from a
// single warm instance - it is not a distributed limiter. Swap for
// Vercel KV / Upstash if real distributed rate limiting is needed.
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clean(value) {
  return typeof value === 'string' ? value.trim().slice(0, MAX_FIELD_LEN) : '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'rate_limited' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Honeypot: real users never see or fill this field (see EarlyAccess.jsx).
  // A filled value means a bot filled every input it found - accept the
  // request outwardly (200) without forwarding it anywhere, so the bot
  // gets no signal that it was caught.
  if (clean(body.company_website)) {
    return res.status(200).json({ ok: true });
  }

  const email = clean(body.email).toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > MAX_FIELD_LEN) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  const payload = {
    email,
    name: clean(body.name),
    role: clean(body.role),
    company: clean(body.company),
    source: clean(body.source) || 'website',
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.EARLY_ACCESS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('EARLY_ACCESS_WEBHOOK_URL is not configured - early-access lead was not delivered anywhere.', payload);
    return res.status(503).json({ ok: false, error: 'not_configured' });
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!upstream.ok) {
      console.error('Early-access webhook rejected the lead', upstream.status, await upstream.text().catch(() => ''));
      return res.status(502).json({ ok: false, error: 'upstream_error' });
    }
  } catch (err) {
    console.error('Early-access webhook request failed', err);
    return res.status(502).json({ ok: false, error: 'upstream_error' });
  }

  return res.status(200).json({ ok: true });
}
