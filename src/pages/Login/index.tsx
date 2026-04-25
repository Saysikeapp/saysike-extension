import { Button, Icon, ThemeToggle, Typography } from "@saysike/ui";
import { ReactNode } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const Login = ({ setView }: { setView: () => void }): ReactNode => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center gap-4 px-6 text-center">
      <ThemeToggle
        theme={theme}
        setTheme={setTheme}
        className="absolute top-2 left-2"
      />

      {import.meta.env.DEV && (
        <Typography.HelperText className="text-2xs absolute right-1 top-1 text-text-primary">
          Version: Dirt ({browser.runtime.getManifest().version})
        </Typography.HelperText>
      )}

      <img
        src="/icon-128.png"
        alt="Saysike"
        className="w-14 h-14 select-none"
        draggable={false}
      />

      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-text-primary m-0">
          Welcome to Saysike
        </h2>
        <p className="text-xs text-text-primary leading-snug m-0">
          Sign in to automatically find and apply the best coupon codes and
          deals as you shop.
        </p>
      </div>

      <Button
        onClick={() => {
          window.open(`${import.meta.env.WXT_BASE_CLIENT_URI}/login`);
        }}
        className="w-full"
      >
        <Icon src="login.svg" className="mr-2" />
        Sign in to Saysike
      </Button>
    </div>
  );
};

export default Login;
