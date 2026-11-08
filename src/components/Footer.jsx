import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';
import Logo from './ui/Logo';
import { SITE } from '../data/site';
import { PRODUCTS } from '../data/products';

const col = 'text-sm text-muted transition-colors hover:text-ink';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-line">
      <div className="mx-auto max-w-page px-5 pt-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-[240px] text-sm text-muted">Fragrances designed to become part of your signature.</p>
            <div className="mt-4 flex gap-2">
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${SITE.instagramHandle}`} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface"><Instagram size={16} /></a>
              <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${SITE.whatsappDisplay}`} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface"><MessageCircle size={16} /></a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8">
            <div>
              <h3 className="font-sans text-sm font-medium">Main Pages</h3>
              <ul className="mt-4 space-y-3">
                <li><Link className={col} to="/">Home</Link></li>
                <li><Link className={col} to="/shop">Store</Link></li>
                <li><Link className={col} to="/journal">Blog</Link></li>
                <li><Link className={col} to="/info/our-methods">Our Methods</Link></li>
                <li><a className={col} href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-sm font-medium">Shop</h3>
              <ul className="mt-4 space-y-3">
                {PRODUCTS.map((p) => <li key={p.id}><Link className={col} to={`/product/${p.slug}`}>{p.name}</Link></li>)}
                <li><Link className={col} to="/discovery-set">Discovery Set</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-sm font-medium">Contact</h3>
              <ul className="mt-4 space-y-3">
                <li><a className={col} href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {SITE.instagramHandle}</a></li>
                <li><a className={col} href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsappDisplay}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-sm font-medium">Information</h3>
              <ul className="mt-4 space-y-3">
                <li><Link className={col} to="/info/shipping-returns">Shipping &amp; Returns</Link></li>
                <li><Link className={col} to="/info/privacy">Privacy Policy</Link></li>
                <li><Link className={col} to="/info/terms">Terms &amp; Conditions</Link></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line py-5 text-xs sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Odour Elixirs. All rights reserved.</span>
          <span className="text-muted">{SITE.instagramHandle}</span>
        </div>

        <p aria-hidden="true" className="select-none overflow-hidden whitespace-nowrap pt-6 text-center font-serif uppercase leading-[0.95] tracking-tight text-[11.4vw] min-[1200px]:text-[128px]"
          style={{ background: 'linear-gradient(180deg,#6f6f6f 0%,#c8c8c8 55%,#ffffff 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          Odour Elixirs
        </p>
      </div>
    </footer>
  );
}
