import { useDispatch } from "react-redux";
import {
  openLoginPopup,
  closeLoginPopup,
} from "../../lib/redux/slices/noPersistConfig";

const useLoginPopup = () => {
  const dispatch = useDispatch();
  const handleOpenLoginPopup: any = () => {
    dispatch(openLoginPopup());
  };
  const handleCloseLoginPopup: any = () => {
    dispatch(closeLoginPopup());
  };
  return [handleOpenLoginPopup, handleCloseLoginPopup];
};

export default useLoginPopup;
