import Head from 'next/head';
import { useMemo } from 'react';
import { PageContainer } from '../../components/PageContainer';
import ParseHTML from 'html-react-parser';
import {
  ArticleDTO,
  getArticle,
  getArticlesList,
} from '../../database/Article';
import { formatDate } from '../../utils/dateUtils';
import NotFoundPage from '../404';
import { connectDB } from '../../database/connect';
import { GetStaticProps } from 'next';

interface Props {
  post: ArticleDTO | null;
}

export default function BlogPost({ post }: Props) {
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.6.0/styles/monokai-sublime.min.css"
        />
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

export async function getStaticPaths() {
  await connectDB();
  const articles = await getArticlesList();

  const paths = articles.map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps<Props, any> = async (ctx) => {
  await connectDB();
  const article = await getArticle(ctx.params.slug);

  return {
    revalidate: 1,
    props: {
      post: JSON.parse(JSON.stringify(article)),
    },
  };
};
