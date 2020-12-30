import React, { PropsWithChildren, HTMLAttributes } from 'react';
import { PageHeader } from './PageHeader';

export function PageContainer({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      {...restProps}
      className="max-w-4xl flex flex-col min-h-screen mx-auto"
    >
      <PageHeader />

      <div className="flex-1 flex px-2">{children}</div>
    </div>
  );
}
