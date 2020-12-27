import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import Avatar from '../components/Avatar';
import ButtonLink from '../components/ButtonLink';
import { GitHub } from '../components/icons/GitHub';
import { LinkedIn } from '../components/icons/LinkedIn';
import { StackOverflow } from '../components/icons/StackOverflow';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Diyorbek Sadullaev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col min-h-screen items-center justify-center px-2 py-4">
          <div className="mb-4">
            <Avatar id="avatar" className="object-cover rounded-full" />
          </div>

          <h1 className="sm:text-4xl text-2xl text-center font-extrabold text-gray-800 sm:mb-2 mb-0">
            Diyorbek Sadullaev
          </h1>

          <h1 className="sm:text-xl text-md text-center text-gray-600 mb-4">
            I am a frontend developer
          </h1>

          <div className="w-32 flex justify-between items-center sm:mb-8 mb-6">
            <a href="https://www.linkedin.com/in/diyorbek-sadullaev/">
              <LinkedIn className="text-2xl hover:text-blue-600 text-gray-600" />
            </a>
            <a href="https://github.com/Diyorbek">
              <GitHub className="text-2xl hover:text-gray-800 text-gray-600" />
            </a>
            <a href="https://stackoverflow.com/users/9838291/diyorbek-sadullayev">
              <StackOverflow className="text-2xl text-gray-600" />
            </a>
          </div>

          <div className="w-70 flex sm:flex-row flex-col justify-between items-center mb-6">
            <ButtonLink href="#" className="mb-2 sm:mb-0">
              Resume
            </ButtonLink>
            <ButtonLink href="#" className="sm:mx-2 mb-2 sm:mb-0">
              About me
            </ButtonLink>
            <ButtonLink href="#">Blog</ButtonLink>
          </div>
        </div>
      </main>
    </div>
  );
}
