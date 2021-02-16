import Head from 'next/head';
import { useState } from 'react';
import slugify from 'slugify';
import { PageContainer } from './PageContainer';
import { ArticleDTO } from '../database/Article';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false });

interface PostEditPageProps {
  edit?: boolean;
  post: Partial<ArticleDTO>;
}

export default function PostEditPage({
  post,
  edit = false,
}: PostEditPageProps) {
  const [title, setTitle] = useState(post.title || 'Blogs Title');
  const [content, setContent] = useState(post.content || '');
  const [textContent, setTextContent] = useState(post.contentPreview || '');
  const [isListed, setIsListed] = useState(post.isListed ?? true);
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
      let response;

      if (edit) {
        response = await fetch(`/api/post/${post.slug}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
          body: JSON.stringify(body),
        });
      } else {
        response = await fetch('/api/post/create', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(body),
        });
      }

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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.6.0/styles/monokai-sublime.min.css"
        />
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
              {title}
            </h1>
          </div>

          <div className="mb-8">
            <TextEditor
              value={content}
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
