import { useSession } from "next-auth/react";
import Head from "next/head";
import { ReactElement, useEffect } from "react";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";
import Hero from "../components/organisms/Hero";

const Home: MainLayoutType = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <>
      <Head>
        <title>Pendaftaran Siswa Baru(PSB) SMK Bina Taruna Jalancagak</title>
      </Head>
      <div className="grid-grid-cols-1 bg-red-400">
        <Hero />
      </div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Home;
