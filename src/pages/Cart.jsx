import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import SmartImage from '../components/ui/SmartImage';
import Button from '../components/ui/Button';
import useSEO from '../hooks/useSEO';
import { useCart } from '../context/CartContext';
import { MAX_QTY, SHIPPING_NOTE } from '../data/products';
import { formatINR } from '../lib/format';

export default function Cart() {
  useSEO('Cart');
  const { lines, subtotal, shipping, total, setQty, removeItem } = useCart();

  if (!lines.length) {
    return (
      <div className="mx-auto max-w-page px-5 py-28 text-center md:px-8">
        <h1 className="text-4xl">Your cart is empty.</h1>
        <p className="mt-3 text-sm text-muted">Find your signature in the collection.</p>
        <div className="mt-6"><Button to="/shop">Explore Collection</Button></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8 md:py-20">
      <h1 className="text-4xl md:text-5xl">Your Cart</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <ul className="divide-y divide-line border-y border-line">
          {lines.map(({ product, qty }) => (
            <li key={product.id} className="flex gap-4 py-5">
              <Link to={product.id === 'discovery-set' ? '/discovery-set' : `/product/${product.slug}`} className="block w-24 shrink-0 overflow-hidden rounded-lg bg-surface">
                <SmartImage src={product.image} alt={product.name} ratio="4 / 5" className="!bg-transparent" imgClassName="object-contain p-2" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-lg">{product.name}</h2>
                    <p className="text-[13px] text-muted">{product.descriptor}{product.size ? ` · ${product.size}` : ''}</p>
                  </div>
                  <p className="text-sm">{formatINR(product.price * qty)}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-line" role="group" aria-label={`Quantity for ${product.name}`}>
                    <button type="button" aria-label="Decrease quantity" onClick={() => setQty(product.id, qty - 1)} className="flex h-10 w-10 items-center justify-center"><Minus size={14} /></button>
                    <span aria-live="polite" className="w-7 text-center text-sm">{qty}</span>
                    <button type="button" aria-label="Increase quantity" disabled={qty >= MAX_QTY} onClick={() => setQty(product.id, qty + 1)} className="flex h-10 w-10 items-center justify-center disabled:opacity-40"><Plus size={14} /></button>
                  </div>
                  <button type="button" onClick={() => removeItem(product.id)} className="flex h-10 items-center gap-1.5 px-2 text-sm text-muted hover:text-ink">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside aria-label="Order summary" className="h-fit rounded-2xl bg-surface p-6">
          <h2 className="font-sans text-base font-medium">Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
            {shipping > 0 && <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{formatINR(shipping)}</dd></div>}
            <div className="flex justify-between border-t border-line pt-3 text-base font-medium"><dt>Total</dt><dd>{formatINR(total)}</dd></div>
          </dl>
          {SHIPPING_NOTE && <p className="mt-3 text-xs text-muted">{SHIPPING_NOTE}</p>}
          <Button to="/checkout" className="mt-6 w-full">Checkout</Button>
        </aside>
      </div>
    </div>
  );
}
