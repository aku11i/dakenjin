import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      name: "node",
      root: "..",
      include: ["**/*.test.{ts,tsx}"],
      exclude: ["**/node_modules/**"],
    },
  },
]);

