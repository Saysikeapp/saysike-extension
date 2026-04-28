import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { ReactNode } from "react";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

type WrapperOptions = {
  withNavigation?: boolean;
  withTheme?: boolean;
};

function makeWrapper(
  opts: WrapperOptions = {},
): ({ children }: { children: ReactNode }) => ReactNode {
  const { withNavigation = true, withTheme = true } = opts;

  return function Wrapper({ children }: { children: ReactNode }): ReactNode {
    const queryClient = makeQueryClient();

    let content = (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    if (withTheme) {
      content = <ThemeProvider>{content}</ThemeProvider>;
    }

    if (withNavigation) {
      content = <NavigationProvider>{content}</NavigationProvider>;
    }

    return content;
  };
}

export function renderWithProviders(
  ui: ReactNode,
  options?: WrapperOptions & Omit<RenderOptions, "wrapper">,
): RenderResult {
  const { withNavigation, withTheme, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: makeWrapper({ withNavigation, withTheme }),
    ...renderOptions,
  });
}
