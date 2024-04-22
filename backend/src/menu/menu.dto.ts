import { Item } from '../item/item.dto';

export interface CreateMenuData {
  description?: string | null;
  name: string;
  date: Date;
}

export interface UpdateMenuInput extends CreateMenuData {}

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
  canBeEdited: boolean;
}

export interface Menu {
  id: number;
  name: string;
  date: Date;
  isActive: boolean;
  description: string;
  proteins: Item[];
  sides: Item[];
  combos: Combo[];
  canBeEdited: boolean;
}

export interface Combo {
  id: number;
  name: string;
  description: string;
  price: number;
  proteinCount: number;
  sideCount: number;
  proteins: Item[];
  sides: Item[];
}

export interface GetMenuWithItemsInput {
  id?: number;
  isActive: boolean;
}
