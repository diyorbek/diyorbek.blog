import Head from 'next/head';
import { useMemo } from 'react';
import { PageContainer } from '../../components/PageContainer';
import ParseHTML from 'html-react-parser';
import { ArticleDTO, getArticle } from '../../database/Article';
import { formatDate } from '../../utils/dateUtils';
import NotFoundPage from '../404';
import { connectDB } from '../../database/connect';

export default function BlogPost({ post }: { post: ArticleDTO | null }) {
  const content = useMemo(() => {
    return post ? ParseHTML(post.content) : '';
  }, [post?.content]);

  if (!post) {
    return <NotFoundPage />;
  }

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

          <div className="blog-content">{content}</div>
        </div>
      </PageContainer>
    </>
  );
}

export async function getServerSideProps({ params }: any) {
  await connectDB();
  const article = await getArticle(params.slug);

  return {
    props: {
      post: JSON.parse(JSON.stringify(article)),
    },
  };
}
