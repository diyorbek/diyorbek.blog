import Head from 'next/head';
import React from 'react';
import { PageContainer } from '../../components/PageContainer';

export default function Blog() {
  return (
    <>
      <Head>
        <title>Recent Blogs | Diyorbek's Blog</title>
      </Head>

      <PageContainer>
        <div className="max-w-3xl mx-auto mb-8 px-2">
          <h1 className="text-4xl text-left font-bold my-6 text-gray-700 dark:text-gray-300">
            Recent Blogs
          </h1>
        </div>
      </PageContainer>
    </>
  );
}
