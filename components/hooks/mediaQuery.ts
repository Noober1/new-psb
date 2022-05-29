import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

export type MediaQuerySize = "xs" | "sm" | "md" | "lg" | "xl";

type MediaQuery = [boolean, boolean, boolean];

const mediaQuery = (size: MediaQuerySize) => {
  const theme = useTheme();
  const up = useMediaQuery(theme.breakpoints.up(size));
  const down = useMediaQuery(theme.breakpoints.down(size));
  const only = useMediaQuery(theme.breakpoints.only(size));

  return [up, down, only];
};

export default mediaQuery;
