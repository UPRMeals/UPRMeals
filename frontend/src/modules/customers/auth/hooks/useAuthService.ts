import { useBaseAPI } from "@/shared/hooks/useBaseAPI";
import { SignUpFormType } from "../login/config";

export const useAuthService = () => {
  const authControllerBase = "auth";
  const baseApi = useBaseAPI();

  const signUp = async (
    data: SignUpFormType
  ): Promise<{ access_token: string; error?: string }> =>
    baseApi({ url: `${authControllerBase}/sign-up`, method: "POST", data });

  const logIn = async (data: {
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

  return { signUp, logIn, getProfile };
};
