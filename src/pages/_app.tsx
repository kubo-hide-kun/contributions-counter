import { AppProps } from 'next/app';
import { Head } from 'next/document';
import React from 'react';

import '../styles/globals.css';

export const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Contributions Ranking</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
