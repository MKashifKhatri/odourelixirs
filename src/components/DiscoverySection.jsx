import { Link } from 'react-router-dom';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import SmartImage from './ui/SmartImage';
import { DISCOVERY_SET } from '../data/products';
import { formatINR } from '../lib/format';

export default function DiscoverySection() {
  return (
    <section aria-labelledby="discovery-title" className="mx-auto max-w-page px-5 py-20 text-center md:px-8 md:py-32">
      <Reveal>
        <span className="inline-flex rounded-full bg-surface px-3 py-1 text-[13px] uppercase tracking-wide">Discovery Set</span>
      </Reveal>
      <Reveal delay={0.08} className="mx-auto mt-8 max-w-[480px]">
        <Link to="/discovery-set" aria-label="View the Discovery Set" className="group block overflow-hidden rounded-xl">
          <SmartImage src={DISCOVERY_SET.image} alt="Odour Elixirs Discovery Set" ratio="16 / 10" imgClassName="object-contain transition-transform duration-700 group-hover:scale-105" />
        </Link>
      </Reveal>
      <Reveal as="h2" id="discovery-title" delay={0.1} className="mt-8 text-3xl md:text-[40px]">Five Scents. One Discovery.</Reveal>
      <Reveal as="p" delay={0.15} className="mx-auto mt-3 max-w-md text-sm text-muted">
        Experience the complete Odour Elixirs collection. Find your signature.
      </Reveal>
      <Reveal as="p" delay={0.18} className="mt-3 text-sm">{formatINR(DISCOVERY_SET.price)}</Reveal>
      <Reveal delay={0.22} className="mt-5"><Button to="/discovery-set">Explore the Set</Button></Reveal>
    </section>
  );
}
