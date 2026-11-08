import Pill from './ui/Pill';
import Reveal from './ui/Reveal';

export default function BrandIntroduction() {
  return (
    <section aria-labelledby="about-title" className="mx-auto max-w-page px-5 py-24 md:px-8 md:py-40">
      <div className="grid gap-8 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <Pill><span id="about-title">About Us</span></Pill>
        </Reveal>
        <Reveal as="p" delay={0.1} className="text-[22px] leading-[1.35] md:col-span-7 md:text-[28px]">
          We believe fragrance should be personal. Thoughtfully chosen. Effortlessly memorable.
          <br />
          At <span className="text-muted">Odour Elixirs</span>, every scent has its own character. Designed to express yours.
        </Reveal>
      </div>
    </section>
  );
}
