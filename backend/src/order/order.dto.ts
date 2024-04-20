import { Prisma } from '@prisma/client';

export interface CreateOrderData {
  items: { id: number }[];
  combos: { id: number; items: { id: number }[] }[];
  totalPrice: number;
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
