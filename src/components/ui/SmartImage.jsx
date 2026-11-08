import { useState } from 'react';

/** Image with fixed aspect ratio (no layout shift) and a neutral fallback if the asset is missing. */
export default function SmartImage({ src, alt, ratio, className = '', imgClassName = 'object-cover', eager = false, ...rest }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center p-3 text-center text-xs text-muted">{alt}</div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchpriority={eager ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full ${imgClassName}`}
          {...rest}
        />
      )}
    </div>
  );
}
