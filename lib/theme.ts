import { createTheme } from "@mui/material/styles";

interface ColorPalette {
  primary: string;
  secondary: string;
}

export type ThemeColorPalette = {
  light: ColorPalette;
  dark: ColorPalette;
};

const colorPalette: ThemeColorPalette = {
  light: {
    primary: "#28166F",
    secondary: "#FFF500",
  },
  dark: {
    primary: "#28166F",
    secondary: "#FFF500",
  },
};

const typography = {
  fontFamily: "Inter",
};

const MuiButton = {
  styleOverrides: {
    root: {
      fontFamily: "Inter",
      fontWeight: "bold",
      boxShadow: "none",
    },
  },
  defaultProps: {
    disableElevation: true,
  },
};

const MuiLink = {
  styleOverrides: {
    underlineAlways: {
      textDecoration: "none",
    },
  },
};

const light = createTheme({
  typography,
  palette: {
    mode: "light",
    primary: {
      main: colorPalette.light.primary,
    },
    secondary: {
      main: colorPalette.light.secondary,
    },
  },
  components: {
    MuiButton,
    MuiLink,
  },
});

const dark = createTheme({
  typography,
  palette: {
    mode: "dark",
    primary: {
      main: colorPalette.dark.primary,
    },
    secondary: {
      main: colorPalette.dark.secondary,
    },
  },
  components: {
    MuiButton,
    MuiLink,
  },
});

export { light, dark, colorPalette };
