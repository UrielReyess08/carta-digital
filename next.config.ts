import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizaciones de imágenes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    // Formatos soportados (WebP es el primero para mejor compresión)
    formats: ["image/avif", "image/webp"],
    // Cachear imágenes optimizadas por 365 días
    minimumCacheTTL: 31536000,
  },
  // Compresión en build
  compress: true,
  // No enviar source maps a producción (reduce tamaño)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
