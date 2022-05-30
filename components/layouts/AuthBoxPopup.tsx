import { Dialog } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNoPersistConfig } from "../../lib/redux/slices/noPersistConfig";
import mediaQuery from "../hooks/mediaQuery";
import LoginBox from "../organisms/LoginBox";

export type AuthMenuType = "login" | "forgot" | "register";

const AuthBoxPopup = () => {
  const { data: session } = useSession();
  const config = useSelector(selectNoPersistConfig);
  const [, , isSmall] = mediaQuery("xs");
  const { status } = useSession();

  if (status == "authenticated" || session) return null;

  return (
    <Dialog
      open={config.showAuthBox}
      scroll="body"
      transitionDuration={0}
      PaperProps={{
        elevation: 0,
      }}
      fullWidth
      fullScreen={isSmall}
      maxWidth="xs"
    >
      <LoginBox showCloseButton popupMode />
    </Dialog>
  );
};

export default AuthBoxPopup;
