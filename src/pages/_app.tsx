import { AppProps } from 'next/app';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

export const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="bottom-center" />
    </>
  );
};

export default MyApp;
