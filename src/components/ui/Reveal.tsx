import { useEffect, useRef, useState, type ElementType, type HTMLAttributes, type ReactNode } from 'react';

type RevealTag = 'div' | 'article' | 'li' | 'header' | 'aside' | 'section';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: RevealTag;
  delay?: number;
  children: ReactNode;
}

/** Aparece suavemente quando entra na tela (desligado com "reduzir movimento"). */
export function Reveal({ as = 'div', delay = 0, className = '', style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const Tag = as as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? ' in' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
