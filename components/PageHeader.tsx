import Head from 'next/head';
import React, { HTMLAttributes, useEffect, useRef } from 'react';
import { HalfMoon } from './icons/HalfMoon';

export function PageHeader({
  className,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) {
  const headerRef = useRef<HTMLDivElement | null>(null);

  const toggleDarkMode = () => {
    const html = document.querySelector('html');

    if (html) {
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
  };

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
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.querySelector('html').classList.add('dark')
            } else {
              document.querySelector('html').classList.remove('dark')
            }`,
          }}
        />
      </Head>

      <div
        {...restProps}
        ref={headerRef}
        className={`header-container z-10 sticky top-0 w-full mx-auto px-4 ${
          className || ''
        }`}
      >
        <header className="max-w-4xl m-auto sm:py-4 py-3 flex justify-between items-center">
          <a href="/">
            <h1 className="sm:text-2xl text-lg font-extrabold text-gray-500 dark:text-gray-300">
              Diyorbek's Blog
            </h1>
          </a>

          <button
            onClick={toggleDarkMode}
            className="dark-mode-button text-gray-400 hover:text-yellow-400 focus:text-yellow-400  rounded-full p-2"
          >
            <HalfMoon className="text-lg sm:text-xl transition-all transform rotate-45" />
          </button>
        </header>
      </div>
    </>
  );
}
