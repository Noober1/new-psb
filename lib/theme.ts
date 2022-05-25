import { createTheme } from "@mui/material/styles";

const MuiButton = {
  styleOverrides: {
    root: {
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
  },
  components: {
    MuiButton: MuiButton,
    MuiLink: MuiLink,
  },
});

const dark = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: MuiButton,
  },
});

export { light, dark };
