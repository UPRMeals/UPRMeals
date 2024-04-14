import { useBaseAPI } from "@/shared/hooks/useBaseAPI";
import { UserProfile } from "../../../../backend/src/user/user.dto";

export const useUserService = () => {
  const userControllerBase = "user";
  const baseApi = useBaseAPI();

  const getProfile = async (): Promise<UserProfile> =>
    baseApi({
      url: `${userControllerBase}/profile`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  const removeUser = async (): Promise<UserProfile> =>
    baseApi({
      url: `${userControllerBase}/remove`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  return { getProfile, removeUser };
};
