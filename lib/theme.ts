import { createTheme } from "@mui/material/styles";

interface ColorPalette {
  primary: string;
  secondary: string;
}

export type ThemeColorPalette = {
  light: ColorPalette;
  dark: ColorPalette;
};

const breakpoints = {
  values: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};

const colorPalette: ThemeColorPalette = {
  light: {
    primary: "#28166F",
    secondary: "#FFF500",
  },
  dark: {
    primary: "#36459b",
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
  defaultProps: {
    underline: "none" as "none",
  },
};

const MuiTextField = {
  defaultProps: {
    InputLabelProps: {
      shrink: true,
    },
  },
};

const light = createTheme({
  typography,
  breakpoints,
  palette: {
    mode: "light",
    background: {
      default: "#e5e5e5",
    },
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
    MuiTextField,
  },
});

const dark = createTheme({
  typography,
  breakpoints,
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
    MuiTextField,
  },
});

export { light, dark, colorPalette };
