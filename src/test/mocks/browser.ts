import { vi } from "vitest";

export const browserMock = {
  tabs: {
    query: vi.fn(),
    create: vi.fn(),
    remove: vi.fn(),
  },
  runtime: {
    sendMessage: vi.fn(),
    lastError: undefined as { message: string } | undefined,
    getManifest: vi.fn().mockReturnValue({ version: "0.0.0" }),
  },
  action: {
    setBadgeBackgroundColor: vi.fn(),
    setBadgeText: vi.fn(),
  },
  storage: {
    session: {
      get: vi.fn(),
      set: vi.fn(),
    },
  },
};

vi.stubGlobal("browser", browserMock);
