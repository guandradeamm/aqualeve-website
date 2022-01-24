module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
<<<<<<< HEAD
  images: {
    domains: [process.env.NEXT_PUBLIC_GRAPHCMS_MEDIA_ENDPOINT],
  },
=======
>>>>>>> b2b14e2b2ab51cdc249a4b8de6523961620aa546
};
