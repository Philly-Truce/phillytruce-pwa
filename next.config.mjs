import withPWA from "next-pwa";
import dotenv from "dotenv";

require("dotenv").config();

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

export default isProd ? withPWA({ dest: "public" })(nextConfig) : nextConfig;
