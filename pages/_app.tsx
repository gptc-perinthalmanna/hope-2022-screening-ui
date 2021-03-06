import React from "react";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import "../styles/index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
