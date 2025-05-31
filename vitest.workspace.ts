import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      name: "node",
      include: ["**/*.test.{ts,tsx}"],
      exclude: ["**/node_modules/**", "**/*.dom.test.{ts,tsx}"],
    },
  },
  {
    test: {
      name: "dom",
      environment: "jsdom",
      include: ["**/*.dom.test.{ts,tsx}"],
      exclude: ["**/node_modules/**"],
    },
  },
]);
