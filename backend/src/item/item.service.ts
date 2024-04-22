import { ForbiddenException, Injectable } from '@nestjs/common';
import { Item, ItemType } from '@prisma/client';
import { ComboService } from '../combo/combo.service';
import { MenuService } from '../menu/menu.service';
import { PrismaService } from '../database/prisma.service';
import { CreateMenuItem } from './item.dto';

@Injectable()
export class ItemService {
  constructor(
    private prismaService: PrismaService,
    private readonly comboService: ComboService,
    private readonly menuService: MenuService,
  ) {}

  async createItem(data: CreateMenuItem): Promise<Item> {
    const item = await this.prismaService.item.create({
      data: { ...data, removed: false },
    });
    return item;
  }

  async updateItem(data: Item): Promise<Item> {
    const existingMenu = await this.menuService.getMenuById(data.menuId);
    if (!existingMenu.canBeEdited) {
      throw new ForbiddenException();
    }

    const { id, name, price, menuId, status, removed } = data;
    const item = await this.prismaService.item.update({
      where: { id, menuId },
      data: { name, price, status, removed },
    });
    return item;
  }

  async deleteItem(data: Item): Promise<Item | { error: string }> {
    const existingMenu = await this.menuService.getMenuById(data.menuId);
    if (!existingMenu.canBeEdited) {
      throw new ForbiddenException();
    }

    // Determine if removing this item would go under the protein or side count
    const combosUsingItem = await this.comboService.getCombosByItem(data);

    let error = '';
    const promises = combosUsingItem.flatMap(async (comboData) => {
      const comboItems = await this.comboService.getComboItems(comboData);
      const filteredComboItems = comboItems.filter(
        (ci) => ci.type === data.type,
      );
      const filterByCount =
        data.type === ItemType.PROTEIN
          ? comboData.proteinCount
          : comboData.sideCount;
      console.log(comboData.name, filteredComboItems.length, filterByCount);
      if (filteredComboItems.length - 1 < filterByCount) {
        error = 'No se puede remover un articulo que pertence al menu.';
      }
    });

    await Promise.allSettled(promises);

    if (error) {
      return { error };
    }

    const { id, name, price, menuId, status } = data;
    const item = await this.prismaService.item.update({
      where: { id, menuId },
      data: { name, price, status, removed: true },
    });
    return item;
  }
}
