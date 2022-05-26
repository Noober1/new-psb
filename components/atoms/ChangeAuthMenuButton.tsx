import {
  Children,
  cloneElement,
  MouseEvent,
  ReactElement,
  ReactNode,
} from "react";
import { useDispatch } from "react-redux";
import { setAuthBoxMenuView } from "../../lib/redux/slices/noPersistConfig";
import { AuthMenuType } from "../layouts/AuthBoxPopup";

type ChangeAuthMenuButton = {
  type: AuthMenuType;
  children: ReactNode;
};

const ChangeAuthMenuButton = ({ type, children }: ChangeAuthMenuButton) => {
  const dispatch = useDispatch();
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    dispatch(setAuthBoxMenuView(type));
  };

  return (
    <>
      {cloneElement(children as ReactElement, {
        onClick: handleClick,
      })}
    </>
  );
};

export default ChangeAuthMenuButton;
