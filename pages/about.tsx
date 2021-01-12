import Head from 'next/head';
import React from 'react';
import { PageContainer } from '../components/PageContainer';

export default function About() {
  return (
    <>
      <Head>
        <title>About Diyorbek Sadullaev</title>
      </Head>

      <PageContainer>
        <div className="about-page max-w-2xl mx-auto mb-8 px-2">
          <h1 className="text-4xl text-center font-bold my-6 text-gray-700 dark:text-gray-300">
            About Me
          </h1>
          <p className="mb-2">Hello! My name is Diyorbek Sadullaev.</p>
          <p className="mb-2">
            I am a 22-year-old frontend developer and I work at Super Dispatch.
            Currently living and studying in Warsaw, Poland. I love JavaScript
            and ReactJS. Building awesome applications that help and bring joy
            to users is my motto as a developer. I am a completer-finisher
            person that's why I appreciate perfectionism and follow discipline.
          </p>
          <p className="mb-2">
            I consider myself quite creative and I enjoy experimenting. That's
            why I have a little "Lab" on my personal website. Where I try out
            new things or just jam 🙂. <br />
            Also, I am also passionate about UI design and building
            inspirational user interface elements.
          </p>
          <p className="mb-2">
            I am very interested in open-source software development. In order
            to become a part of the community, I try to contribute to
            open-source projects on GitHub either by opening an issue or sending
            pull requests.
          </p>
          <p className="mb-2">
            I always try to help my peers by sharing my humble knowledge and
            experience. Because one can improve and reinforce their own
            knowledge by sharing.
          </p>
        </div>
      </PageContainer>
    </>
  );
}
