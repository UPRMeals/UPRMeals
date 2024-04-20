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

  return {
    createCombo,
  };
};
