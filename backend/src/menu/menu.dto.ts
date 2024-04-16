import { Item as PrismaItem } from '@prisma/client';

export interface CreateMenuData {
  description?: string | null;
  name: string;
  date: Date;
}

export interface MenuResponse {
  id: number;
  name: string;
  description: string;
  date: Date;
  createdAt: Date;
  removed: boolean;
}

export interface GetAllMenusResponse {
  id: number;
  name: string;
  description: string;
  date: Date;
  createdAt: Date;
  removed: boolean;
  isActive: boolean;
  items: Item[];
  combos: Combo[];
}

export interface CreateMenuItemData {
  price: number;
  description: string;
  name: string;
  type: string; // This should be an enum
}

export interface CreateMenuItemResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  status: string;
  removed: boolean;
  menuId: number;
}

export interface Menu {
  name: string;
  date: Date;
  proteins: Item[];
  sides: Item[];
  combos: Combo[];
}

export interface Combo {
  name: string;
  description: string;
  price: number;
  proteinCount: number;
  sideCount: number;
  proteins: Item[];
  sides: Item[];
}

export interface Item extends PrismaItem {}
