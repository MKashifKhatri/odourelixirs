import ProductCollection from '../components/ProductCollection';
import useSEO from '../hooks/useSEO';

export default function Shop() {
  useSEO('Store', 'Shop the Odour Elixirs fragrance collection and Discovery Set.');
  return <ProductCollection standalone />;
}
