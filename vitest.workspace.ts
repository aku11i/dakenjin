import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      name: "node",
      include: ["**/*.test.{ts,tsx}"],
      exclude: ["**/node_modules/**"],
    },
  },
]);
