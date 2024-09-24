import hljs from 'highlight.js';
import { PropsWithChildren, useEffect, useRef } from 'react';

export function SyntaxHighlightedCode(
  props: PropsWithChildren<{ className: string }>
) {
  const ref = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    if (ref.current && hljs) {
      hljs.highlightElement(ref.current);
    }
  }, [props.children]);

  return (
    // @ts-ignore
    <pre {...props} className={props.children?.props?.className} ref={ref} />
  );
}
