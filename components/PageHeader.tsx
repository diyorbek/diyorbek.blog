import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { HTMLAttributes, useEffect, useRef } from 'react';
import { Close } from './icons/Close';
import { HalfMoon } from './icons/HalfMoon';
import { Menu } from './icons/Menu';

const menuItems = [
  {
    pathname: '/about',
    label: 'About',
  },
  {
    pathname: '/blog',
    label: 'Blog',
  },
];

export function PageHeader({
  className,
  hasMenuList = true,
  ...restProps
}: HTMLAttributes<HTMLDivElement> & { hasMenuList?: boolean }) {
  const { pathname: currentPathname } = useRouter();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const allowHTMLScroll = () => {
    document.querySelector('html')?.classList.remove('overflow-hidden');
  };

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

  const toggleMobileMenu = () => {
    mobileMenuButtonRef.current?.classList.toggle('open');
    overlayRef.current?.classList.toggle('overlay-visible');
    document.querySelector('html')?.classList.toggle('overflow-hidden');

    if (mobileMenuRef.current) {
      if (mobileMenuButtonRef.current?.classList.contains('open')) {
        mobileMenuRef.current.style.height =
          mobileMenuRef.current.scrollHeight + 'px';
      } else {
        mobileMenuRef.current.style.height = '0px';
      }
    }

    if (window.scrollY == 0) {
      headerRef.current?.classList.toggle('raised');
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
          <Link href="/">
            <a onClick={allowHTMLScroll} className="hover:no-underline">
              <h1 className="my-0 sm:text-2xl text-xl font-extrabold text-gray-500 dark:text-gray-300">
                Diyorbek's Blog
              </h1>
            </a>
          </Link>
          {hasMenuList && (
            <>
              <div className="hidden flex-1 sm:flex justify-end items-center pr-8">
                {menuItems.map(({ pathname, label }) =>
                  currentPathname !== pathname ? (
                    <Link key={pathname} href={pathname}>
                      <a onClick={allowHTMLScroll} className="menu-item px-4">
                        {label}
                      </a>
                    </Link>
                  ) : (
                    <a key={pathname} className="menu-item active px-4">
                      {label}
                    </a>
                  )
                )}
              </div>

              <button
                ref={mobileMenuButtonRef}
                onClick={toggleMobileMenu}
                className="sm:hidden menu-button text-gray-400 hover:text-gray-600 dark:hover:text-gray-50 rounded-full p-2"
              >
                <Menu className="text-lg sm:text-xl transition-all" />
                <Close className="text-lg sm:text-xl transition-all" />
              </button>
            </>
          )}

          <button
            onClick={toggleDarkMode}
            className={
              'dark-mode-button text-gray-400 hover:text-yellow-400 focus:text-yellow-400  rounded-full p-2' +
              (hasMenuList ? ' hidden sm:block' : '')
            }
          >
            <HalfMoon className="text-lg sm:text-xl transition-all transform rotate-45" />
          </button>
        </header>

        {hasMenuList && (
          <>
            <div
              ref={mobileMenuRef}
              className="mobile-menu sm:hidden transition-all"
            >
              <div className="flex flex-col px-4">
                {menuItems.map(({ pathname, label }) => (
                  <div key={pathname} className="py-2">
                    {currentPathname !== pathname ? (
                      <Link href={pathname}>
                        <a onClick={allowHTMLScroll} className="menu-item">
                          {label}
                        </a>
                      </Link>
                    ) : (
                      <a key={pathname} className="menu-item active">
                        {label}
                      </a>
                    )}
                  </div>
                ))}

                <div className="menu-divider mt-2 rounded-full bg-gray-200 dark:bg-gray-600" />

                <div className="py-4">
                  <button
                    onClick={toggleDarkMode}
                    className="dark-mode-button text-gray-400 hover:text-yellow-400 focus:text-yellow-400  rounded-full p-2"
                  >
                    <HalfMoon className="text-lg sm:text-xl transition-all transform rotate-45" />
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={overlayRef}
              onClick={toggleMobileMenu}
              className="header-overlay"
            ></div>
          </>
        )}
      </div>
    </>
  );
}
