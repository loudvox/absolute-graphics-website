import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: any;
  href?: string;
  [key: string]: any;
}

export function MagneticButton({ 
  children, 
  className = '', 
  strength = 20, 
  as: Component = 'div', 
  ...props 
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { 
        x: x * strength / rect.width, 
        y: y * strength / rect.height, 
        duration: 0.3 
      });
    };

    const onMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    };

    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength]);

  return (
    <Component ref={btnRef} className={`magnetic ${className}`} {...props}>
      {children}
    </Component>
  );
}
