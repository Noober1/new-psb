import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { QueryFunctionContext, useQuery } from "react-query";
import LoadingScreen from "./LoadingScreen";

type UserDataProvider = {
  children: React.ReactElement;
};

const UserDataProvider = ({ children }: UserDataProvider) => {
  const { data: session, status } = useSession();

  const fetchUserData = ({ signal }: QueryFunctionContext) =>
    axios.get(process.env.NEXT_PUBLIC_API_URL + "/v1/ppdb/profile", {
      headers: { Authorization: `Bearer ${session?.accessToken}` },
      signal,
    });

  const { isLoading } = useQuery("user-data", fetchUserData, {
    enabled: status !== "loading" && status === "authenticated" ? true : false,
  });

  // if session status is not loading or react query is not loading(querying successfully)
  if (status === "loading" || isLoading) return <LoadingScreen />;

  return children;
};

export default UserDataProvider;
