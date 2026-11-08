import Reveal from './ui/Reveal';
import Button from './ui/Button';
import SmartImage from './ui/SmartImage';

export default function PromoBanner() {
  return (
    <section aria-labelledby="promo-title" className="mx-auto max-w-page px-5 py-10 md:px-8">
      <Reveal className="relative overflow-hidden rounded-2xl bg-[#e6e6e4]">
        <SmartImage src="/assets/banner.jpg" alt="" className="!absolute inset-0 !bg-transparent" imgClassName="object-cover" />
        <div className="relative px-6 py-20 text-center md:py-28">
          <h2 id="promo-title" className="mx-auto max-w-lg text-3xl leading-tight md:text-[40px]">
            Find the Scent That <span className="text-muted">Becomes Yours.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted">Try all five fragrances with the Odour Elixirs Discovery Set.</p>
          <div className="mt-6"><Button to="/discovery-set">Shop the Set</Button></div>
        </div>
      </Reveal>
    </section>
  );
}
