import Head from 'next/head';
import React from 'react';
import Avatar from '../components/Avatar';
import ButtonLink from '../components/ButtonLink';
import { GitHub } from '../components/icons/GitHub';
import { LinkedIn } from '../components/icons/LinkedIn';
import { StackOverflow } from '../components/icons/StackOverflow';
import { PageContainer } from '../components/PageContainer';

export default function Home() {
  return (
    <PageContainer>
      <Head>
        <title>Diyorbek's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="home-page flex flex-1 flex-col items-center justify-center py-4">
        <div id="avatar-container" className="mb-4">
          <Avatar id="avatar" className="object-cover rounded-full" />
        </div>

        <div className="relative sm:mb-2 mb-0">
          <h1 className="full-name sm:text-4xl text-2xl text-center font-extrabold">
            Diyorbek Sadullaev
          </h1>
          <h1 className="full-name-2 sm:text-4xl text-2xl text-center font-extrabold">
            Diyorbek Sadullaev
          </h1>
        </div>

        <h1 className="sm:text-xl text-md text-center text-gray-600 dark:text-gray-300 mb-4">
          I am a frontend developer
        </h1>

        <div className="socials rounded-full flex justify-between items-center sm:mb-8 mb-6 p-2">
          <a
            className="outline-none px-2 focus:text-blue-600 hover:text-blue-600 text-gray-600 dark:text-gray-400  dark:hover:text-blue-500 dark:focus:text-blue-500"
            href="https://www.linkedin.com/in/diyorbek-sadullaev/"
          >
            <LinkedIn className="text-2xl" />
          </a>
          <a
            className="outline-none px-2 focus:text-gray-800 hover:text-gray-800 text-gray-600 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:text-gray-50"
            href="https://github.com/Diyorbek"
          >
            <GitHub className="text-2xl " />
          </a>
          <a
            className="outline-none px-2 text-gray-600 dark:text-gray-400"
            href="https://stackoverflow.com/users/9838291/diyorbek-sadullayev"
          >
            <StackOverflow className="text-2xl" />
          </a>
        </div>

        <div className="w-70 flex sm:flex-row flex-col justify-between items-center mb-6">
          <ButtonLink href="#" className="mb-2 sm:mb-0">
            Résumé
          </ButtonLink>
          <ButtonLink href="#" className="sm:mx-2 mb-2 sm:mb-0">
            About me
          </ButtonLink>
          <ButtonLink href="#">Blog</ButtonLink>
        </div>
      </main>
    </PageContainer>
  );
}
