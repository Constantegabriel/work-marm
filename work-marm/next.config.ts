import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite qualquer domínio remoto (use com cautela em produção)
      },
    ],
  },
};

export default nextConfig;
