import Head from 'next/head';
import React from 'react';
import { PageContainer } from '../components/PageContainer';

export default function Resume() {
  return (
    <>
      <Head>
        <title>Diyorbek's CV</title>
      </Head>

      <PageContainer>
        <div className="max-w-3xl mx-auto mb-8 px-2">
          <h1 className="text-4xl text-center font-bold my-6 text-gray-700 dark:text-gray-300">
            Résumé
          </h1>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-600 dark:text-gray-400">
              Experience
            </h2>
            <div className="divider mb-2" />

            <div className="flex justify-between mb-2 flex-wrap">
              <h4 className="text-lg font-bold">
                Frontend Developer at Super Dispatch
              </h4>
              <p className="italic text-gray-600 dark:text-gray-400">
                September 2019 - Present
              </p>
            </div>

            <ul className="mb-4">
              <li className="mb-2">
                Developed and maintained the web applications and email
                templates of the company. Technologies: ReactJS, Redux,
                TypeScript.
              </li>
              <li className="mb-2">
                Migrated Django template pages to ReactJS
              </li>
              <li>
                Building design system elements (based on Material UI) for the
                web applications of the company.
              </li>
            </ul>

            <div className="flex justify-between mb-2 flex-wrap">
              <h4 className="text-lg font-bold">
                Frontend Developer at PeriPlus AG
              </h4>
              <p className="italic text-gray-600 dark:text-gray-400">
                December 2019 - September 2019
              </p>
            </div>

            <ul>
              <li className="mb-2">
                Built a mobile app in React Native for container number
                recognition.
              </li>
              <li className="mb-2">
                Built the frontend of transportation management system in
                ReactJS
              </li>
              <li>
                Built the frontend of a document recognition app in ReactJS
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-600 dark:text-gray-400">
              Education
            </h2>
            <div className="divider mb-2" />

            <div className="flex justify-between mb-2 flex-wrap">
              <h4 className="text-lg font-bold">
                Polish-Japanese Academy of IT
              </h4>
              <p className="italic text-gray-600 dark:text-gray-400">
                October 2020 - February 2024
              </p>
            </div>
            <div className="flex justify-between flex-wrap">
              <h4 className="text-lg font-bold">
                Tashkent University of Information Technologies
              </h4>
              <p className="italic text-gray-600 dark:text-gray-400">
                September 2017 - December 2018
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-600 dark:text-gray-400">
              Projects
            </h2>
            <div className="divider mb-2" />

            <div className="flex justify-between mb-2 flex-wrap">
              <h4 className="text-lg font-bold">Fonetika.Uz</h4>
            </div>
            <p className="mb-4">
              <a target="_blank" rel="noreferrer" href="https://fonetika.uz/">
                Fonetika.Uz
              </a>{' '}
              is a small web app for looking up for the syllablifications of
              Uzbek words. Besides it shows the variants of work breaking for
              the input word, and categories of the letters in the word.
            </p>

            <div className="flex justify-between mb-2 flex-wrap">
              <h4 className="text-lg font-bold">MusicSpider</h4>
            </div>
            <p className="">
              <a
                target="_blank"
                rel="noreferrer"
                href="http://bit.ly/musicspider"
              >
                MusicSpider
              </a>{' '}
              is a chrome extension for listening to music while browsing.
              Because the songs are constantly crawled by spiders, this name was
              given.
            </p>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
