import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { ReactElement } from "react";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";
import Hero from "../components/organisms/Hero";
import MainFooter from "../components/organisms/MainFooter";
import MainNavbar from "../components/organisms/MainNavbar";

const Home = () => {
  return (
    <>
      <NextSeo
        title="Pendaftaran Siswa Baru(PSB)"
        description="Selamat datang di situs Pendaftaran Siswa Baru(PSB) SMK Bina Taruna Jalancagak. Sekolah Menengah Kejuruan yang ada di Kota Subang - Jawa Barat."
      />
      <MainNavbar />
      <Hero />
      <MainFooter />
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

export default Home;
