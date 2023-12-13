/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  env: {
    URL_BACKEND: "https://admin.yappastore.com/panda/",
    NAME_COMMERCE: "COMERCIO 2",
    LOGO_COMMERCE: "./nacion-new-logo.png",
  },
};

module.exports = nextConfig;
