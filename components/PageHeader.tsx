import React, { HTMLAttributes } from 'react';

export function PageHeader({
  className,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...restProps}
      className={`header-container sticky top-0 w-full mx-auto px-2 ${
        className || ''
      }`}
    >
      <header>
        <h1 className="text-center font-extrabold sm:my-4 my-3">
          Diyorbek's Blog
        </h1>
      </header>
      <div className="header-leveler pointer-events-none absolute left-2 right-2 z-10 rounded-t-full"></div>
    </div>
  );
}
