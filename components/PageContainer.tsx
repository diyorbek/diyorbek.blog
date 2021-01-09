import React, { PropsWithChildren, HTMLAttributes, ReactNode } from 'react';
import { PageHeader } from './PageHeader';

export function PageContainer({
  children,
  className,
  header = <PageHeader />,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  header?: ReactNode;
}) {
  return (
    <div {...restProps} className="flex flex-col min-h-screen mx-auto">
      {header}

      <div className="flex-1 flex px-2">{children}</div>
    </div>
  );
}
