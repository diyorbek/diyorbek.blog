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

            <div className="flex justify-between flex-wrap">
              <h3>Frontend Developer, Super Dispatch</h3>

              <span className="italic text-gray-600 dark:text-gray-400">
                September 2019 - Present
              </span>
            </div>

            <ul className="mb-4">
              <li>
                Developed web application for transportation management system
                using ReactJS
              </li>
              <li>
                Optimized WebSocket connections significantly in ReactJS
                applications using Shared Workers.
              </li>
              <li>
                Reduced the crash rate by 30% by fixing the asset loading issue
                in ReactJS applications.
              </li>
              <li>
                Built the design system components for web applications on top
                of Material-UI.
              </li>
            </ul>

            <div className="flex justify-between flex-wrap">
              <h3>Frontend Developer, PeriPlus AG</h3>

              <span className="italic text-gray-600 dark:text-gray-400">
                December 2018 - September 2019
              </span>
            </div>

            <ul>
              <li>
                Built React Native mobile application for container number
                recognition.
              </li>
              <li>
                Built the frontend of a transportation management system in
                ReactJS.
              </li>
              <li>
                Built the frontend of document recognition and classification
                application in ReactJS.
              </li>
              <li>Wrote unit and end-to-end tests for SPAs.</li>
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

            <ul>
              <li>
                <b>Overall GPA:</b> 4.2/5.0
              </li>
              <li>
                <b>Courses:</b> C++, Java, Algorithms and data structures,
                Relational databases, Object-oriented programming, Calculus,
                Linear Algebra and geometry, Discrete mathematics
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-gray-600 dark:text-gray-400">Projects</h2>

            <div className="divider mb-2" />

            <h3>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://transliterator.uz/"
              >
                Transliterator
              </a>
            </h3>

            <ul className="mb-4">
              <li>
                Transliterator for Uzbek words with high accuracy (from Latin
                alphabet to Cyrillic and vice versa).
              </li>
              <li>
                Created enriched exceptional words list analyzing the spelling
                dictionaries using Bash.
              </li>
              <li>
                The web app is built using ReactJS, and the engine is built
                using TypeScript.
              </li>
            </ul>

            <h3>
              <a target="_blank" rel="noreferrer" href="https://fonetika.uz/">
                Fonetika
              </a>
            </h3>

            <ul className="mb-4">
              <li>
                Divides Uzbek words into syllables. Built using TypeScript.
              </li>
              <li>Shows phonetic and orthographic aspects of a given word.</li>
              <li>
                The algorithm correctly syllabizes the words with bigrams which
                are exceptions in grammar textbooks.
              </li>
            </ul>

            <h3>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/diyorbek/socoban"
              >
                Socoban
              </a>
            </h3>

            <ul className="mb-4">
              <li>
                A classic 2D game in which the player moves boxes around to
                place them in a particular position.
              </li>
              <li>
                The levels are added as text files that contain a time limit and
                target positions as a character matrix.
              </li>
              <li>Written in Java using JavaFX.</li>
            </ul>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
