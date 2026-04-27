import { createAuthClient } from "better-auth/react";
import { assertEnv } from "./env";

export const authClient = createAuthClient({
  // Use the client uri here because we don't want to include /api
  baseURL: assertEnv("WXT_BASE_CLIENT_URI"),
  plugins: [],
});
