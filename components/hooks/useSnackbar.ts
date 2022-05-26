import { useDispatch } from "react-redux";
import {
  closeSnackbar,
  openSnackbar,
} from "../../lib/redux/slices/noPersistConfig";

type useSnackbarProps = {
  positionX?: "left" | "right";
  positionY?: "top" | "bottom";
  message?: string;
  severity?: "success" | "info" | "warning" | "error";
};

const useSnackbar = (props: useSnackbarProps) => {
  const dispatch = useDispatch();
  const handleOpenSnackbar = () => {
    dispatch(
      openSnackbar({
        positionX: props.positionX,
        positionY: props.positionY,
        message: props.message,
        severity: props.severity,
      })
    );
  };

  const handleCloseSnackbar = () => {
    dispatch(closeSnackbar());
  };

  return [handleOpenSnackbar, handleCloseSnackbar];
};

useSnackbar.defaultProps = {
  positionX: "left",
  positionY: "bottom",
  message: "No message",
  severity: "info",
};

export default useSnackbar;
