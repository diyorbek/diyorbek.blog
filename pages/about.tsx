import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { PageContainer } from '../components/PageContainer';

export default function About() {
  return (
    <>
      <Head>
        <title>About | Diyorbek's Blog</title>
      </Head>

      <PageContainer>
        <div className="about-page max-w-2xl mx-auto mb-8 px-2">
          <h1 className="text-center">About Me</h1>

          <p>Hello! My name is Diyorbek Sadullaev. For friends just Diyor.</p>

          <p>
            I am a 23-year-old frontend developer who's in love with the whole
            JavaScript ecosystem. Currently living and studying in Warsaw,
            Poland.
          </p>

          <p>
            I hate marketing/branding myself as I am a humble person. But here
            we are, on my personal website's about page where I try to tell the
            whole world how awesome I am. 💪
          </p>

          <p>
            At the age of 18, I made the decision that I am always going to be
            proud of myself for that: I decided to become a programmer. That was
            a bold decision for a guy{' '}
            <strong>who didn't even own a computer!</strong>
          </p>

          <p>
            I could buy my own laptop (a used one) only after a year. And guess
            what, I earned money for it by building websites on library
            computers having only a small <em>pen drive</em> with my text editor
            and projects in it!
          </p>

          <p>
            Then in that year I got my first job as a frontend developer and
            started my career in IT.
          </p>

          <p>
            I have skipped a lot of stories above because I am a bit lazy to
            write them all. The quick recap of all you can find in my{' '}
            <Link href="/cv">résumé</Link>. 😬
          </p>
        </div>
      </PageContainer>
    </>
  );
}
