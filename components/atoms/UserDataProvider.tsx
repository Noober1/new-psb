import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { QueryFunctionContext, useQuery } from "react-query";
import LoadingScreen from "./LoadingScreen";

type UserDataProvider = {
  children: React.ReactElement;
};

export type MainConfig = {
  id: number;
  year: number;
  isActive: boolean;
  date: {
    open: string;
    close: string;
  };
};

const UserDataProvider = ({ children }: UserDataProvider) => {
  const { data: session, status } = useSession();

  const fetchUserData = ({ signal }: QueryFunctionContext) =>
    axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/student/" + session?.id, {
      signal,
    });

  const { isLoading } = useQuery("user-data", fetchUserData, {
    enabled: status !== "loading" && status === "authenticated" ? true : false,
  });

  const { isLoading: mainDataLoading } = useQuery(
    "config",
    (data) => {
      return axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/current-config", {
          signal: data.signal,
        })
        .then((response) => response.data);
    },
    {
      enabled: status !== "loading",
    }
  );

  const showLoadingScreen =
    status === "loading" || isLoading || mainDataLoading;

  return (
    <>
      {children}
      {showLoadingScreen && <LoadingScreen position="fixed" />}
    </>
  );
};

export default UserDataProvider;
