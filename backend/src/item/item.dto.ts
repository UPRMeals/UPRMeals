import { Item as PrismaItem, ItemType, Prisma } from '@prisma/client';

export interface Item extends PrismaItem {}

export interface CreateMenuItem {
  price: number;
  name: string;
  status: string;
  menuId: number;
  type: ItemType;
}
