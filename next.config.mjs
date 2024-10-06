/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React Strict Mode
  swcMinify: true, // Enable SWC-based minification for faster builds

  // Optimization for static exports and images
  images: {
    domains: ['source.unsplash.com', 'your-image-domain.com'], // External image domains
  },

  env: {
    MONGO_URI: process.env.MONGO_URI, // MongoDB URI exposed to the app
  },

  // Use 'standalone' output instead of 'outputStandalone'
  output: 'standalone',

  // Enable App Router
  experimental: {
    appDir: true,
  },

  webpack: (config, { dev, isServer }) => {
    // Custom Webpack configuration
    if (dev) {
      config.cache = false; // Disable caching in development
    }

    if (!dev && isServer) {
      // This will optimize the size of the server-side bundles
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 40000,
      };
    }

    // You can add additional Webpack rules or plugin modifications here

    return config;
  },

  async headers() {
    return [
      {
        // Add security headers
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*', // Proxy to API
      },
      {
        source: '/Signup',
        destination: '/signup',
      },
    ];
  },
};

export default nextConfig;
