import Pill from './ui/Pill';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import ProductCard from './ProductCard';
import { PRODUCTS, DISCOVERY_SET } from '../data/products';

export default function ProductCollection({ standalone = false }) {
  const items = standalone ? [...PRODUCTS, DISCOVERY_SET] : PRODUCTS;
  return (
    <section aria-labelledby="collection-title" className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
      <div className="flex items-end justify-between gap-4">
        <Reveal>
          <Pill>Collection</Pill>
          {standalone ? (
            <h1 id="collection-title" className="mt-5 text-4xl md:text-5xl">Find Your Signature.</h1>
          ) : (
            <h2 id="collection-title" className="mt-5 text-4xl md:text-5xl">Find Your Signature.</h2>
          )}
        </Reveal>
        {!standalone && (
          <Reveal delay={0.1}><Button to="/shop" variant="outline">View All</Button></Reveal>
        )}
      </div>
      <ul className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <Reveal as="li" key={p.id} delay={(i % 3) * 0.08}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
