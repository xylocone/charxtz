/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { isServer }) => {
    // Modify the config to change the behavior of warnings in production builds
    if (!isServer && process.env.NODE_ENV === 'production') {
      config.optimization.minimize = false;
      config.optimization.minimizer = [];
    }

    return config;
  },
};

