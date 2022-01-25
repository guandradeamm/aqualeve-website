import Head from "next/head";
import React from "react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Aqualeve</title>
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
