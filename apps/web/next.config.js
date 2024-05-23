const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,

  images: {
    domains: ["ypn44edblhlmrmwr.public.blob.vercel-storage.com"],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
};
