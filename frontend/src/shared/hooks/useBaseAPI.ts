import axios, { Method } from "axios";
import { useErrorContext } from "../providers/ErrorProvider";
import toast from "react-hot-toast";

interface useBaseAPIProps {
  url: string;
  method: Method;
  data?: unknown;
  headers?: Record<string, string | number | boolean>;
}

export const useBaseAPI = () => {
  const errorContext = useErrorContext();
  const backendUrl = getApiConfig(process.env.NODE_ENV).nestBackendUrl;
  const request = async <T>(params: useBaseAPIProps) => {
    try {
      let url = `${backendUrl}/${params.url}`;
      const request = await axios.request<T>({ ...params, url });
      return request.data;
    } catch (error: any) {
      errorContext.displayError(error);
      console.log("AxiosError: ", error);
      return error as T;
    }
  };
  return request;
};

const devConfig = {
  nestBackendUrl: process.env.BACKEND_URL_LOCAL,
};

const prodConfig = {
  nestBackendUrl: "https://uprmeals-production.up.railway.app",
};

const getApiConfig = (node_env: string) => {
  switch (node_env) {
    case "dev":
      return devConfig;
    case "production":
      return prodConfig;
    default:
      return devConfig;
  }
};
