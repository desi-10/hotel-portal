/** @type {import('next').NextConfig} */
const nextConfig = {
  // next image remote pattern
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hotelbookingcenter.pythonanywhere.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
