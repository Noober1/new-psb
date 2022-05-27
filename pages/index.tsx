import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { ReactElement, useEffect } from "react";
import { QueryFunctionContext, useQuery } from "react-query";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";
import Hero from "../components/organisms/Hero";
import { runDevOnly } from "../lib";

const Home: MainLayoutType = () => {
  // const { data: session } = useSession();

  // const fetchUserData = ({ signal }: QueryFunctionContext) =>
  //   axios.get(process.env.NEXT_PUBLIC_API_URL + "/v1/ppdb/profile", {
  //     headers: { Authorization: `Bearer ${session.accessToken}` },
  //   });

  // const { isLoading, data, isError, isFetching, isIdle, isSuccess } = useQuery(
  //   "user-data",
  //   fetchUserData,
  //   {
  //     enabled: session?.accessToken ? true : false,
  //     refetchInterval: 5000,
  //   }
  // );

  // runDevOnly(() => {
  //   useEffect(() => {
  //     console.log("session", session);
  //   }, [session]);
  // useEffect(() => {
  //   console.log("isIdle", isIdle);
  // }, [isIdle]);
  // });

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
