import Journal from '../components/Journal';
import useSEO from '../hooks/useSEO';

export default function JournalPage() {
  useSEO('Journal', 'Fragrance guides and stories from Odour Elixirs.');
  return <Journal standalone />;
}
