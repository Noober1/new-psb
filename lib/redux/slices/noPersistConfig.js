import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const NAME = "noPersistConfig";

const noPersistConfig = createSlice({
  name: NAME,
  initialState: {
    loadingScreen: false,
    loadingScreenText: "",
    showAuthBox: false,
    snackbar: {
      open: false,
      message: "No message",
      positionX: "center",
      positionY: "top",
      severity: "info",
    },
  },
  reducers: {
    showLoadingScreen(state) {
      state.loadingScreen = true;
    },
    hideLoadingScreen(state) {
      state.loadingScreen = false;
    },
    setLoadingScreenText(state, action) {
      state.loadingScreenText = action.payload;
    },
    openLoginPopup(state) {
      state.showAuthBox = true;
    },
    closeLoginPopup(state) {
      state.showAuthBox = false;
    },
    toggleLoginPopup(state) {
      state.showAuthBox = false;
    },
    openSnackbar(state, action) {
      const { positionX, positionY, message, severity } = action.payload;
      state.snackbar = {
        open: true,
        positionX: positionX || "center",
        positionY: positionY || "top",
        message: message || "No message",
        severity: severity || "info",
      };
    },
    closeSnackbar(state) {
      state.snackbar.open = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload[NAME],
      };
    },
  },
});

export const {
  showLoadingScreen,
  hideLoadingScreen,
  openLoginPopup,
  closeLoginPopup,
  toggleLoginPopup,
  openSnackbar,
  closeSnackbar,
  setLoadingScreenText,
} = noPersistConfig.actions;

export const selectNoPersistConfig = (state) => state.noPersistConfig;

export default noPersistConfig;
