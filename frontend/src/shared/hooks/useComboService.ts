import { useBaseAPI } from "../../shared/hooks/useBaseAPI";
import {
  Combo,
  CreateMenuCombo,
} from "../../../../backend/src/combo/combo.dto";
import { CreateMenuItem } from "../../../../backend/src/item/item.dto";

export const useComboService = () => {
  const comboControllerBase = "combo";
  const baseApi = useBaseAPI();

  const createCombo = async (
    comboData: CreateMenuCombo,
    itemData: CreateMenuItem[]
  ): Promise<Combo> =>
    baseApi({
      url: `${comboControllerBase}/`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: { comboData, itemData },
    });

  return {
    createCombo,
  };
};
