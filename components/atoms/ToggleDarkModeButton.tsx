import { Button, IconButton } from "@mui/material";
import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useToggleDarkMode from "../hooks/useToggleDarkMode";
import ToggleOff from "@mui/icons-material/ToggleOffSharp";
import ToggleOn from "@mui/icons-material/ToggleOnSharp";

type ToggleDarkModeButtonProps = {
  buttonType: "icon" | "button";
  label: string;
};

const ToggleDarkModeButton = ({
  buttonType,
  label,
}: ToggleDarkModeButtonProps) => {
  const [theme, toggleDarkMode] = useToggleDarkMode();

  return buttonType == "icon" ? (
    <IconButton onClick={toggleDarkMode} data-testid="dark-mode-toggle-button">
      {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  ) : (
    <Button
      onClick={toggleDarkMode}
      data-testid="dark-mode-toggle-button"
      variant="contained"
      endIcon={theme === "light" ? <ToggleOff /> : <ToggleOn />}
    >
      {label}
    </Button>
  );
};

ToggleDarkModeButton.defaultProps = {
  buttonType: "icon",
  label: "Dark mode",
};

export default ToggleDarkModeButton;
