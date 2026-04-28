import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/server";
import "./mocks/browser"; // executes vi.stubGlobal('browser', browserMock)

// Stub env vars used by authClient / assertEnv so module init doesn't throw
vi.stubEnv("WXT_BASE_CLIENT_URI", "http://localhost:3000");
vi.stubEnv("WXT_BASE_SERVER_URI", "http://localhost:3000/api");

// MSW lifecycle
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => {
  server.resetHandlers();
  // Clear call history on ALL mocks (including plain vi.fn() e.g. browserMock)
  vi.clearAllMocks();
  // Restore spy implementations (vi.spyOn only; does not undo vi.stubGlobal/vi.stubEnv)
  vi.restoreAllMocks();
});
afterAll(() => server.close());

// Suppress noisy matchMedia warnings from jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
