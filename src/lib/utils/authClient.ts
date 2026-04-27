import { createAuthClient } from "better-auth/react";
import { assertEnv } from "./env";

type AuthClient = ReturnType<typeof createAuthClient>;

let _instance: AuthClient | undefined;

function getInstance(): AuthClient {
  if (!_instance) {
    _instance = createAuthClient({
      baseURL: assertEnv("WXT_BASE_CLIENT_URI"),
      plugins: [],
    });
  }
  return _instance;
}

// Proxy defers createAuthClient (and assertEnv) until first property access,
// which happens during component render — inside the React tree — so errors
// are caught by the nearest ErrorBoundary instead of crashing the module.
export const authClient = new Proxy({} as AuthClient, {
  get(_target, prop): unknown {
    return Reflect.get(getInstance(), prop);
  },
});
