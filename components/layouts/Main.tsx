import { Paper } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NextPage } from "next";
import { runDevOnly } from "../../lib";
import { selectConfig } from "../../lib/redux/slices/config";
import { ReactElement } from "react";

const MainLayout = ({ children }: { children: ReactElement }) => {
  const config = useSelector(selectConfig);

  useEffect(() => {
    runDevOnly(() => {
      console.log("Rendering MainLayout");
    });
  }, []);

  return (
    <Paper variant="elevation">
      {config.theme}
      <main>{children}</main>
    </Paper>
  );
};

export type MainLayoutType = NextPage & {
  getLayout: (page: ReactElement) => ReactElement;
};

export default MainLayout;
