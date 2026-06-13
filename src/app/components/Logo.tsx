interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 32, showText = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7C3AED"/>
            <stop offset="100%" stopColor="#2563EB"/>
          </linearGradient>
          <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F59E0B"/>
            <stop offset="100%" stopColor="#FCD34D"/>
          </linearGradient>
        </defs>
        {/* Shield */}
        <path d="M20 3L5 9v10c0 9 6.5 16.5 15 19 8.5-2.5 15-10 15-19V9L20 3z" fill="url(#shieldGrad)" opacity="0.15"/>
        <path d="M20 3L5 9v10c0 9 6.5 16.5 15 19 8.5-2.5 15-10 15-19V9L20 3z" fill="none" stroke="url(#shieldGrad)" strokeWidth="1.5" strokeLinejoin="round"/>
        {/* Person left */}
        <circle cx="14" cy="15" r="3" fill="url(#shieldGrad)"/>
        <path d="M8 26c0-3.3 2.7-6 6-6" stroke="url(#shieldGrad)" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Person right */}
        <circle cx="26" cy="15" r="3" fill="url(#shieldGrad)"/>
        <path d="M32 26c0-3.3-2.7-6-6-6" stroke="url(#shieldGrad)" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Handshake in center */}
        <path d="M16 22h4.5l3.5-2" stroke="url(#shieldGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 22h-4.5l-3.5-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
        <circle cx="20" cy="21" r="2" fill="url(#shieldGrad)" opacity="0.9"/>
        {/* Star */}
        <path d="M20 7.5l.9 2.7h2.8l-2.3 1.7.9 2.7-2.3-1.7-2.3 1.7.9-2.7-2.3-1.7h2.8z" fill="url(#starGrad)"/>
      </svg>
      {showText && (
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: size * 0.56, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #ffffff 0%, #C4B5FD 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          NextVaga
        </span>
      )}
    </div>
  );
}
