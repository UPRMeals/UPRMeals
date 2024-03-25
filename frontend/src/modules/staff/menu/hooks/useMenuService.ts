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

  const getAllMenus = async (): Promise<MenuResponse[]> =>
    baseApi({
      url: `${menuControllerBase}/menus`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  const deleteMenu = async (menuId: number): Promise<MenuResponse> =>
    baseApi({
      url: `${menuControllerBase}/menus/${menuId}/delete`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

  return { createMenu, getMenu, getAllMenus, deleteMenu };
};
