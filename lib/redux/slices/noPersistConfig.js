import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const NAME = "noPersistConfig";

const noPersistConfig = createSlice({
  name: NAME,
  initialState: {
    loadingScreen: false,
    showAuthBox: false,
    authBoxMenuView: "login",
    snackbar: {
      open: false,
      message: "No message",
      positionX: "left",
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
    toggleLoginBox(state) {
      state.showAuthBox = !state.showAuthBox;
    },
    setAuthBoxMenuView(state, action) {
      state.authBoxMenuView = action.payload;
    },
    openSnackbar(state, action) {
      const { positionX, positionY, message, severity } = action.payload;
      state.snackbar.positionX = positionX || "right";
      state.snackbar.positionY = positionY || "top";
      state.snackbar.message = message || "No message";
      state.snackbar.severity = severity || "info";
      state.snackbar.open = true;
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
  toggleLoginBox,
  setAuthBoxMenuView,
  openSnackbar,
  closeSnackbar,
} = noPersistConfig.actions;

export const selectNoPersistConfig = (state) => state.noPersistConfig;

export default noPersistConfig;
