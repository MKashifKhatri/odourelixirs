import { motion, useReducedMotion } from 'framer-motion';

/** Fade + slide-up + blur-to-sharp reveal (matches the reference). Transform/opacity/filter only. */
export default function Reveal({ as = 'div', delay = 0, y = 24, blur = true, className = '', children, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
