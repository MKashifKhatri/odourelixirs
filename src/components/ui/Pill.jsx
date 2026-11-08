export default function Pill({ children, className = '' }) {
  return <span className={`inline-flex items-center rounded-full bg-surface px-3 py-1 text-[13px] text-ink ${className}`}>{children}</span>;
}
