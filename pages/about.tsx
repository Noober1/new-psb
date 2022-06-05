import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";

const About: MainLayoutType = () => {
  const { isLoading, data, isError, isFetching, isSuccess } = useQuery(
    "github-user",
    () => {
      return fetch("https://api.github.com/users/noober1").then((res) =>
        res.json()
      );
    }
  );

  return (
    <div>
      <div>About Page</div>
      <div>{isLoading ? "Loading..." : data.login}</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

About.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default About;
