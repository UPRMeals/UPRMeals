import { Combo as PrismaCombo } from '@prisma/client';

export interface CreateComboInput {
  comboData: CreateMenuCombo;
  itemIds: number[];
}

export interface CreateMenuCombo {
  name: string;
  description: string;
  price: number;
  proteinCount: number;
  sideCount: number;
  menuId: number;
}

export interface Combo extends PrismaCombo {}