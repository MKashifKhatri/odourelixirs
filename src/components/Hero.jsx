import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform, motion } from 'framer-motion';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import SmartImage from './ui/SmartImage';
import { PRODUCTS } from '../data/products';

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const hero = PRODUCTS[0];

  return (
    <section ref={ref} aria-labelledby="hero-title" className="mx-auto max-w-page px-5 pb-10 pt-14 text-center md:px-8 md:pt-24">
      <Reveal as="h1" id="hero-title" className="text-[34px] leading-tight sm:text-[40px] md:text-[48px]">
        The Art of Leaving a <span className="text-muted">Trace.</span>
      </Reveal>
      <Reveal as="p" delay={0.12} className="mx-auto mt-4 max-w-[300px] text-[15px] leading-snug text-muted">
        Discover fragrances designed to become part of your signature.
      </Reveal>
      <Reveal delay={0.22} className="mt-6">
        <Button to="/shop">Explore Collection</Button>
      </Reveal>
      <motion.div style={{ y }} className="mx-auto mt-12 w-[200px] sm:w-[240px] md:mt-16 md:w-[300px] lg:w-[340px]">
        <Reveal delay={0.35} y={40}>
          <SmartImage src={hero.image} alt={`${hero.name} by Odour Elixirs`} ratio="3 / 5" eager className="!bg-transparent" imgClassName="object-contain" />
        </Reveal>
      </motion.div>
    </section>
  );
}
