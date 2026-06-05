import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "../../contexts/ThemeContext";

import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement)
  throw new Error(
    "Root element not found. Unable to render the onboarding page.",
  );

const root = createRoot(rootElement);

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
