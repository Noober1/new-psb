import { Button, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme, selectConfig } from "../../lib/redux/slices/config";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useToggleDarkMode from "../hooks/useToggleDarkMode";

type ToggleDarkModeButtonProps = {
  buttonType: "icon" | "button";
};

const ToggleDarkModeButton = ({ buttonType }: ToggleDarkModeButtonProps) => {
  const [theme, toggleDarkMode] = useToggleDarkMode();

  return buttonType == "icon" ? (
    <IconButton onClick={toggleDarkMode} data-testid="dark-mode-toggle-button">
      {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  ) : (
    <Button onClick={toggleDarkMode} data-testid="dark-mode-toggle-button">
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
};

ToggleDarkModeButton.defaultProps = {
  buttonType: "icon",
};

export default ToggleDarkModeButton;
