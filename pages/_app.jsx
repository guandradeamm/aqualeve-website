import "../styles/tailwind.scss";
import Head from "next/head";
import React from "react";

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
