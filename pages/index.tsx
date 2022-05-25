import { Button } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";
import ToggleDarkModeButton from "../components/atoms/ToggleDarkModeButton";
import ToggleLoginBoxButton from "../components/atoms/ToggleLoginBoxButton";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";

const Home: MainLayoutType = () => {
  return (
    <div className="grid grid-cols-4">
      <h1>Hello world!</h1>
      <Link href="/about">About</Link>
      <Link href="/login">Login</Link>
      <ToggleDarkModeButton />
      <ToggleLoginBoxButton buttonType="icon" />
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Home;
