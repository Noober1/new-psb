import { useDispatch } from "react-redux";
import { toggleLoginBox } from "../../lib/redux/slices/noPersistConfig";

const useToggleOpenLoginBox = () => {
  const dispatch = useDispatch();
  const ToggleOpenLoginBox = () => dispatch(toggleLoginBox());
  return ToggleOpenLoginBox;
};

export default useToggleOpenLoginBox;
