/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's Strict Mode for development warnings
  swcMinify: true, // Enables faster builds with SWC minification
  trailingSlash: true, // Ensures all pages are statically exported with a trailing slash
  images: {
    domains: ['source.unsplash.com', 'your-image-domain.com'], // External image domains
  },
  env: {
    MONGO_URI: process.env.MONGO_URI, // Environment variable for MongoDB URI
  },
  experimental: {
    outputStandalone: true, // Enable standalone output mode for Docker or custom server deployments
    scrollRestoration: true, // Enable scroll restoration across navigation
  },
  async rewrites() {
    // Return an empty array to ensure no rewrites are performed
    return [];
  },
  webpack: (config, { dev, isServer }) => {
    // Custom Webpack configurations
    if (dev) {
      config.cache = false; // Disable caching in development for better debugging experience
    }

    if (!dev && isServer) {
      // Optimize the server-side bundle for production
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 40000,
      };
    }

    // Add more custom webpack configurations as needed

    return config;
  },
};

export default nextConfig;
