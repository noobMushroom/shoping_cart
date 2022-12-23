/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'i.dummyjson.com',
      'media.istockphoto.com',
      'fakestoreapi.com',
    ],
  },
};

module.exports = nextConfig;
