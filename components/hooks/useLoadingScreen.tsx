import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNoPersistConfig,
  showLoadingScreen,
  hideLoadingScreen,
  setLoadingScreenText,
} from "../../lib/redux/slices/noPersistConfig";

const useLoadingScreen = () => {
  const dispatch = useDispatch();
  const { loadingScreen, loadingScreenText } = useSelector(
    selectNoPersistConfig
  );
  const handleOpen = (text?: string) => {
    if (text) dispatch(setLoadingScreenText(text));
    dispatch(showLoadingScreen());
  };

  const handleClose = () => dispatch(hideLoadingScreen());

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loadingScreen) {
        dispatch(setLoadingScreenText(""));
      }
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [loadingScreen]);

  return [loadingScreen, handleOpen, handleClose, loadingScreenText];
};

export default useLoadingScreen;
