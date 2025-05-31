import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      name: "node",
      include: ["**/*.test.{ts,tsx}"],
      exclude: ["**/node_modules/**", "**/packages/react/**"],
    },
  },
  {
    extends: "./packages/react/vitest.config.ts",
    test: {
      name: "react",
      include: ["packages/react/**/*.test.{ts,tsx}"],
    },
  },
]);
