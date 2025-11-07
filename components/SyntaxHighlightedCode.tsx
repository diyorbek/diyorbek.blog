import { PropsWithChildren, useEffect, useRef } from 'react';

export function SyntaxHighlightedCode(
  props: PropsWithChildren<{ className: string }>
) {
  const ref = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    import('highlight.js').then((mod) => {
      const hljs = mod.default;

      if (ref.current && hljs) {
        hljs.highlightElement(ref.current);
      }
    });
  }, [props.children]);

  return (
    <pre
      {...props}
      // @ts-ignore
      className={props.children?.props?.className}
      ref={ref}
      style={{
        overflowX: 'auto',
        maxWidth: 'calc(100vw - 40px)',
        padding: '.5em',
      }}
    />
  );
}
