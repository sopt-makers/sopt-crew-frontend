/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /rect/,
          use: {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
            },
          },
        },
        {
          use: '@svgr/webpack',
        },
      ],
    });
    return config;
  },
  basePath: '/group',
};

module.exports = nextConfig;
