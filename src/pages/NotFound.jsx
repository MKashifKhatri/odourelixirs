import Button from '../components/ui/Button';
import useSEO from '../hooks/useSEO';

export default function NotFound() {
  useSEO('Page not found');
  return (
    <div className="mx-auto max-w-page px-5 py-32 text-center">
      <h1 className="text-5xl">Page not found.</h1>
      <p className="mt-3 text-sm text-muted">The page you are looking for does not exist.</p>
      <div className="mt-6"><Button to="/">Back home</Button></div>
    </div>
  );
}
