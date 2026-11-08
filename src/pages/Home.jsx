import Hero from '../components/Hero';
import BrandIntroduction from '../components/BrandIntroduction';
import ProductCollection from '../components/ProductCollection';
import DiscoverySection from '../components/DiscoverySection';
import FragrancePhilosophy from '../components/FragrancePhilosophy';
import FAQ from '../components/FAQ';
import PromoBanner from '../components/PromoBanner';
import Journal from '../components/Journal';
import useSEO from '../hooks/useSEO';

export default function Home() {
  useSEO('The Art of Leaving a Trace', 'Odour Elixirs — fragrances designed to become part of your signature. Explore the collection and the Discovery Set.');
  return (
    <>
      <Hero />
      <BrandIntroduction />
      <ProductCollection />
      <DiscoverySection />
      <FragrancePhilosophy />
      <FAQ />
      <PromoBanner />
      <Journal />
    </>
  );
}
