import axios from "axios";

const fetchApi = (options: any) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (typeof options === "string") {
    options = {
      url: options,
    };
  }

  return new Promise(async (resolve, reject) => {
    try {
      const fetching = await instance(options);

      if (fetching.status < 200 || fetching.status > 299) {
        throw new Error(fetching.status.toString());
      }

      resolve(fetching.data);
    } catch (error) {
      reject(error);
    }
  });
};

export default fetchApi;
