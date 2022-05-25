import { createTheme } from "@mui/material/styles";

const MuiButton = {
  styleOverrides: {
    root: {
      fontWeight: "bold",
    },
  },
};

const light = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiButton: MuiButton,
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
