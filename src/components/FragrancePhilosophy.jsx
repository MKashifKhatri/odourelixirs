import { motion, useReducedMotion } from 'framer-motion';
import Pill from './ui/Pill';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import SmartImage from './ui/SmartImage';
import { PRODUCTS, DISCOVERY_SET } from '../data/products';

const COUNT = 14;
const RATIO = 16 / 11; // container width / height
const R = 44; // arc radius, % of container width
const CX = 50;
const CY = 74; // % of container height

// Cycles through your real product images — replace with dedicated photography via src/data if desired.
const POOL = [...PRODUCTS, DISCOVERY_SET];
const circles = Array.from({ length: COUNT }, (_, i) => {
  const angle = Math.PI * (1.06 - (i / (COUNT - 1)) * 1.12); // slightly past horizontal both sides
  return {
    id: i,
    left: CX + R * Math.cos(angle),
    top: CY - R * Math.sin(angle) * RATIO,
    product: POOL[i % POOL.length],
  };
});

export default function FragrancePhilosophy() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="philosophy-title" className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-24">
      {/* Mobile: compact circle row */}
      <ul className="mb-10 flex flex-wrap justify-center gap-3 md:hidden" aria-hidden="true">
        {circles.slice(0, 8).map((c) => (
          <li key={c.id} className="h-14 w-14 overflow-hidden rounded-full bg-surface">
            <SmartImage src={c.product.image} alt="" ratio="1 / 1" imgClassName="object-cover" />
          </li>
        ))}
      </ul>

      <div className="relative md:aspect-[16/11]">
        {/* Desktop/tablet: arch */}
        <ul className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
          {circles.map((c, i) => (
            <motion.li
              key={c.id}
              className="absolute aspect-square w-[8.5%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-surface shadow-sm"
              style={{ left: `${c.left}%`, top: `${c.top}%` }}
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <SmartImage src={c.product.image} alt="" ratio="1 / 1" imgClassName="object-cover" />
            </motion.li>
          ))}
        </ul>

        <div className="mx-auto text-center md:absolute md:left-1/2 md:top-[68%] md:w-[34%] md:-translate-x-1/2 md:-translate-y-1/2">
          <Reveal><Pill>Our Philosophy</Pill></Reveal>
          <Reveal as="h2" id="philosophy-title" delay={0.08} className="mt-5 text-4xl leading-[1.1] md:text-[38px] lg:text-[44px]">
            Made to Be Remembered.
          </Reveal>
          <Reveal as="p" delay={0.14} className="mx-auto mt-4 max-w-[280px] text-sm text-muted">
            Five distinct fragrances. Each with its own character. Find the one that becomes yours.
          </Reveal>
          <Reveal delay={0.2} className="mt-6"><Button to="/shop">Explore Collection</Button></Reveal>
        </div>
      </div>
    </section>
  );
}
