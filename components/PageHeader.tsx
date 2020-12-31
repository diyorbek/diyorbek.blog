import React, { HTMLAttributes, useEffect, useRef } from 'react';

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
      <header className="max-w-4xl m-auto">
        <h1 className="sm:text-2xl text-lg font-extrabold sm:my-4 my-3">
          Diyorbek's Blog
        </h1>
      </header>
    </div>
  );
}
