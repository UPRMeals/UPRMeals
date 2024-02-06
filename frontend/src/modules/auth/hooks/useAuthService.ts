import { useBaseAPI } from "@/shared/hooks/useBaseAPI";

export const useAuthService = () => {
  const authControllerBase = "auth";
  const baseApi = useBaseAPI();

  const login = async (data: {
    username: string;
    password: string;
  }): Promise<{ access_token: string }> =>
    baseApi({ url: `${authControllerBase}/login`, method: "POST", data });

  const getProfile = async () =>
    baseApi({
      url: `${authControllerBase}/profile`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  return { login, getProfile };
};
