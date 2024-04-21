import { useBaseAPI } from "../../shared/hooks/useBaseAPI";

import {
  CreateOrderData,
  CreateOrderResponse,
  SimplifiedOrder,
} from "../../../../backend/src/order/order.dto";

export const useOrderService = () => {
  const orderControllerBase = "order";
  const baseApi = useBaseAPI();

  const createOrder = async (
    data: CreateOrderData
  ): Promise<CreateOrderResponse> =>
    baseApi({
      url: `${orderControllerBase}/`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data,
    });

  const getTodaysOrders = async (): Promise<any> =>
    baseApi({
      url: `${orderControllerBase}/today`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

  const getOrder = (orderId: string): Promise<SimplifiedOrder> =>
    baseApi({
      url: `${orderControllerBase}/${orderId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

  const getAllOrdersForUser = async (): Promise<SimplifiedOrder[]> =>
    baseApi({
      url: `${orderControllerBase}/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

  return {
    createOrder,
    getOrder,
    getAllOrdersForUser,
    getTodaysOrders,
  };
};
