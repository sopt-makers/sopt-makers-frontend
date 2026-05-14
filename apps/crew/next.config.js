const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@sopt/ui', '@sopt/constant'],
  webpack: (config) => {
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
          resourceQuery: /v2/, // *.svg?v2
          use: {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
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
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  org: 'sopt-crew',
  project: 'sopt-crew-frontend',
  silent: true, // Suppresses all logs
  dryRun: !process.env.SENTRY_AUTH_TOKEN, // 토큰 없으면 업로드 스킵 (e.g. PR 빌드)
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
