import { Injectable } from '@nestjs/common';
import { ItemType, Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import {
  Menu,
  MenuResponse,
  GetAllMenusResponse,
  GetMenuWithItemsInput,
} from './menu.dto';

@Injectable()
export class MenuService {
  constructor(private prismaService: PrismaService) {}

  async createMenu(data: Prisma.MenuCreateArgs): Promise<MenuResponse> {
    const menu = await this.prismaService.menu.create(data);
    return menu;
  }

  async getAllMenus(): Promise<GetAllMenusResponse[]> {
    const menusResponse = await this.prismaService.menu.findMany({
      where: { removed: false },
      orderBy: { date: 'desc' },
      include: {
        items: { orderBy: { type: 'asc' } },
        combos: {
          include: { comboItems: { include: { item: true } } },
          orderBy: { price: 'asc' },
        },
      },
    });

    const menus = menusResponse.map((menu) => {
      const combos = menu.combos.map((combo) => {
        return {
          id: combo.id,
          name: combo.name,
          description: combo.description,
          price: combo.price,
          proteinCount: combo.proteinCount,
          sideCount: combo.sideCount,
          proteins: combo.comboItems
            .map(({ item }) => {
              if (item.type === ItemType.PROTEIN) return item;
            })
            .filter(Boolean),
          sides: combo.comboItems
            .map(({ item }) => {
              if (item.type === ItemType.SIDE) return item;
            })
            .filter(Boolean),
        };
      });

      return {
        id: menu.id,
        name: menu.name,
        description: menu.description,
        date: menu.date,
        createdAt: menu.createdAt,
        removed: menu.removed,
        isActive: menu.isActive,
        items: menu.items,
        combos: combos,
      };
    });

    return menus;
  }

  async getMenuById(menuId: number): Promise<Menu> {
    const menu = await this.getMenuWithItems({ id: menuId });
    return menu;
  }

  async getActiveMenu(): Promise<Menu> {
    const activeMenu = this.getMenuWithItems({ isActive: true });
    return activeMenu;
  }

  private async getMenuWithItems(where: Prisma.MenuWhereInput): Promise<Menu> {
    const tempMenuResponse = await this.prismaService.menu.findFirst({
      where: { ...where, removed: false },
      include: {
        items: { where: { removed: false } },
        combos: {
          where: { removed: false },
          include: {
            comboItems: {
              where: { removed: false, item: { removed: false } },
              include: { item: true },
            },
          },
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
        id: combo.id,
        name: combo.name,
        description: combo.description,
        price: combo.price,
        proteinCount: combo.proteinCount,
        sideCount: combo.sideCount,
        proteins: combo.comboItems
          .map(({ item }) => {
            if (item.type === ItemType.PROTEIN) return item;
          })
          .filter(Boolean),
        sides: combo.comboItems
          .map(({ item }) => {
            if (item.type === ItemType.SIDE) return item;
          })
          .filter(Boolean),
      };
    });

    return {
      id: tempMenuResponse.id,
      name: tempMenuResponse.name,
      date: tempMenuResponse.date,
      description: tempMenuResponse.description,
      isActive: tempMenuResponse.isActive,
      proteins,
      sides,
      combos,
    };
  }

  async deleteMenu(menuId: number): Promise<MenuResponse> {
    const menu = await this.prismaService.menu.update({
      where: { id: Number(menuId) },
      data: { removed: true },
    });

    return menu;
  }

  async activateMenu(menuId: number): Promise<MenuResponse> {
    // Deactivate any active menus
    await this.prismaService.menu.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    const menu = await this.prismaService.menu.update({
      where: { id: Number(menuId) },
      data: { isActive: true },
    });

    return menu;
  }
}
