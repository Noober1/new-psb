import { useEffect } from "react";
import { NextPage } from "next";
import { runDevOnly } from "../../lib";
import { ReactElement } from "react";
import MainNavbar from "../organisms/MainNavbar";
import { AppBar } from "@mui/material";
import { Container } from "@mui/system";
import MainFooter from "../organisms/MainFooter";

const MainLayout = ({ children }: { children: ReactElement }) => {
  runDevOnly(() => {
    useEffect(() => {
      console.log("Rendering MainLayout");
    }, []);
  });

  return (
    <>
      <div className="pt-20">
        <MainNavbar />
        <main id="main-wrapper" className="mb-5">
          {children}
        </main>
      </div>
      <MainFooter />
    </>
  );
};

export type MainLayoutType<T = {}> = NextPage<T> & {
  getLayout: (page: ReactElement) => ReactElement;
};

export default MainLayout;
