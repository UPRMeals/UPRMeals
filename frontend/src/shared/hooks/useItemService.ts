import { useBaseAPI } from "../../shared/hooks/useBaseAPI";
import { CreateMenuItem, Item } from "../../../../backend/src/item/item.dto";

export const useItemService = () => {
  const itemControllerBase = "item";
  const baseApi = useBaseAPI();

  const createItem = async (data: CreateMenuItem): Promise<Item> =>
    baseApi({
      url: `${itemControllerBase}/`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data,
    });

  const updateItem = async (data: Item): Promise<Item> =>
    baseApi({
      url: `${itemControllerBase}/${data.id}/update`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data,
    });

  const deleteItem = async (data: Item): Promise<Item | { error: string }> =>
    baseApi({
      url: `${itemControllerBase}/${data.id}/delete`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data,
    });

  return {
    createItem,
    updateItem,
    deleteItem,
  };
};
