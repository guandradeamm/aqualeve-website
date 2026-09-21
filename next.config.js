const graphcmsMediaHost = (() => {
  const value = process.env.NEXT_PUBLIC_GRAPHCMS_MEDIA_ENDPOINT;
  if (!value) return null;

  try {
    return value.includes("://") ? new URL(value).hostname : value.split("/")[0];
  } catch (error) {
    return null;
  }
})();

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      ...new Set(
        [
          "sa-east-1.graphassets.com",
          "media.graphassets.com",
          graphcmsMediaHost,
        ].filter(Boolean)
      ),
    ],
  },
};
