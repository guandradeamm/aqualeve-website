import "../styles/tailwind.scss";
import Head from "next/head";
import React from "react";
import { CampaignProvider } from "../components/common/CampaignProvider";
import {
  getDocumentTitle,
  resolveActiveCampaign,
} from "../lib/campaigns";

function MyApp({ Component, pageProps }) {
  const campaign = resolveActiveCampaign();

  return (
    <CampaignProvider>
      <Head>
        <title>{getDocumentTitle(campaign)}</title>
      </Head>
      <Component {...pageProps} />
    </CampaignProvider>
  );
}

export default MyApp;
