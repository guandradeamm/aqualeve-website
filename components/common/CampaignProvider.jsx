import React, { createContext, useContext, useEffect, useState } from "react";
import { resolveActiveCampaign } from "../../lib/campaigns";

const CampaignContext = createContext(null);

function syncDocumentCampaign(campaign) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  Array.from(root.classList)
    .filter((name) => name.startsWith("campaign-"))
    .forEach((name) => root.classList.remove(name));

  if (campaign?.id) {
    root.classList.add(`campaign-${campaign.id}`);
  }
}

function CampaignProvider({ children }) {
  const [campaign, setCampaign] = useState(() => resolveActiveCampaign());

  useEffect(() => {
    const next = resolveActiveCampaign();
    setCampaign(next);
    syncDocumentCampaign(next);
  }, []);

  useEffect(() => {
    syncDocumentCampaign(campaign);
  }, [campaign]);

  return (
    <CampaignContext.Provider value={campaign}>
      {children}
    </CampaignContext.Provider>
  );
}

function useCampaign() {
  return useContext(CampaignContext);
}

export { CampaignProvider, useCampaign };
