import { Button, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme, selectConfig } from "../../lib/redux/slices/config";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

type ToggleDarkModeButtonProps = {
  buttonType: "icon" | "button";
};

const ToggleDarkModeButton = ({ buttonType }: ToggleDarkModeButtonProps) => {
  const { theme } = useSelector(selectConfig);
  const dispatch = useDispatch();
  const toggleDarkMode = () =>
    dispatch(changeTheme(theme === "light" ? "dark" : "light"));

  return buttonType == "icon" ? (
    <IconButton onClick={toggleDarkMode}>
      {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  ) : (
    <Button onClick={toggleDarkMode}>
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
};

ToggleDarkModeButton.defaultProps = {
  buttonType: "icon",
};

export default ToggleDarkModeButton;
