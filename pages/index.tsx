import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { ReactElement } from "react";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";
import Hero from "../components/organisms/Hero";

const Home: MainLayoutType = () => {
  return (
    <>
      <Head>
        <title>Pendaftaran Siswa Baru(PSB) SMK Bina Taruna Jalancagak</title>
      </Head>
      <div className="grid-grid-cols-1">
        <Hero />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Home;
