import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Pill from './ui/Pill';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import { FAQS } from '../data/faq';
import { SITE } from '../data/site';

function Item({ q, a, open, onToggle }) {
  const id = useId();
  return (
    <div className="rounded-xl bg-surface">
      <h3 className="font-sans text-[15px]">
        <button type="button" id={`${id}-btn`} aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle} className="flex min-h-[48px] w-full items-center justify-between gap-4 px-4 py-3 text-left">
          {q}
          <ChevronDown size={16} aria-hidden="true" className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-sm leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section aria-labelledby="faq-title" className="mx-auto max-w-page px-5 py-20 text-center md:px-8 md:py-28">
      <Reveal><Pill>FAQs</Pill></Reveal>
      <Reveal as="h2" id="faq-title" delay={0.06} className="mt-5 text-3xl md:text-[44px]">
        A Few Things <span className="text-muted">Worth Knowing.</span>
      </Reveal>
      <Reveal as="p" delay={0.12} className="mx-auto mt-4 max-w-[300px] text-sm text-muted">
        Here are the most common questions customers ask before buying from us.
      </Reveal>
      <Reveal delay={0.18} className="mt-5"><Button href={SITE.whatsappUrl} variant="outline">Get In Touch</Button></Reveal>
      <Reveal delay={0.1} className="mx-auto mt-10 flex max-w-[620px] flex-col gap-2 text-left">
        {FAQS.map((f, i) => (
          <Item key={f.q} q={f.q} a={f.a} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
        ))}
      </Reveal>
    </section>
  );
}
