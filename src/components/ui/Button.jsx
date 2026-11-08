import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50';
const variants = {
  primary: 'bg-ink px-5 py-2.5 min-h-[44px] text-white hover:bg-neutral-700',
  outline: 'border border-ink/70 px-4 py-2 min-h-[40px] text-ink hover:bg-ink hover:text-white',
};

export default function Button({ to, href, variant = 'primary', arrow = true, className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return <button className={cls} {...rest}>{content}</button>;
}
