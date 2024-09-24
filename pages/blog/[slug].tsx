import ParseHTML from 'html-react-parser';
import Markdown from 'markdown-to-jsx';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useMemo } from 'react';
import { PageContainer } from '../../components/PageContainer';
import { SyntaxHighlightedCode } from '../../components/SyntaxHighlightedCode';
import {
  ArticleDTO,
  getArticle,
  getArticlesList,
} from '../../database/Article';
import { connectDB } from '../../database/connect';
import { formatDate } from '../../utils/dateUtils';
import { findImageURL } from '../../utils/findImageURL';
import {
  getMarkdownArticle,
  getMarkdownArticleFiles,
  getMarkdownArticles,
} from '../../utils/getMarkdownArticles';
import NotFoundPage from '../404';

interface Props {
  post: ArticleDTO | null;
  isMarkdown?: boolean;
}

export default function BlogPost({ post, isMarkdown }: Props) {
  const content = useMemo(
    () => (post && !isMarkdown ? ParseHTML(post.content) : ''),
    [post?.content, isMarkdown]
  );

  const captionImageURL = useMemo(
    () => post && findImageURL(post.content),
    [post]
  );

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
        <meta property="og:site_name" content="Diyorbek's Blog" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.contentPreview + '...'} />

        {captionImageURL && (
          <meta property="og:image" content={captionImageURL} />
        )}
      </Head>

      <PageContainer>
        <div className="max-w-2xl mx-auto mb-8 px-2">
          <div className="mb-6">
            <h1 className="mb-2">{post.title}</h1>
            <span className="text-gray-400">
              {formatDate(post.publishDate)}
            </span>
          </div>

          <div className="blog-content">
            {isMarkdown ? (
              <Markdown
                options={{
                  overrides: {
                    pre: SyntaxHighlightedCode,
                  },
                }}
              >
                {post.content}
              </Markdown>
            ) : (
              content
            )}
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export async function getStaticPaths() {
  await connectDB();
  const articles = await getArticlesList();
  const markdownArticles = await getMarkdownArticles({ listedOnly: false });

  const paths = articles.concat(markdownArticles).map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps<Props, any> = async (ctx) => {
  const markdownArticles = await getMarkdownArticleFiles();

  if (markdownArticles.includes(ctx.params.slug + '.md'))
    return {
      revalidate: 1,
      props: {
        post: await getMarkdownArticle(ctx.params.slug + '.md'),
        isMarkdown: true,
      },
    };

  await connectDB();
  const article = await getArticle(ctx.params.slug);

  return {
    revalidate: 1,
    props: {
      post: JSON.parse(JSON.stringify(article)),
    },
  };
};
