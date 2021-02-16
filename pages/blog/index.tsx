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

export async function getStaticProps() {
  // await connectDB();
  // const articles = await getArticlesList();

  return {
    props: {
      posts: JSON.parse(
        JSON.stringify([
          {
            _id: '60287b49af7d0c6881844c7b',
            contentPreview:
              "If you want to render the built-in error page you can by importing the Error component:\nimport Error from 'next/error'\n\nexport async function getServe",
            createdAt: '2021-02-14T01:22:17.196Z',
            slug: 'new-blog-here',
            title: 'New Blog Here',
          },
          {
            _id: '6028685eaf7d0c6881844c7a',
            contentPreview:
              'OoOOkau 77 of child schemas (from document arrays and single nested subdocs) and their corresponding compiled models. Each element of the array is an',
            createdAt: '2021-02-14T00:01:34.831Z',
            slug: 'test-post-22',
            title: 'Test post 22',
          },
          {
            _id: '602867f9af7d0c6881844c79',
            contentPreview:
              'Array of child schemas (from document arrays and single nested subdocs) and their corresponding compiled models. Each element of the array is an objec',
            createdAt: '2021-02-13T23:59:53.260Z',
            slug: 'test-post',
            title: 'Test post',
          },
        ])
      ),
    },
  };
}
