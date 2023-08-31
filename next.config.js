/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "cdn.sanity.io"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
};

module.exports = nextConfig;
