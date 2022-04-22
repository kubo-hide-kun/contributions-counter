import { AppProps } from 'next/app';
import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

const Document: React.FC<AppProps> = () => {
  return (
    <Html lang="ja">
      <Head>
        <title>Contributions Ranking</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
