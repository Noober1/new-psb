import { AxiosResponse } from "axios";
import { SessionContextValue, useSession } from "next-auth/react";
import { useQueryClient } from "react-query";
import { BioEditProgress } from "../../types/bio";

interface UserdataQuery {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  bioEditComplete: BioEditProgress;
}

type UseUserData = [UserdataQuery, SessionContextValue["status"], any];

const useUserData = () => {
  const queryClient = useQueryClient();
  const { status } = useSession();
  const state = queryClient.getQueryState("user-data");
  const data = queryClient.getQueryData<AxiosResponse>("user-data");
  const result: UseUserData = [data?.data, status, state];
  return result;
};

export default useUserData;
