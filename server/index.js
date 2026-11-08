import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { getProductById, MAX_QTY, SHIPPING_FEE } from '../src/data/products.js';

const { APPS_SCRIPT_URL, APPS_SCRIPT_SECRET, ALLOWED_ORIGIN = 'http://localhost:5173', PORT = 8787 } = process.env;

const app = express();
app.use(express.json({ limit: '50kb' }));
app.use(cors({ origin: ALLOWED_ORIGIN.split(',').map((s) => s.trim()) }));

// Minimal in-memory rate limit: 10 orders / minute / IP
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 10;
}

const str = (v, max = 300) => String(v ?? '').trim().slice(0, max);

app.post('/api/orders', async (req, res) => {
  if (limited(req.ip)) return res.status(429).json({ recorded: false, error: 'rate_limited' });

  const b = req.body || {};
  const c = b.customer || {};
  const phone = str(c.phone, 20);
  if (!/^\+91[6-9]\d{9}$/.test(phone) || !str(c.name) || str(c.address).length < 8 || !str(c.city) || !str(c.state) || !/^\d{6}$/.test(str(c.pincode))) {
    return res.status(400).json({ recorded: false, error: 'invalid_customer' });
  }
  if (!Array.isArray(b.items) || !b.items.length || b.items.length > 10) {
    return res.status(400).json({ recorded: false, error: 'invalid_items' });
  }

  // Prices are recomputed here from the product catalogue — never trusted from the browser.
  const items = [];
  for (const i of b.items) {
    const p = getProductById(i?.id);
    const qty = Number(i?.qty);
    if (!p || !Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return res.status(400).json({ recorded: false, error: 'invalid_item' });
    items.push({ name: p.name, qty, price: p.price });
  }
  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
  const total = subtotal + SHIPPING_FEE;

  if (!APPS_SCRIPT_URL || !APPS_SCRIPT_SECRET) return res.status(501).json({ recorded: false, error: 'not_configured' });

  const payload = {
    secret: APPS_SCRIPT_SECRET,
    orderId: str(b.orderId, 40),
    timestamp: new Date().toISOString(),
    name: str(c.name),
    phone,
    email: str(c.email),
    address: str(c.address, 500),
    city: str(c.city),
    state: str(c.state),
    pincode: str(c.pincode, 6),
    products: items.map((i) => `${i.name} x${i.qty} @${i.price}`).join('; '),
    total,
    paymentMethod: str(b.paymentMethod, 40),
    status: 'Pending',
  };

  try {
    const r = await fetch(APPS_SCRIPT_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload), redirect: 'follow' });
    const data = await r.json().catch(() => null);
    if (r.ok && data?.ok === true) return res.json({ recorded: true });
    console.error('Apps Script rejected the order:', r.status, data);
    return res.status(502).json({ recorded: false, error: 'sheet_rejected' });
  } catch (err) {
    console.error('Apps Script request failed:', err.message);
    return res.status(502).json({ recorded: false, error: 'sheet_unreachable' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true, sheetsConfigured: Boolean(APPS_SCRIPT_URL && APPS_SCRIPT_SECRET) }));

app.listen(PORT, () => console.log(`Order API on http://localhost:${PORT}`));
