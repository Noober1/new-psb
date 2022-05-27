import { SessionContextValue, useSession } from "next-auth/react";
import { useQueryClient } from "react-query";

type UseUserData = [any, SessionContextValue["status"], any];

const useUserData = () => {
  const queryClient = useQueryClient();
  const { status } = useSession();
  const state = queryClient.getQueryState("user-data");
  const data = queryClient.getQueryData<any>("user-data");
  const result: UseUserData = [data?.data, status, state];
  return result;
};

export default useUserData;
