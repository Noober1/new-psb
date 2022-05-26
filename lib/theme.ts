import { createTheme } from "@mui/material/styles";

const MuiButton = {
  styleOverrides: {
    root: {
      boxShadow: "none",
      fontWeight: "bold",
    },
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
  palette: {
    mode: "light",
    primary: {
      main: "#28166F",
    },
    secondary: {
      main: "#FFF500",
    },
  },
  components: {
    MuiButton: MuiButton,
    MuiLink: MuiLink,
  },
});

const dark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3d20b2",
    },
    secondary: {
      main: "#FFF500",
    },
  },
  components: {
    MuiButton: MuiButton,
    MuiLink: MuiLink,
  },
});

export { light, dark };
