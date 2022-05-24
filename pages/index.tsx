import { Button } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";
import { changeTheme } from "../lib/redux/slices/config";

const Home: MainLayoutType = () => {
  const dispatch = useDispatch();
  const changeThemeHandler = (name: string) => dispatch(changeTheme(name));

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link href="/about">Go</Link>
      <Button onClick={() => changeThemeHandler("light")}>Light</Button>
      <Button onClick={() => changeThemeHandler("dark")}>Dark</Button>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Home;
