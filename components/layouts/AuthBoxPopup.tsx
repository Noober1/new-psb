import { Dialog } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNoPersistConfig,
  setAuthBoxMenuView,
} from "../../lib/redux/slices/noPersistConfig";
import mediaQuery from "../hooks/mediaQuery";
import ForgotPasswordBox from "../organisms/ForgotPasswordBox";
import LoginBox from "../organisms/LoginBox";

export type AuthMenuType = "login" | "forgot" | "register";

const AuthBoxPopup = () => {
  const config = useSelector(selectNoPersistConfig);
  const dispatch = useDispatch();
  const [, , isSmall] = mediaQuery("xs");
  const { data: session } = useSession();

  if (session?.isLoggedIn) return null;

  const handleClickMenu = (data: AuthMenuType) => {
    dispatch(setAuthBoxMenuView(data));
  };

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
      {config.authBoxMenuView === "login" ? (
        <LoginBox
          showCloseButton
          popupMode
          linkMenuCallback={handleClickMenu}
          elevation={0}
        />
      ) : (
        <ForgotPasswordBox />
      )}
    </Dialog>
  );
};

export default AuthBoxPopup;
