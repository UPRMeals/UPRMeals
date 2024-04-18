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

  return {
    createItem,
  };
};
