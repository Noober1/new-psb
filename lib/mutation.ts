import axios from "axios";
import {
  MutationKey,
  QueryFunctionContext,
  useMutation as queryMutation,
} from "react-query";

export const useMutation = <T extends object>(
  url: string,
  type: "add" | "edit" = "add",
  key?: MutationKey
) => {
  return queryMutation({
    mutationFn: async (data: T) => {
      const response = await axios({
        method: type == "add" ? "POST" : "PUT",
        url: process.env.NEXT_PUBLIC_API_URL + url,
        data,
      });
      if (!response) {
        throw new Error("Error add data");
      }
    },
    mutationKey: key,
  });
};
