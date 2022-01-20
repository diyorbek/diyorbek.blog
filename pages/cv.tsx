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
          <h1 className="text-center">Résumé</h1>

          <div className="mb-10">
            <h2 className="text-gray-600 dark:text-gray-400">Experience</h2>

            <div className="divider mb-2" />

            <div className="flex justify-between flex-wrap mb-4">
              <h3>Frontend Developer at Super Dispatch</h3>

              <span className="italic text-gray-600 dark:text-gray-400">
                September 2019 - Present
              </span>
            </div>

            <ul>
              <li>
                <p>
                  Developed and maintained the web applications and email
                  templates of the company. Technologies: ReactJS, Redux,
                  TypeScript.
                </p>
              </li>
              <li>
                <p>Migrated Django template pages to ReactJS</p>
              </li>
              <li>
                <p>
                  Building design system elements (based on Material UI) for the
                  web applications of the company.
                </p>
              </li>
            </ul>

            <div className="flex justify-between flex-wrap mb-4">
              <h3>Frontend Developer at PeriPlus AG</h3>

              <span className="italic text-gray-600 dark:text-gray-400">
                December 2018 - September 2019
              </span>
            </div>

            <ul>
              <li>
                <p>
                  Built a mobile app in React Native for container number
                  recognition.
                </p>
              </li>
              <li>
                <p>
                  Built the frontend of transportation management system in
                  ReactJS
                </p>
              </li>
              <li>
                <p>
                  Built the frontend of a document recognition app in ReactJS
                </p>
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-gray-600 dark:text-gray-400">Education</h2>

            <div className="divider mb-2" />

            <div className="flex justify-between flex-wrap mb-4">
              <h3>Polish-Japanese Academy of IT</h3>

              <span className="italic text-gray-600 dark:text-gray-400">
                October 2020 - February 2024
              </span>
            </div>

            <div className="flex justify-between flex-wrap">
              <h3>Tashkent University of Information Technologies</h3>

              <span className="italic text-gray-600 dark:text-gray-400">
                September 2017 - December 2018
              </span>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-gray-600 dark:text-gray-400">Projects</h2>

            <div className="divider mb-2" />

            <h3>Fonetika.Uz</h3>
            <p>
              <a target="_blank" rel="noreferrer" href="https://fonetika.uz/">
                Fonetika.Uz
              </a>{' '}
              is a small web app for looking up for the syllablifications of
              Uzbek words. Besides it shows the variants of work breaking for
              the input word, and categories of the letters in the word.
            </p>

            <h3>MusicSpider</h3>
            <p>
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
