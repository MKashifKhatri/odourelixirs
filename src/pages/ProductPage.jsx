import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Minus, Plus } from 'lucide-react';
import SmartImage from '../components/ui/SmartImage';
import Button from '../components/ui/Button';
import ProductCard from '../components/ProductCard';
import NotFound from './NotFound';
import useSEO from '../hooks/useSEO';
import { useCart } from '../context/CartContext';
import { getProductBySlug, MAX_QTY, PRODUCTS } from '../data/products';
import { formatINR } from '../lib/format';

export default function ProductPage({ slugOverride }) {
  const params = useParams();
  const product = getProductBySlug(slugOverride || params.slug);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useSEO(product?.name, product?.description);
  if (!product) return <NotFound />;

  const isSet = product.id === 'discovery-set';
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addItem(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="mx-auto max-w-page px-5 py-10 md:px-8 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <Link to="/shop" className="hover:text-ink">Store</Link> / <span className="text-ink">{product.name}</span>
      </nav>
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="rounded-2xl bg-surface">
          <SmartImage src={product.image} alt={product.name} ratio="4 / 5" eager className="!bg-transparent" imgClassName="object-contain p-8" />
        </div>
        <div className="md:pt-8">
          <h1 className="text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-2 text-sm text-muted">{product.descriptor}{product.size ? ` · ${product.size}` : ''}</p>
          <p className="mt-6 text-2xl">{formatINR(product.price)}</p>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">{product.description}</p>

          {isSet && (
            <div className="mt-6">
              <h2 className="font-sans text-sm font-medium">Includes</h2>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {PRODUCTS.map((p) => (
                  <li key={p.id}><Link to={`/product/${p.slug}`} className="hover:text-ink">{p.name}</Link></li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-line" role="group" aria-label="Quantity">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center"><Minus size={14} /></button>
              <span aria-live="polite" className="w-8 text-center text-sm">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} className="flex h-11 w-11 items-center justify-center"><Plus size={14} /></button>
            </div>
            <Button type="button" arrow={false} onClick={handleAdd}>
              {added ? <><Check size={14} /> Added to cart</> : 'Add to cart'}
            </Button>
          </div>
          {added && <p role="status" className="mt-3 text-sm"><Link to="/cart" className="underline">View cart</Link></p>}
        </div>
      </div>

      <section aria-labelledby="related-title" className="mt-24">
        <h2 id="related-title" className="text-3xl">You may also like</h2>
        <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
        </ul>
      </section>
    </div>
  );
}
