import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectConfig, changeTheme } from "../../lib/redux/slices/config";

const useToggleDarkMode = () => {
  const { theme } = useSelector(selectConfig);
  const dispatch = useDispatch();
  const toggleDarkMode = () =>
    dispatch(changeTheme(theme === "light" ? "dark" : "light"));
  return [theme, toggleDarkMode];
};

export default useToggleDarkMode;
