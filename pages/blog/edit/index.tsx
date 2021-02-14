import Head from 'next/head';
import { useState } from 'react';
import slugify from 'slugify';
import { PageContainer } from '../../../components/PageContainer';
import { TextEditor } from '../../../components/TextEditor';
import { ArticleDTO } from '../../../database/Article';

export default function NewBlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [textContent, setTextContent] = useState('');
  const [isListed, setIsListed] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const publish = async () => {
    setIsPublishing(true);

    const body = {
      content,
      title,
      slug: slugify(title, { lower: true, strict: true }),
      contentPreview: textContent.substring(0, 150),
      isListed,
      tags: [],
    } as Partial<ArticleDTO>;

    try {
      const response = await fetch('/api/post', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(body),
      });
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
      alert('Failed to publish article');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Diyorbek's Blog Editor</title>
      </Head>

      <PageContainer>
        <div className="max-w-3xl mx-auto mb-8 px-2">
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
              onChangeText={(text) => {
                setTextContent(text);
              }}
            />
          </div>

          <button className="btn" onClick={publish}>
            {isPublishing ? 'Publishing...' : 'Publish'}
          </button>

          <label htmlFor="show-check" className="ml-8 mr-2">
            Show on blog list
          </label>
          <input
            id="show-check"
            type="checkbox"
            checked={isListed}
            onChange={({ currentTarget }) => {
              setIsListed(currentTarget.checked);
            }}
          />
        </div>
      </PageContainer>
    </>
  );
}
