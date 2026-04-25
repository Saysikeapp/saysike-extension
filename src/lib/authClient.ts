import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Use the client uri here because we don't want to include /api
  baseURL: import.meta.env.WXT_BASE_CLIENT_URI,
  plugins: [],
});
