import Quill from 'quill';

const CodeBlock = Quill.import('formats/code-block');

export class CodeBlot extends CodeBlock {
  static create(value: any) {
    const domNode = super.create(value) as HTMLElement;

    domNode.classList.add('hljs');

    return domNode;
  }
}

CodeBlot.blotName = 'code-block';
