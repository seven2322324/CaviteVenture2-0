/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's Strict Mode
  swcMinify: true, // Enables SWC-based minification for faster builds
  images: {
    domains: ['source.unsplash.com', 'your-image-domain.com'], // Added 'source.unsplash.com' for external images
  },
  env: {
    MONGO_URI: process.env.MONGO_URI, // Exposes MongoDB URI to your app
  },
  webpack: (config, { dev, isServer }) => {
    // Custom Webpack configuration
    if (dev) {
      config.cache = false; // Disable persistent caching in development for debugging
    }

    if (!dev && isServer) {
      // This will optimize the size of the server-side bundles
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 40000,
      };
    }

    // Add any additional custom rules or plugin modifications here

    return config;
  },
};

export default nextConfig;
