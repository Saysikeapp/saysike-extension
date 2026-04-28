import { authClient } from "@/lib/utils/authClient";
import { Button, Icon, ThemeToggle } from "@saysike/ui";
import { useTheme } from "../../contexts/ThemeContext";
import { BLUE_ICON_FILTER } from "@/components/common/styles";
import { assertEnv } from "@/lib/utils/env";
import { ReactNode } from "react";

const Account = (): ReactNode => {
  const { data } = authClient.useSession();
  const { theme, setTheme } = useTheme();

  if (!data) return null;

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center gap-4 px-6 text-center">
      <ThemeToggle
        theme={theme}
        setTheme={setTheme}
        className="absolute top-2 left-2"
      />

      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
        <div style={{ filter: BLUE_ICON_FILTER }}>
          <Icon src="avatar.svg" size={10} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-base font-semibold text-text-primary m-0">
          Your Account
        </h2>
        <p className="text-xs text-text-primary leading-snug m-0">
          Manage your Saysike account below.
        </p>
      </div>

      <Button
        onClick={() => {
          window.open(`${assertEnv("WXT_BASE_CLIENT_URI")}/account`, "_blank");
        }}
        className="w-full"
      >
        <Icon src="open-in-window.svg" className="mr-2" />
        Manage Account
      </Button>
    </div>
  );
};
export default Account;
