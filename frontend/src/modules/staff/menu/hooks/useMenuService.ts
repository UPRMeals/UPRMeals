import { useBaseAPI } from "@/shared/hooks/useBaseAPI";
import {
  CreateMenuData,
  CreateMenuItemData,
  CreateMenuItemResponse,
  MenuResponse,
} from "../../../../../../backend/src/menu/menu.dto";

export const useMenuService = () => {
  const menuControllerBase = "menu";
  const baseApi = useBaseAPI();

  const createMenu = async (data: CreateMenuData): Promise<MenuResponse> =>
    baseApi({
      url: `${menuControllerBase}/`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data,
    });

  const getMenu = async (menuId: number): Promise<MenuResponse> =>
    baseApi({
      url: `${menuControllerBase}/${menuId}/menu`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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

  return { createMenu, getMenu, createMenuItem };
};
