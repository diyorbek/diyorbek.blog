import Head from 'next/head';
import { useMemo } from 'react';
import { PageContainer } from '../../components/PageContainer';
import ParseHTML from 'html-react-parser';

export default function BlogPost() {
  // const post = useMemo(() => {
  //   return ParseHTML(localStorage.getItem('blog') || '');
  // }, []);

  return (
    <>
      <Head>
        <title>Recent Blogs | Diyorbek's Blog</title>
      </Head>

      <PageContainer>
        <div className="max-w-2xl mx-auto mb-8 px-2">
          <div className="mb-8">
            <h1 className="mb-2">Blogs Title Here</h1>
            <span className="text-gray-400">Feb 3, 2021</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <p>
              Want to hear from us when we add new components? Sign up for our
              newsletter and we'll <b>email</b> you <strong>every time</strong>{' '}
              we release a new batch of components.
            </p>
            <p>
              <em>Want to hear from us</em> when we add new components? Sign up
              for our newsletter and we'll email you every time we release a new
              batch of components.
            </p>
            <p>
              Want to hear from us when we add new components? Sign up for our
              newsletter and we'll email you every time we release a new batch
              of components.
            </p>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
