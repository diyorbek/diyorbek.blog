import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import ImageUploader, { saveToServer } from '../utils/imageUpload';

Quill.register('modules/imageUploader', ImageUploader);

const editoModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'image', 'video', 'code-block', 'clean'],

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  ],
  imageUploader: {
    upload: saveToServer,
  },
};

interface TextEditorProps {
  readonly?: boolean;
  value?: string;
  onChangeContent?: (content: string) => void;
  onChangeText?: (content: string) => void;
}

export default function TextEditor({
  onChangeContent,
  onChangeText,
  ...props
}: TextEditorProps) {
  return (
    <ReactQuill
      theme="snow"
      modules={editoModules}
      placeholder="Type here..."
      onChange={(content, _delta, _source, editorInstance) => {
        onChangeContent?.(content);
        onChangeText?.(editorInstance.getText());
      }}
      {...props}
    />
  );
}
