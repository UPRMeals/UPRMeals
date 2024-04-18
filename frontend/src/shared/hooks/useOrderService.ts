import { useBaseAPI } from "../../shared/hooks/useBaseAPI";

import { CreateOrderData } from "../../../../backend/src/order/order.dto";

export const useOrderService = () => {
  const userControllerBase = "order";
  const baseApi = useBaseAPI();

  const createOrder = async (data: CreateOrderData): Promise<any> =>
    baseApi({
      url: `${userControllerBase}/`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data,
    });

  return {
    createOrder,
  };
};
