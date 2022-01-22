import { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

export default function ButtonLink({
  className,
  href,
  ...restProps
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href as string}>
      <a
        {...restProps}
        className={
          [
            'button-link',
            'hover:no-underline',
            'px-4',
            'py-2',
            'rounded-full',
            'text-lg',
            'text-center',
            'font-bold',
            'text-sky-500',
            'hover:text-sky-500',
            'dark:text-sky-400',
            'dark:hover:text-sky-400',
            'focus:outline-none',
          ].join(' ') +
          ' ' +
          (className || '')
        }
      />
    </Link>
  );
}
