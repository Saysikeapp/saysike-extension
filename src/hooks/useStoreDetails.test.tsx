import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { browserMock } from "@/test/mocks/browser";
import { createMockStoreDetailsResponse } from "@/test/factories/storeDetails";
import {
  useStoreDetails,
  STORE_DETAILS_QUERY_KEY,
} from "@/hooks/useStoreDetails";

function makeWrapper(): ({ children }: { children: ReactNode }) => ReactNode {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }): ReactNode {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

type Tab = { id?: number; url?: string };

// getCurrentUrl uses promise style:   await browser.tabs.query({...})
// getActiveTabId uses callback style:  browser.tabs.query({...}, callback)
// The same vi.fn() must handle both calling conventions.
function setupTabsMock(
  url: string | undefined,
  tabId: number | undefined,
): void {
  browserMock.tabs.query.mockImplementation(
    (_query: unknown, callback?: (tabs: Tab[]) => void) => {
      const tab: Tab = {};
      if (tabId !== undefined) tab.id = tabId;
      if (url !== undefined) tab.url = url;
      const tabs = url !== undefined || tabId !== undefined ? [tab] : [];
      if (typeof callback === "function") {
        callback(tabs);
      } else {
        return Promise.resolve(tabs);
      }
    },
  );
}

describe("useStoreDetails", () => {
  it("returns store details on success", async () => {
    const mockResponse = createMockStoreDetailsResponse();
    setupTabsMock("https://test-store.com", 42);

    browserMock.runtime.sendMessage.mockImplementation(
      (_msg: unknown, callback: (res: unknown) => void) => {
        callback({ result: mockResponse });
      },
    );

    const { result } = renderHook(() => useStoreDetails(), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockResponse);
  });

  it("returns null when getCurrentUrl returns undefined", async () => {
    setupTabsMock(undefined, 42);

    const { result } = renderHook(() => useStoreDetails(), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeNull();
  });

  it("returns null when getActiveTabId returns undefined", async () => {
    setupTabsMock("https://test-store.com", undefined);

    const { result } = renderHook(() => useStoreDetails(), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeNull();
  });

  it("enters error state when sendRuntimeMessage rejects", async () => {
    setupTabsMock("https://test-store.com", 42);

    // Set lastError before invoking the callback so sendRuntimeMessage rejects
    browserMock.runtime.sendMessage.mockImplementation(
      (_msg: unknown, callback: (res: unknown) => void) => {
        browserMock.runtime.lastError = {
          message: "Extension context invalid",
        };
        callback(undefined);
      },
    );

    const { result } = renderHook(() => useStoreDetails(), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("Extension context invalid");

    browserMock.runtime.lastError = undefined;
  });

  it(`uses query key "${STORE_DETAILS_QUERY_KEY}"`, () => {
    expect(STORE_DETAILS_QUERY_KEY).toBe("store-details");
  });

  it("does not refetch on window focus", async () => {
    setupTabsMock("https://test-store.com", 42);
    browserMock.runtime.sendMessage.mockImplementation(
      (_msg: unknown, callback: (res: unknown) => void) => {
        callback({ result: createMockStoreDetailsResponse() });
      },
    );

    const { result } = renderHook(() => useStoreDetails(), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const callCount = browserMock.runtime.sendMessage.mock.calls.length;

    window.dispatchEvent(new Event("focus"));
    await new Promise((r) => setTimeout(r, 50));

    expect(browserMock.runtime.sendMessage.mock.calls.length).toBe(callCount);
  });
});
