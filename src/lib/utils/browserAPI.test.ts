import { browserMock } from "@/test/mocks/browser";
import {
  getActiveTabId,
  getCurrentUrl,
  sendRuntimeMessage,
  BackgroundEventMethods,
} from "./browserAPI";

type TabStub = { id?: number; url?: string };
type TabQueryCallback = (tabs: TabStub[]) => void;

describe("getActiveTabId", () => {
  it("resolves with the active tab's id", async () => {
    browserMock.tabs.query.mockImplementation(
      (_query: unknown, cb: TabQueryCallback) => {
        cb([{ id: 42 }]);
      },
    );
    await expect(getActiveTabId()).resolves.toBe(42);
  });

  it("resolves with undefined when no tabs are returned", async () => {
    browserMock.tabs.query.mockImplementation(
      (_query: unknown, cb: TabQueryCallback) => {
        cb([]);
      },
    );
    await expect(getActiveTabId()).resolves.toBeUndefined();
  });
});

describe("getCurrentUrl", () => {
  it("resolves with the active tab's URL", async () => {
    browserMock.tabs.query.mockResolvedValue([{ url: "https://example.com" }]);
    await expect(getCurrentUrl()).resolves.toBe("https://example.com");
  });

  it("resolves with undefined when no tab is found", async () => {
    browserMock.tabs.query.mockResolvedValue([]);
    await expect(getCurrentUrl()).resolves.toBeUndefined();
  });
});

describe("sendRuntimeMessage", () => {
  const message = {
    method: BackgroundEventMethods.GET_STORE_DETAILS,
    data: { url: "https://example.com", tabId: 1 },
  };

  it("resolves with the response from the background", async () => {
    browserMock.runtime.sendMessage.mockImplementation(
      (_msg: unknown, cb: (res: unknown) => void) => {
        cb({ result: { store: null, codes: [], deals: [] } });
      },
    );
    browserMock.runtime.lastError = undefined;

    const result = await sendRuntimeMessage(message);
    expect(result).toEqual({ result: { store: null, codes: [], deals: [] } });
  });

  it("rejects when browser.runtime.lastError is set", async () => {
    browserMock.runtime.sendMessage.mockImplementation(
      (_msg: unknown, cb: (res: unknown) => void) => {
        browserMock.runtime.lastError = {
          message: "Extension context invalid",
        };
        cb(undefined);
      },
    );

    await expect(sendRuntimeMessage(message)).rejects.toThrow(
      "Extension context invalid",
    );

    // Clean up
    browserMock.runtime.lastError = undefined;
  });
});
