import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const NAME = "config";

const configSlice = createSlice({
  name: NAME,
  initialState: {
    theme: "light",
  },
  reducers: {
    changeTheme(state, action) {
      state.theme = action.payload;
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

export const { changeTheme } = configSlice.actions;
export const selectConfig = (state) => state.config;
export default configSlice;
