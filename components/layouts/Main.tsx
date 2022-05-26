import { useEffect } from "react";
import { NextPage } from "next";
import { runDevOnly } from "../../lib";
import { ReactElement } from "react";
import MainNavbar from "../organisms/MainNavbar";

const MainLayout = ({ children }: { children: ReactElement }) => {
  useEffect(() => {
    runDevOnly(() => {
      console.log("Rendering MainLayout");
    });
  }, []);

  return (
    <>
      <MainNavbar />
      <main>{children}</main>
    </>
  );
};

export type MainLayoutType = NextPage & {
  getLayout: (page: ReactElement) => ReactElement;
};

export default MainLayout;
