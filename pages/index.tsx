import { Button } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";
import ToggleDarkModeButton from "../components/atoms/ToggleDarkModeButton";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";

const Home: MainLayoutType = () => {
  return (
    <div>
      <h1>Hello world!</h1>
      <Link href="/about">About</Link>
      <Link href="/login">Login</Link>
      <ToggleDarkModeButton />
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Home;
