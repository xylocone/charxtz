/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, localStorage: false };

    return config;
  },
};

