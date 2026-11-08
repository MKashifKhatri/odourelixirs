import { Link } from 'react-router-dom';
import SmartImage from './ui/SmartImage';
import { formatINR } from '../lib/format';

export default function ProductCard({ product }) {
  const href = product.id === 'discovery-set' ? '/discovery-set' : `/product/${product.slug}`;
  return (
    <Link to={href} className="group block" aria-label={`${product.name}, ${formatINR(product.price)}`}>
      <div className="overflow-hidden rounded-xl bg-surface">
        <SmartImage
          src={product.image}
          alt={product.name}
          ratio="4 / 5"
          className="!bg-transparent"
          imgClassName="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg leading-tight">{product.name}</h3>
          <p className="mt-0.5 text-[13px] text-muted">
            {product.descriptor}{product.size ? ` · ${product.size}` : ''}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-surface px-3 py-1 text-[12px]">{formatINR(product.price)}</span>
      </div>
    </Link>
  );
}
