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

const MuiTypography = {
  styleOverrides: {
    h1: {
      fontFamily: "Inter",
    },
    h2: {
      fontFamily: "Inter",
    },
    h3: {
      fontFamily: "Inter",
    },
    h4: {
      fontFamily: "Inter",
    },
    h5: {
      fontFamily: "Inter",
    },
    h6: {
      fontFamily: "Inter",
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
    MuiTypography: MuiTypography,
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
    MuiTypography: MuiTypography,
  },
});

export { light, dark };
