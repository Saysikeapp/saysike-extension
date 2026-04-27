import { ReactNode, useState } from "react";

import Account from "@/pages/Account";
import Login from "@/pages/Login";
import { authClient } from "@/lib/utils/authClient";

export const UserArea = ({ show }: { show: boolean }): ReactNode => {
  const { data } = authClient.useSession();
  const [view, setView] = useState("login");

  if (data)
    return (
      <div
        className="w-full h-full"
        style={{ display: show ? "block" : "none" }}
      >
        <Account />
      </div>
    );

  return (
    <div className="w-full h-full" style={{ display: show ? "block" : "none" }}>
      {view === "login" && <Login setView={() => setView} />}
    </div>
  );
};
