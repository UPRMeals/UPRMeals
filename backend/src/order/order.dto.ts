import { OrderStatusType, Prisma } from '@prisma/client';
import { Combo } from '../menu/menu.dto';
import { Item } from '../item/item.dto';

export interface CreateOrderData {
  items: { id: number }[];
  combos: { id: number; items: { id: number }[] }[];
  totalPrice: number;
}

export interface CreateOrderResponse {
  orderId: number;
}

export type PrismaFindOrderResponse = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: {
        item: true;
      };
    };
    orderCombos: {
      include: {
        combo: true;
        orderComboItems: {
          include: {
            item: true;
          };
        };
      };
    };
  };
}>;

export interface SimplifiedOrder {
  id: number;
  userId: number;
  status: OrderStatusType;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  orderItems: Item[];
  orderCombos: Combo[];
}
