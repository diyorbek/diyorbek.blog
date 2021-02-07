import Head from 'next/head';
import { useState } from 'react';
import { PageContainer } from '../../../components/PageContainer';
import { TextEditor } from '../../../components/TextEditor';

export default function EditBlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <>
      <Head>
        <title>Recent Blogs | Diyorbek's Blog</title>
      </Head>

      <PageContainer>
        <div className="max-w-2xl mx-auto mb-8 px-2">
          <div className="mb-8">
            <h1
              className="mb-2"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={({ currentTarget }) => {
                setTitle(currentTarget.innerText);
              }}
            >
              Blogs Title
            </h1>
          </div>

          <div className="mb-8">
            <TextEditor
              onChangeContent={(content) => {
                setContent(content);
              }}
            />
          </div>

          <button className="btn">Save</button>
        </div>
      </PageContainer>
    </>
  );
}
