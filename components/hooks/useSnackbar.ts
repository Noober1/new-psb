import { useDispatch } from "react-redux";
import {
  closeSnackbar,
  openSnackbar,
} from "../../lib/redux/slices/noPersistConfig";

type useSnackbarProps = {
  positionX?: "left" | "right" | "center";
  positionY?: "top" | "bottom";
  message?: string;
  severity?: "success" | "info" | "warning" | "error";
};
/**
 * main snackbar hook
 * @returns Object
 */
const useSnackbar = () => {
  const dispatch = useDispatch();
  const handleOpenSnackbar = (options: useSnackbarProps) => {
    dispatch(
      openSnackbar({
        positionX: options.positionX,
        positionY: options.positionY,
        message: options.message,
        severity: options.severity,
      })
    );
  };

  const handleCloseSnackbar = () => {
    dispatch(closeSnackbar());
  };

  return { handleOpenSnackbar, handleCloseSnackbar };
};

export default useSnackbar;
