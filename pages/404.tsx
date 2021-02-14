import Head from 'next/head';
import Link from 'next/link';
import { PageContainer } from '../components/PageContainer';

export default function NotFoundPage() {
  return (
    <PageContainer>
      <Head>
        <title>Page not found | Diyorbek's Blog</title>
      </Head>

      <div className="flex justify-center items-center flex-col w-screen">
        <h1 className="text-5xl">404</h1>
        <p>
          Got lost? Lest go{' '}
          <Link href="/">
            <a>home</a>
          </Link>
          !
        </p>
      </div>
    </PageContainer>
  );
}
