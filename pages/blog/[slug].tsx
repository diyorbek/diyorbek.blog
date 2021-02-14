import Head from 'next/head';
import { useMemo } from 'react';
import { PageContainer } from '../../components/PageContainer';
import ParseHTML from 'html-react-parser';
import { ArticleDTO, getArticle } from '../../database/Article';
import { formatDate } from '../../utils/dateUtils';

export default function BlogPost({ post }: { post: ArticleDTO }) {
  const content = useMemo(() => {
    return ParseHTML(post.content);
  }, [post.content]);

  return (
    <>
      <Head>
        <title>{post.title} | Diyorbek's Blog</title>
      </Head>

      <PageContainer>
        <div className="max-w-2xl mx-auto mb-8 px-2">
          <div className="mb-8">
            <h1 className="mb-2">{post.title}</h1>
            <span className="text-gray-400">{formatDate(post.createdAt)}</span>
          </div>

          <div className="grid grid-cols-1 gap-2">{content}</div>
        </div>
      </PageContainer>
    </>
  );
}

export async function getServerSideProps({ params }: any) {
  const article = await getArticle(params.slug);

  return {
    props: {
      post: JSON.parse(JSON.stringify(article)),
    },
  };
}
