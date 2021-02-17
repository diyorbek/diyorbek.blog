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

export async function getServerSideProps({ params }: any) {
  // await connectDB();
  // const article = await getArticle(params.slug);

  return {
    props: {
      post: JSON.parse(
        JSON.stringify({
          tags: [],
          isListed: true,
          _id: '60287b49af7d0c6881844c7b',
          content:
            '<p>If you want to render the built-in error page you can by importing the&nbsp;<code style="color: rgb(212, 0, 255);">Error</code>&nbsp;component:</p><pre class="ql-syntax hljs" spellcheck="false"><span class="hljs-keyword">import</span> <span class="hljs-built_in">Error</span> <span class="hljs-keyword">from</span> <span class="hljs-string">\'next/error\'</span>\n\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getServerSideProps</span>() </span>{\n  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">\'https://api.github.com/repos/vercel/next.js\'</span>)\n  <span class="hljs-keyword">const</span> errorCode = res.ok ? <span class="hljs-literal">false</span> : res.statusCode\n  <span class="hljs-keyword">const</span> json = <span class="hljs-keyword">await</span> res.json()\n\n  <span class="hljs-keyword">return</span> {\n    <span class="hljs-attr">props</span>: { errorCode, <span class="hljs-attr">stars</span>: json.stargazers_count },\n  }\n}\n\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Page</span>(<span class="hljs-params">{ errorCode, stars }</span>) </span>{\n  <span class="hljs-keyword">if</span> (errorCode) {\n    <span class="hljs-keyword">return</span> <span class="hljs-tag">&lt;<span class="hljs-name">Error</span> <span class="hljs-attr">statusCode</span>=<span class="hljs-string">{errorCode}</span> /&gt;</span>\n  }\n\n  <span class="hljs-keyword">return</span> <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Next stars: {stars}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n}\n</pre><p>The&nbsp;<code style="color: rgb(212, 0, 255);">Error</code>&nbsp;component also takes&nbsp;<code style="color: rgb(212, 0, 255);">title</code>&nbsp;as a property if you want to pass in a text message along with a&nbsp;<code style="color: rgb(212, 0, 255);">statusCode</code>.</p><p>If you have a custom&nbsp;<code style="color: rgb(212, 0, 255);">Error</code>&nbsp;component be sure to import that one instead.&nbsp;<code style="color: rgb(212, 0, 255);">next/error</code>&nbsp;exports the default component used by Next.js</p>',
          title: 'New Blog Here',
          slug: 'new-blog-here',
          contentPreview:
            "If you want to render the built-in error page you can by importing the Error component:\nimport Error from 'next/error'\n\nexport async function getServe",
          createdAt: '2021-02-14T01:22:17.196Z',
          updatedAt: '2021-02-16T10:56:52.691Z',
          __v: 0,
        })
      ),
    },
  };
}
