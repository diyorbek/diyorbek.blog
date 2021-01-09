import React, { HTMLAttributes, useEffect, useRef } from 'react';
import { Bulb } from './icons/Bulb';
import { HalfMoon } from './icons/HalfMoon';

export function PageHeader({
  className,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const toggleHeaderShadow = () => {
      if (headerRef.current) {
        if (window.scrollY > 0) {
          headerRef.current.classList.add('raised');
        } else {
          headerRef.current.classList.remove('raised');
        }
      }
    };

    window.addEventListener('scroll', toggleHeaderShadow);

    return () => window.removeEventListener('scroll', toggleHeaderShadow);
  }, []);

  return (
    <div
      {...restProps}
      ref={headerRef}
      className={`header-container z-10 sticky top-0 w-full mx-auto px-4 ${
        className || ''
      }`}
    >
      <header className="max-w-4xl m-auto sm:py-4 py-3 flex justify-between items-center">
        <h1 className="sm:text-2xl text-lg font-extrabold">Diyorbek's Blog</h1>

        <div className="dark-mode-button rounded-full p-2">
          <HalfMoon className="text-lg sm:text-xl transform rotate-45" />
        </div>
      </header>
    </div>
  );
}
