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
            'text-md',
            'text-center',
            'font-bold',
            'font-medium',
            'text-lightBlue-500',
            'hover:text-lightBlue-500',
            'dark:text-lightBlue-400',
            'dark:hover:text-lightBlue-400',
            'focus:outline-none',
          ].join(' ') +
          ' ' +
          (className || '')
        }
      />
    </Link>
  );
}
