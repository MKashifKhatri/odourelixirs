import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import Logo from './ui/Logo';
import Button from './ui/Button';
import { NAV_LINKS } from '../data/site';
import { useCart } from '../context/CartContext';

const linkCls = 'text-sm text-muted transition-colors hover:text-ink';

function NavItem({ item, className = linkCls, onClick }) {
  if (item.href) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>{item.label}</a>;
  }
  return (
    <NavLink to={item.to} onClick={onClick} className={({ isActive }) => `${className} ${isActive ? '!text-ink' : ''}`}>
      {item.label}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[64px] max-w-page items-center justify-between px-5 md:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => <NavItem key={l.label} item={l} />)}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/cart" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`} className="relative flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-surface">
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-medium text-white">{count}</span>
            )}
          </Link>
          <Button to="/shop" variant="outline" className="hidden sm:inline-flex">Shop</Button>
          <button type="button" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-drawer" onClick={() => setOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface md:hidden">
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="overlay" className="fixed inset-0 z-50 bg-black/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed right-0 top-0 z-[60] flex h-full w-[82%] max-w-sm flex-col bg-white p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface">
                  <X size={20} />
                </button>
              </div>
              <nav aria-label="Mobile" className="mt-10 flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <NavItem key={l.label} item={l} className="py-3 font-serif text-3xl text-ink" onClick={() => setOpen(false)} />
                ))}
                <NavItem item={{ label: 'Cart', to: '/cart' }} className="py-3 font-serif text-3xl text-ink" />
              </nav>
              <div className="mt-auto"><Button to="/shop" className="w-full">Shop</Button></div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
