import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import useSEO from '../hooks/useSEO';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/format';
import { createOrderId, saveLastOrder, submitOrder } from '../lib/orders';

const UPI_ID = import.meta.env.VITE_UPI_ID || '';

const FIELDS = [
  { name: 'name', label: 'Full name', autoComplete: 'name', required: true },
  { name: 'phone', label: 'Phone number', autoComplete: 'tel', inputMode: 'tel', required: true, hint: '10-digit mobile number' },
  { name: 'email', label: 'Email (optional)', autoComplete: 'email', type: 'email' },
  { name: 'address', label: 'Delivery address', autoComplete: 'street-address', required: true, wide: true },
  { name: 'city', label: 'City', autoComplete: 'address-level2', required: true },
  { name: 'state', label: 'State', autoComplete: 'address-level1', required: true },
  { name: 'pincode', label: 'PIN code', autoComplete: 'postal-code', inputMode: 'numeric', required: true },
];

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Enter your name';
  const phone = v.phone.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '');
  if (!/^[6-9]\d{9}$/.test(phone)) e.phone = 'Enter a valid 10-digit mobile number';
  if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email';
  if (v.address.trim().length < 8) e.address = 'Enter your full delivery address';
  if (!v.city.trim()) e.city = 'Enter your city';
  if (!v.state.trim()) e.state = 'Enter your state';
  if (!/^\d{6}$/.test(v.pincode.trim())) e.pincode = 'Enter a 6-digit PIN code';
  return { e, phone };
}

export default function Checkout() {
  useSEO('Checkout');
  const navigate = useNavigate();
  const { lines, subtotal, shipping, total, clear } = useCart();
  const [values, setValues] = useState({ name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '' });
  const [payment, setPayment] = useState('whatsapp');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (!lines.length) return <Navigate to="/cart" replace />;

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const { e, phone } = validate(values);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setSubmitting(true);
    const order = {
      orderId: createOrderId(),
      createdAt: new Date().toISOString(),
      status: 'Pending',
      paymentMethod: payment === 'upi' ? 'UPI (manual)' : 'WhatsApp (manual)',
      customer: { ...values, phone: `+91${phone}` },
      items: lines.map((l) => ({ id: l.id, name: l.product.name, qty: l.qty, price: l.product.price })),
      subtotal, shipping, total,
    };
    const { sync } = await submitOrder(order); // server recomputes prices; sync is only 'recorded' when verified
    saveLastOrder({ ...order, sync });
    clear();
    navigate('/order-confirmation');
  };

  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8 md:py-20">
      <h1 className="text-4xl md:text-5xl">Checkout</h1>
      <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <h2 className="font-sans text-base font-medium">Contact &amp; delivery</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.name} className={f.wide ? 'sm:col-span-2' : ''}>
                <label htmlFor={`f-${f.name}`} className="mb-1 block text-sm">{f.label}</label>
                {f.wide ? (
                  <textarea id={`f-${f.name}`} name={f.name} rows={3} value={values[f.name]} onChange={onChange} autoComplete={f.autoComplete} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `e-${f.name}` : undefined} className="w-full rounded-xl border border-line px-4 py-3 text-sm" />
                ) : (
                  <input id={`f-${f.name}`} name={f.name} type={f.type || 'text'} inputMode={f.inputMode} value={values[f.name]} onChange={onChange} autoComplete={f.autoComplete} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `e-${f.name}` : undefined} className="min-h-[46px] w-full rounded-xl border border-line px-4 text-sm" />
                )}
                {errors[f.name] && <p id={`e-${f.name}`} className="mt-1 text-xs text-red-600">{errors[f.name]}</p>}
              </div>
            ))}
          </div>

          <fieldset className="mt-8">
            <legend className="font-sans text-base font-medium">Payment</legend>
            <div className="mt-3 space-y-2">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-4 text-sm">
                <input type="radio" name="payment" value="whatsapp" checked={payment === 'whatsapp'} onChange={() => setPayment('whatsapp')} className="mt-1" />
                <span><span className="font-medium">Confirm on WhatsApp</span><br /><span className="text-muted">We contact you on WhatsApp to confirm your order and payment.</span></span>
              </label>
              {UPI_ID && (
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-4 text-sm">
                  <input type="radio" name="payment" value="upi" checked={payment === 'upi'} onChange={() => setPayment('upi')} className="mt-1" />
                  <span><span className="font-medium">Pay by UPI</span><br /><span className="text-muted">You pay manually via UPI after placing the order. The order stays “Pending” until payment is confirmed.</span></span>
                </label>
              )}
            </div>
          </fieldset>
        </div>

        <aside aria-label="Order summary" className="h-fit rounded-2xl bg-surface p-6">
          <h2 className="font-sans text-base font-medium">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {lines.map((l) => (
              <li key={l.id} className="flex justify-between gap-3"><span>{l.product.name} × {l.qty}</span><span>{formatINR(l.product.price * l.qty)}</span></li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
            {shipping > 0 && <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{formatINR(shipping)}</dd></div>}
            <div className="flex justify-between text-base font-medium"><dt>Total</dt><dd>{formatINR(total)}</dd></div>
          </dl>
          <Button type="submit" disabled={submitting} arrow={false} className="mt-6 w-full">{submitting ? 'Placing order…' : 'Place order'}</Button>
          <Link to="/cart" className="mt-3 block text-center text-xs text-muted underline">Back to cart</Link>
        </aside>
      </form>
    </div>
  );
}
