import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  images: {
    // Permite imagens locais e remotas
    domains: [], // Adicione domínios específicos aqui se necessário no futuro
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite qualquer domínio remoto (use com cautela)
      },
    ],
  },
};

export default nextConfig;
