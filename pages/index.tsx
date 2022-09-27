import Head from "next/head";
import React from "react";
import Avatar from "../components/Avatar";
import ButtonLink from "../components/ButtonLink";
import { GitHub } from "../components/icons/GitHub";
import { LinkedIn } from "../components/icons/LinkedIn";
import { StackOverflow } from "../components/icons/StackOverflow";
import { Telegram } from "../components/icons/Telegram";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";

export default function Home() {
  return (
    <>
      <Head>
        <title>Diyorbek's Blog</title>
      </Head>

      <PageContainer header={<PageHeader hasMenuList={false} />}>
        <main className="home-page flex flex-1 flex-col items-center justify-center py-4">
          <div id="avatar-container" className="mb-4">
            <Avatar id="avatar" className="object-cover rounded-full" />
          </div>

          <div className="relative sm:mb-2 mb-0">
            <h1 className="full-name sm:text-4xl text-2xl text-center font-extrabold m-0">
              Diyorbek Sadullaev
            </h1>
            <h1 className="full-name-2 sm:text-4xl text-2xl text-center font-extrabold m-0">
              Diyorbek Sadullaev
            </h1>
          </div>

          <p className="sm:text-xl text-md text-center text-gray-600 dark:text-gray-300">
            I am a software developer
          </p>

          <div className="socials rounded-full flex justify-between items-center sm:mb-8 mb-6 p-2">
            <a
              className="outline-none px-2 focus:text-blue-600 hover:text-blue-600 text-gray-600 dark:text-gray-400  dark:hover:text-blue-500 dark:focus:text-blue-500"
              href="https://www.linkedin.com/in/diyorbek-sadullaev/"
              target="_blank"
            >
              <LinkedIn className="text-2xl" />
            </a>
            <a
              className="outline-none px-2 focus:text-gray-800 hover:text-gray-800 text-gray-600 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:text-gray-50"
              href="https://github.com/Diyorbek"
              target="_blank"
            >
              <GitHub className="text-2xl " />
            </a>
            <a
              className="outline-none px-2 focus:text-blue-400 hover:text-blue-400 text-gray-600 dark:text-gray-400 dark:hover:text-blue-400 dark:focus:text-blue-400"
              href="https://t.me/brogrammist"
              target="_blank"
            >
              <Telegram className="text-2xl " />
            </a>
            <a
              className="outline-none px-2 text-gray-600 dark:text-gray-400"
              href="https://stackoverflow.com/users/9838291/diyorbek-sadullayev"
              target="_blank"
            >
              <StackOverflow className="text-2xl" />
            </a>
          </div>

          <div className="w-70 flex sm:flex-row flex-col justify-between items-center mb-6">
            <ButtonLink
              href="/Diyobek_Sadullaev_s_resume.pdf"
              className="mb-2 sm:mb-0"
            >
              Résumé
            </ButtonLink>
            <ButtonLink href="/about" className="sm:mx-2 mb-2 sm:mb-0">
              About me
            </ButtonLink>
            <ButtonLink href="/blog">Blog</ButtonLink>
          </div>
        </main>
      </PageContainer>
    </>
  );
}
