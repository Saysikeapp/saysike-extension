import { cn } from "@saysike/ui";
import { ReactNode } from "react";

const defaultClassName =
  "flex items-center justify-center w-[300px] h-[40px] bg-[#ffffff] relative text-[rgb(0,0,0)] font-['Poppins',sans-serif] text-[15px] cursor-pointer m-[5px] border-[solid] border-[rgb(196,196,196)] border";

export const SocialLogin = ({
  googleText,
  facebookText,
}: {
  googleText: string;
  facebookText: string;
}): ReactNode => {
  const loginWithGoogle = (): void => {
    void browser.tabs.create({
      url: import.meta.env.WXT_BASE_SERVER_URI as string,
      active: true,
    });
  };

  const loginWithFacebook = (): void => {
    void browser.tabs.create({
      url: import.meta.env.WXT_BASE_SERVER_URI as string,
      active: true,
    });
  };

  return (
    <div className="flex items-center justify-center w-full flex-col">
      <div className="defaultClassName" onClick={loginWithGoogle}>
        <img
          src={"./googleLogo.png"}
          alt="Google Icon"
          className="w-[10%] h-[40px] object-contain left-[10px] rounded-[3px] absolute"
        />
        <p style={{ textAlign: "center" }}>{googleText}</p>
      </div>

      <div
        className={cn(defaultClassName, "bg-[#000dff] border-[none]")}
        onClick={loginWithFacebook}
      >
        <img
          src={"./facebookLogo.png"}
          className="h-[40px] w-[17%] left-0"
          alt="Facebook Icon"
        />
        <p style={{ textAlign: "center" }}>{facebookText}</p>
      </div>
    </div>
  );
};
