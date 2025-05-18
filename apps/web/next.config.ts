import type { NextConfig } from "next";
import { dependencies } from "./package.json";

const nextConfig: NextConfig = {
  transpilePackages: Object.keys(dependencies).filter((name) =>
    name.startsWith("@dakenjin/"),
  ),
};

export default nextConfig;
