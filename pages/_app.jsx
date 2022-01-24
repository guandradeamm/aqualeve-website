import React from "react";
import "../styles/globals.scss";
<<<<<<< HEAD

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
=======
import { Layout } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
>>>>>>> b2b14e2b2ab51cdc249a4b8de6523961620aa546
}

export default MyApp;
