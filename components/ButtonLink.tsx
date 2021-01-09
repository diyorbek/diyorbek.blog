import { AnchorHTMLAttributes } from 'react';

export default function ButtonLink({
  className,
  ...restProps
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...restProps}
      className={
        [
          'button-link',
          'px-4',
          'py-2',
          'rounded-full',
          'text-md',
          'text-center',
          'font-bold',
          'font-medium',
          'text-lightBlue-500',
          'dark:text-lightBlue-400',
          'focus:outline-none',
        ].join(' ') +
        ' ' +
        (className || '')
      }
    />
  );
}
