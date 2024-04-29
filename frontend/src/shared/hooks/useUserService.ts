import { useBaseAPI } from "../../shared/hooks/useBaseAPI";
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

  const getProfileById = async (userId: number): Promise<UserProfile> =>
    baseApi({
      url: `${userControllerBase}/profile/${userId}`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  const removeUser = async (): Promise<UserProfile> =>
    baseApi({
      url: `${userControllerBase}/remove`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  const getCustomerProfiles = async (): Promise<UserProfile[]> =>
    baseApi({
      url: `${userControllerBase}/customerProfiles`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  const getEmployeeProfiles = async (): Promise<UserProfile[]> =>
    baseApi({
      url: `${userControllerBase}/employeeProfiles`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  const setEmployee = async (userId: number): Promise<UserProfile> =>
    baseApi({
      url: `${userControllerBase}/employee/${userId}/set`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  const removeEmployee = async (userId: number): Promise<UserProfile> =>
    baseApi({
      url: `${userControllerBase}/employee/${userId}/remove`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  const flagCustomer = async (userId: number): Promise<UserProfile> =>
    baseApi({
      url: `${userControllerBase}/customer/${userId}/flag`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  const unflagCustomer = async (userId: number): Promise<UserProfile> =>
    baseApi({
      url: `${userControllerBase}/customer/${userId}/unflag`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  return {
    getProfile,
    getProfileById,
    removeUser,
    getCustomerProfiles,
    getEmployeeProfiles,
    setEmployee,
    removeEmployee,
    flagCustomer,
    unflagCustomer,
  };
};
