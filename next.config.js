/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
};
