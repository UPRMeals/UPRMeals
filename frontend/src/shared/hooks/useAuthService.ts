import { useBaseAPI } from "../../shared/hooks/useBaseAPI";
import { SignUpDto } from "../../../../backend/src/auth/auth.dto";
import { LogInDto } from "../../../../backend/src/auth/auth.dto";

export const useAuthService = () => {
  const authControllerBase = "auth";
  const baseApi = useBaseAPI();

  const signUp = async (
    data: SignUpDto
  ): Promise<{ access_token: string; error?: string }> =>
    baseApi({ url: `${authControllerBase}/sign-up`, method: "POST", data });

  const logIn = async (
    data: LogInDto
  ): Promise<{ access_token: string; error?: string }> =>
    baseApi({ url: `${authControllerBase}/log-in`, method: "POST", data });

  const logOut = async () =>
    baseApi({
      url: `${authControllerBase}/log-out`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  return { signUp, logIn, logOut };
};
