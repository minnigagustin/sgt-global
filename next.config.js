/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  env: {
    URL_BACKEND: "https://admin.yappastore.com/popino/",
    NAME_COMMERCE: "COMERCIO 2",
    LOGO_COMMERCE: "",
    DESHABILITAR_FUNCIONES: "true",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
