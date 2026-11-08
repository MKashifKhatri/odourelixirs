import { Link } from 'react-router-dom';
import Pill from './ui/Pill';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import SmartImage from './ui/SmartImage';
import { ARTICLES } from '../data/journal';
import { SITE } from '../data/site';

export default function Journal({ standalone = false }) {
  const Heading = standalone ? 'h1' : 'h2';
  return (
    <section aria-labelledby="journal-title" className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
      <div className="flex items-end justify-between gap-4">
        <Reveal>
          <Pill>Journal</Pill>
          <Heading id="journal-title" className="mt-5 text-4xl md:text-5xl">Beyond the Bottle.</Heading>
        </Reveal>
        <Reveal delay={0.1}><Button href={SITE.instagramUrl} variant="outline">Follow Us</Button></Reveal>
      </div>
      <ul className="mt-10 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((a, i) => (
          <Reveal as="li" key={a.slug} delay={(i % 3) * 0.08}>
            <Link to={`/journal/${a.slug}`} className="group block overflow-hidden rounded-xl bg-surface">
              <div className="overflow-hidden">
                <SmartImage src={a.image} alt={a.title} ratio="4 / 3" imgClassName="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <span className="inline-flex rounded-full bg-white px-3 py-1 text-[12px]">{a.category}</span>
                <h3 className="mt-3 font-serif text-xl leading-snug">{a.title}</h3>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
