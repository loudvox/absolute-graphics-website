import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface MarqueeProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  duration?: number;
  className?: string;
  contentClassName?: string;
}

export function Marquee({ 
  children, 
  direction = 'left', 
  duration = 30, 
  className = '',
  contentClassName = ''
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const targets = containerRef.current.querySelectorAll('.marquee-content');
    const tl = gsap.timeline({ repeat: -1 });
    
    if (direction === 'left') {
      tl.to(targets, { xPercent: -100, duration, ease: "none", force3D: true });
    } else {
      tl.to(targets, { xPercent: 0, duration, ease: "none", startAt: { xPercent: -100 }, force3D: true });
    }

    return () => { tl.kill(); };
  }, [direction, duration]);

  return (
    <div className={`marquee-wrapper ${className}`} ref={containerRef} style={{ backfaceVisibility: 'hidden' }}>
      {[...Array(4)].map((_, i) => (
        <div 
          key={i} 
          className={`marquee-content will-change-transform ${contentClassName}`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
