import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { ReactElement } from "react";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";
import Hero from "../components/organisms/Hero";
import MainFooter from "../components/organisms/MainFooter";
import MainNavbar from "../components/organisms/MainNavbar";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Pendaftaran Siswa Baru(PSB) SMK Bina Taruna Jalancagak</title>
        <meta
          name="description"
          content="Selamat datang di situs Pendaftaran Siswa Baru(PSB) SMK Bina Taruna Jalancagak. Sekolah Menengah Kejuruan yang ada di Kota Subang - Jawa Barat."
        />
      </Head>
      <MainNavbar />
      <Hero />
      <MainFooter />
    </div>
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

// Home.getLayout = (page: ReactElement) => (
//   <>
//     <Head>
//       <title>Pendaftaran Siswa Baru(PSB) SMK Bina Taruna Jalancagak</title>
//       <meta
//         name="description"
//         content="Selamat datang di situs Pendaftaran Siswa Baru(PSB) SMK Bina Taruna Jalancagak. Sekolah Menengah Kejuruan yang ada di Kota Subang - Jawa Barat."
//       />
//     </Head>
//     <MainLayout>{page}</MainLayout>
//   </>
// );

export default Home;
