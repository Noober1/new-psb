import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const NAME = "noPersistConfig";

const noPersistConfig = createSlice({
  name: NAME,
  initialState: {
    loadingScreen: false,
    showLoginBox: false,
  },
  reducers: {
    showLoadingScreen(state) {
      state.loadingScreen = true;
    },
    hideLoadingScreen(state) {
      state.loadingScreen = false;
    },
    toggleLoginBox(state) {
      state.showLoginBox = !state.showLoginBox;
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

export const { showLoadingScreen, hideLoadingScreen, toggleLoginBox } =
  noPersistConfig.actions;

export const selectNoPersistConfig = (state) => state.noPersistConfig;

export default noPersistConfig;
