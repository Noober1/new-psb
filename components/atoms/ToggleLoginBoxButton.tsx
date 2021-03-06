import { Button, Dialog, IconButton } from "@mui/material";
import LoginIcon from "@mui/icons-material/VpnKey";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openLoginPopup,
  closeLoginPopup,
  selectNoPersistConfig,
} from "../../lib/redux/slices/noPersistConfig";
import CloseIcon from "@mui/icons-material/Close";
import useLoginPopup from "../hooks/useLoginPopup";

export type ToggleLoginBoxButtonProps = {
  buttonType?: "button" | "icon";
  buttonLabel?: string;
  closeIcon?: boolean;
};

const ToggleLoginBoxButton = ({
  buttonType,
  closeIcon,
  buttonLabel,
}: ToggleLoginBoxButtonProps) => {
  const { config } = useSelector(selectNoPersistConfig);
  const [handleOpen, handleClose] = useLoginPopup();

  const handleToggleOpenLoginBox = () => {
    if (config?.showAuthBox) {
      handleOpen();
    } else {
      handleClose();
    }
  };

  return buttonType == "button" ? (
    <Button
      data-testid="login-box-toggle-button"
      data-type="button"
      onClick={handleToggleOpenLoginBox}
    >
      {buttonLabel}
    </Button>
  ) : (
    <IconButton
      data-testid="login-box-toggle-button"
      data-type="icon"
      onClick={handleToggleOpenLoginBox}
    >
      {!closeIcon ? <LoginIcon /> : <CloseIcon />}
    </IconButton>
  );
};

ToggleLoginBoxButton.defaultProps = {
  buttonType: "button",
  buttonLabel: "Login",
  closeIcon: false,
};

export default ToggleLoginBoxButton;
