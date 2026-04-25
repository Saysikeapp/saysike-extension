import { createRoot } from "react-dom/client";
import App from "./App";
import { NavigationProvider } from "../../contexts/NavigationContext";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./styles.css";

const rootElement = document.getElementById("root");

// Ensure the root element exists
if (!rootElement)
  throw new Error(
    "Root element not found. Unable to render the application. Please check the popup.html is valid.",
  );

const root = createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </QueryClientProvider>
  </ThemeProvider>,
);
