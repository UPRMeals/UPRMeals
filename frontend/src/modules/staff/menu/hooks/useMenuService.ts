import { useBaseAPI } from "@/shared/hooks/useBaseAPI";
import {
  CreateMenuData,
  CreateMenuItemData,
  CreateMenuItemResponse,
  CreateMenuResponse,
} from "../../../../../../backend/src/menu/menu.dto";

export const useMenuService = () => {
  const menuControllerBase = "menu";
  const baseApi = useBaseAPI();

  const createMenu = async (
    data: CreateMenuData
  ): Promise<CreateMenuResponse> =>
    baseApi({
      url: `${menuControllerBase}/`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data,
    });

  // TODO: Make sure this works - WIP
  const createMenuItem = async (
    menuId: number,
    data: CreateMenuItemData
  ): Promise<CreateMenuItemResponse> =>
    baseApi({
      url: `${menuControllerBase}/${menuId}/item`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data,
    });

  return { createMenu, createMenuItem };
};
