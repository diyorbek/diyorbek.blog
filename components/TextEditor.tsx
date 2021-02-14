import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
// import type { Quill } from 'react-quill';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// (async () => {
//   if (process.browser) {
//     const Quill = ReactQuill.Quill as Quill;
//     console.log(ReactQuill);

//     if (Quill) {
//       const BlockEmbed = Quill.import('blots/block/embed');
//       const Link = Quill.import('formats/link');

//       class EmbedResponsive extends BlockEmbed {
//         static blotName = 'embed-responsive';
//         static tagName = 'DIV';
//         static className = 'embed-responsive';

//         static create(value: any) {
//           const node = super.create(value);
//           node.classList.add('embed-responsive-16by9');

//           const child = document.createElement('iframe');
//           child.setAttribute('frameborder', '0');
//           child.setAttribute('allowfullscreen', 'true');
//           child.setAttribute('src', this.sanitize(value));
//           child.classList.add('embed-responsive-item');

//           node.appendChild(child);

//           return node;
//         }

//         static sanitize(url: string) {
//           return Link.sanitize(url);
//         }

//         static value(domNode: HTMLElement) {
//           const iframe = domNode.querySelector('iframe');
//           return iframe?.getAttribute('src');
//         }
//       }

//       Quill.register(EmbedResponsive);
//     }
//   }
// })();

const editoModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'image', 'video', 'code-block', 'clean'],

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  ],
};

interface TextEditorProps {
  readonly?: boolean;
  value?: string;
  onChangeContent?: (content: string) => void;
  onChangeText?: (content: string) => void;
}

export function TextEditor({
  onChangeContent,
  onChangeText,
  ...props
}: TextEditorProps) {
  return (
    <ReactQuill
      theme="snow"
      modules={editoModules}
      placeholder="Type here..."
      onChange={(content, _delta, _source, editor) => {
        onChangeContent?.(content);
        onChangeText?.(editor.getText());
      }}
      {...props}
    />
  );
}
