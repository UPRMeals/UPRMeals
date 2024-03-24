import { Injectable } from '@nestjs/common';
import { ItemType, Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import {
  ActiveMenuResponse,
  CreateMenuItemResponse,
  MenuResponse,
} from './menu.dto';

@Injectable()
export class MenuService {
  constructor(private prismaService: PrismaService) {}

  async createMenu(data: Prisma.MenuCreateArgs): Promise<MenuResponse> {
    const menu = await this.prismaService.menu.create(data);
    return menu;
  }

  async getMenuById(menuId: number): Promise<MenuResponse> {
    const menu = await this.prismaService.menu.findUnique({
      where: { id: menuId, removed: false },
    });
    return menu;
  }

  async getActiveMenu(): Promise<ActiveMenuResponse> {
    const tempMenuResponse = await this.prismaService.menu.findFirst({
      where: { isActive: true, removed: false },
      include: {
        items: true,
        combos: {
          include: { items: { include: { item: true } } },
          orderBy: { price: 'asc' },
        },
      },
    });
    const sides = tempMenuResponse.items.filter(
      (item) => item.type === ItemType.SIDE,
    );

    const proteins = tempMenuResponse.items.filter(
      (item) => item.type === ItemType.PROTEIN,
    );

    const combos = tempMenuResponse.combos.map((combo) => {
      return {
        name: combo.name,
        description: combo.description,
        price: combo.price,
        proteinCount: combo.proteinCount,
        sideCount: combo.sideCount,
        proteins: combo.items
          .map(({ item }) => {
            if (item.type === ItemType.PROTEIN) return item;
          })
          .filter(Boolean),
        sides: combo.items
          .map(({ item }) => {
            if (item.type === ItemType.SIDE) return item;
          })
          .filter(Boolean),
      };
    });

    return {
      name: tempMenuResponse.name,
      date: tempMenuResponse.date,
      proteins,
      sides,
      combos,
    };
  }

  // TODO: Make sure this works - WIP
  // This needs a menu item type
  async createMenuItem(
    data: Prisma.ItemCreateArgs,
  ): Promise<CreateMenuItemResponse> {
    const menuItem = await this.prismaService.item.create(data);

    return menuItem;
  }
}
