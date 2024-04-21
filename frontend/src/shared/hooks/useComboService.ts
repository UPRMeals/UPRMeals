import { useBaseAPI } from "../../shared/hooks/useBaseAPI";
import {
  Combo,
  CreateMenuCombo,
} from "../../../../backend/src/combo/combo.dto";

export const useComboService = () => {
  const comboControllerBase = "combo";
  const baseApi = useBaseAPI();

  const createCombo = async (
    comboData: CreateMenuCombo,
    itemIds: number[]
  ): Promise<Combo> =>
    baseApi({
      url: `${comboControllerBase}/`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: { comboData, itemIds },
    });

  const deleteCombo = async (data: Combo): Promise<Combo> =>
    baseApi({
      url: `${comboControllerBase}/${data.id}/delete`,
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data,
    });

  return {
    createCombo,
    deleteCombo,
  };
};
