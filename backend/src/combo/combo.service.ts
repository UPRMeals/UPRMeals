import { Injectable } from '@nestjs/common';
import { Combo } from '@prisma/client';
import { Item } from 'src/item/item.dto';
import { PrismaService } from '../database/prisma.service';
import { CreateMenuCombo } from './combo.dto';

@Injectable()
export class ComboService {
  constructor(private prismaService: PrismaService) {}

  async createCombo(
    comboData: CreateMenuCombo,
    itemIds: number[],
  ): Promise<Combo> {
    const comboItems = itemIds.map((id) => {
      return { itemId: id, removed: false };
    });

    const combo = await this.prismaService.combo.create({
      data: {
        ...comboData,
        comboItems: {
          create: comboItems,
        },
      },
      include: {
        menu: true,
        comboItems: {
          include: {
            item: true,
          },
        },
      },
    });

    return combo;
  }

  async getCombosByItem(item: Item) {
    const comboItems = await this.prismaService.comboItem.findMany({
      where: {
        itemId: item.id,
        removed: false,
        combo: { removed: false, menuId: item.menuId },
      },
      include: { combo: true },
    });

    const combos = comboItems.map((data) => {
      return data.combo;
    });

    return combos;
  }

  async getComboItems(combo: Combo) {
    const comboItems = await this.prismaService.comboItem.findMany({
      where: {
        comboId: combo.id,
        item: { removed: false, menuId: combo.menuId },
      },
      include: { item: true },
    });

    const items = comboItems.map((comboItem) => {
      return comboItem.item;
    });

    return items;
  }
}
