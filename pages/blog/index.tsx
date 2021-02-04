import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { PageContainer } from '../../components/PageContainer';

export default function Blog() {
  return (
    <>
      <Head>
        <title>Recent Blogs | Diyorbek's Blog</title>
      </Head>

      <PageContainer>
        <div className="max-w-2xl mx-auto mb-8 px-2">
          <h1 className="text-center">Recent Blogs</h1>

          <div className="grid grid-cols-1 gap-2">
            {[...new Array(17)].map((_, i) => (
              <Link href="/blog/we-are">
                <a
                  key={i}
                  className="hover:no-underline text-gray-700 hover:text-lightBlue-600 dark:text-gray-200 dark:hover:text-lightBlue-400"
                >
                  <span className="text-gray-400">Feb 3, 2021</span>

                  <h3 className="mt-2">We've got more coming...</h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Want to hear from us when we add new components? Sign up for
                    our newsletter and we'll email you every time we release a
                    new batch of components.
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
