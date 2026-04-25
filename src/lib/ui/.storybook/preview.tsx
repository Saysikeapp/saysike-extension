import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import { useEffect } from "react";
import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [],
        method: "alphabetical",
        includeNames: true,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
      parentSelector: "html",
    }),
    (Story) => {
      // Sync the body background with the current theme so the
      // Storybook canvas background matches light/dark mode.
      useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        document.body.style.backgroundColor = isDark ? "#0f0f0f" : "#ffffff";
        document.body.style.color = isDark ? "#eeeeee" : "#111111";

        const observer = new MutationObserver(() => {
          const dark = document.documentElement.classList.contains("dark");
          document.body.style.backgroundColor = dark ? "#0f0f0f" : "#ffffff";
          document.body.style.color = dark ? "#eeeeee" : "#111111";
        });
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });
        return () => observer.disconnect();
      }, []);

      return (
        <div className="saysike-styles" style={{ width: "100%" }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
