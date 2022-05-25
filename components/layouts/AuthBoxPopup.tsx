import { Dialog } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectNoPersistConfig } from "../../lib/redux/slices/noPersistConfig";
import mediaQuery from "../hooks/mediaQuery";
import LoginBox from "../organisms/LoginBox";

const AuthBoxPopup = () => {
  const config = useSelector(selectNoPersistConfig);
  const [, , isSmall] = mediaQuery("xs");

  return (
    <Dialog
      open={config.showLoginBox}
      transitionDuration={0}
      fullWidth
      fullScreen={isSmall}
      maxWidth="xs"
    >
      <LoginBox showCloseButton />
    </Dialog>
  );
};

export default AuthBoxPopup;
