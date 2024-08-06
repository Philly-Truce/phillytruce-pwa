import withPWA from "next-pwa";
import dotenv from "dotenv";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  // Any other Next.js config options
};

export default isProd ? withPWA({ dest: "public" })(nextConfig) : nextConfig;
