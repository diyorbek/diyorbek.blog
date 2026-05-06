import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { PageContainer } from '../../components/PageContainer';
import { ListArticleDTO } from '../../database/Article';
import { formatDate } from '../../utils/dateUtils';
import { getMarkdownArticles } from '../../utils/getMarkdownArticles';

interface BlogProps {
  posts: ListArticleDTO[];
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

          <blockquote>
            <i>
              My blog posts are written in Uzbek. There are a lot information
              available in English on the internet. My motivation is to generate
              more content in my native language so it can benefit Uzbek
              audience.
            </i>
          </blockquote>

          <div className="article-list grid grid-cols-1 gap-2">
            {posts.length > 0 ? (
              posts.map(({ slug, title, contentPreview, publishDate }) => (
                <Link href={`/blog/${slug}`} key={slug}>
                  <a className="hover:no-underline text-gray-700 hover:text-sky-600 dark:text-gray-200 dark:hover:text-sky-400">
                    <span className="text-gray-400">
                      {formatDate(publishDate)}
                    </span>

                    <h3 className="mt-2">{title}</h3>

                    <p className="text-gray-600 italic dark:text-gray-400 mb-4">
                      {contentPreview}...
                    </p>

                    {/* <Tag>React</Tag> */}

                    <div className="divider my-4" />
                  </a>
                </Link>
              ))
            ) : (
              <h2 className="mt-24 text-stone-400 text-center">No articles</h2>
            )}
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogProps, any> = async (ctx) => {
  const files = await getMarkdownArticles();
  const posts = files
    // @ts-ignore
    .toSorted((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  return {
    revalidate: 1,
    props: { posts },
  };
};
