import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { PageContainer } from '../../components/PageContainer';
import { ArticleDTO, getArticlesList } from '../../database/Article';
import { connectDB } from '../../database/connect';
import { formatDate } from '../../utils/dateUtils';

interface BlogProps {
  posts: ArticleDTO[];
}

export default function Blog({ posts }: BlogProps) {
  return (
    <>
      <Head>
        <title>Recent Blogs | Diyorbek's Blog</title>
      </Head>

      <PageContainer>
        <div className="max-w-2xl mx-auto mb-8 px-2">
          <h1 className="text-center">Recent Blogs</h1>

          <div className="article-list grid grid-cols-1 gap-2">
            {posts.map(({ _id, slug, title, contentPreview, createdAt }) => (
              <Link href={`/blog/${slug}`} key={_id}>
                <a className="hover:no-underline text-gray-700 hover:text-lightBlue-600 dark:text-gray-200 dark:hover:text-lightBlue-400">
                  <span className="text-gray-400">{formatDate(createdAt)}</span>

                  <h3 className="mt-2">{title}</h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {contentPreview}...
                  </p>

                  {/* <Tag>React</Tag> */}

                  <div className="divider my-4" />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogProps, any> = async (ctx) => {
  await connectDB();
  const articles = await getArticlesList();

  return {
    revalidate: 1,
    props: {
      posts: JSON.parse(JSON.stringify(articles)),
    },
  };
};
