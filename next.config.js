/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "recipe-images.s3.eu-west-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};
