import { Item, Prisma } from '@prisma/client';

export interface CreateOrderData {
  items: { id: number }[];
  combos: { id: number; items: { id: number }[] }[];
  totalPrice: number;
}
