import { useState } from 'react';
import { Link } from 'react-router-dom';

// Put your ORIGINAL logo file at public/assets/logo.png (or change this path). It is never modified.
export const LOGO_SRC = '/assets/logo.png';

export default function Logo({ className = 'h-9' }) {
  const [failed, setFailed] = useState(false);
  return (
    <Link to="/" aria-label="Odour Elixirs — home" className="inline-flex items-center">
      {failed ? (
        // Temporary text stand-in shown ONLY until your logo file exists.
        <span className="font-serif text-2xl italic leading-none">Odour Elixirs</span>
      ) : (
        <img src={LOGO_SRC} alt="Odour Elixirs" className={`${className} w-auto`} onError={() => setFailed(true)} />
      )}
    </Link>
  );
}
