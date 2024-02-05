import { useBaseAPI } from "@/shared/hooks/useBaseAPI";

export const useAuthService = () => {
  const authControllerBase = "auth";
  const baseApi = useBaseAPI();

  const login = async (data: { test: string }) =>
    baseApi({ url: `${authControllerBase}/login`, method: "POST", data });

  return { login };
};
