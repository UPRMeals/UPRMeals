import { ForbiddenException, Injectable } from '@nestjs/common';
import { ItemType } from '@prisma/client';
import { Item } from '../item/item.dto';
import { PrismaService } from '../database/prisma.service';
import { CreateMenuCombo, UpdateComboData } from './combo.dto';
import { Combo } from './combo.dto';
import { Combo as MenuCombo } from '../menu/menu.dto';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class ComboService {
  constructor(
    private prismaService: PrismaService,
    private readonly menuService: MenuService,
  ) {}

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

  async deleteCombo(combo: Combo): Promise<Combo> {
    const existingMenu = await this.menuService.getMenuById(combo.menuId);
    if (!existingMenu.canBeEdited) {
      throw new ForbiddenException();
    }

    await this.prismaService.comboItem.updateMany({
      where: { comboId: combo.id },
      data: { removed: true },
    });

    const deletedCombo = await this.prismaService.combo.update({
      where: { id: combo.id },
      data: { removed: true },
    });

    return deletedCombo;
  }

  // Does not get removed items
  async getComboById(comboId: number, menuId: number): Promise<MenuCombo> {
    const comboData = await this.prismaService.combo.findFirst({
      where: { id: comboId, menuId: menuId },
      include: {
        comboItems: {
          where: { removed: false, item: { removed: false } },
          include: { item: true },
        },
      },
    });

    const proteins = [];
    const sides = [];

    comboData.comboItems.map((comboItem) => {
      const item = comboItem.item;

      if (item.type === ItemType.PROTEIN) {
        proteins.push({
          id: item.id,
          name: item.name,
          price: item.price,
          status: item.status,
          menuId: item.menuId,
        });
      } else if (item.type === ItemType.SIDE) {
        sides.push({
          id: item.id,
          name: item.name,
          price: item.price,
          status: item.status,
          menuId: item.menuId,
        });
      }
    });

    const { id, name, price, proteinCount, sideCount, description } = comboData;
    return {
      id,
      name,
      price,
      proteins,
      sides,
      proteinCount,
      sideCount,
      description,
    };
  }

  async updateCombo(
    comboId: number,
    comboData: UpdateComboData,
    newItemIds: number[],
    menuId: number,
  ): Promise<Combo> {
    const existingMenu = await this.menuService.getMenuById(menuId);
    if (!existingMenu.canBeEdited) {
      throw new ForbiddenException();
    }

    const existingCombo = await this.getComboById(comboId, menuId);
    const existingProteins = existingCombo.proteins.map(
      (protein) => protein.id,
    );
    const existingSides = existingCombo.sides.map((side) => side.id);

    // Ids of the items we need to remove
    const itemsToRemove = [...existingProteins, ...existingSides].filter(
      (itemId) => !newItemIds.includes(itemId),
    );

    // Delete Combo Item rows
    await this.prismaService.comboItem.deleteMany({
      where: { itemId: { in: itemsToRemove } },
    });

    // Ids of the items we need to add
    const itemsToAdd = newItemIds.filter(
      (itemId) => ![...existingProteins, ...existingSides].includes(itemId),
    );

    await this.prismaService.comboItem.createMany({
      data: itemsToAdd.map((itemId) => ({
        comboId: comboId,
        itemId: itemId,
      })),
    });

    const { name, description, sideCount, proteinCount, price } = comboData;

    const updatedCombo = await this.prismaService.combo.update({
      where: { id: comboId },
      data: { name, description, sideCount, proteinCount, price },
    });

    return updatedCombo;
  }
}
