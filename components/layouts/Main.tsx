import { useEffect } from "react";
import { NextPage } from "next";
import { runDevOnly } from "../../lib";
import { ReactElement } from "react";
import MainNavbar from "../organisms/MainNavbar";

const MainLayout = ({ children }: { children: ReactElement }) => {
  runDevOnly(() => {
    useEffect(() => {
      console.log("Rendering MainLayout");
    }, []);
  });

  return (
    <>
      <MainNavbar />
      <main id="main-wrapper">{children}</main>
    </>
  );
};

export type MainLayoutType<T = {}> = NextPage<T> & {
  getLayout: (page: ReactElement) => ReactElement;
};

export default MainLayout;
