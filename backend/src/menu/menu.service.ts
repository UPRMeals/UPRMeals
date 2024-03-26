import { Injectable } from '@nestjs/common';
import { ItemType, Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ActiveMenuResponse, MenuResponse } from './menu.dto';

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

  async getAllMenus(): Promise<MenuResponse[]> {
    const menus = await this.prismaService.menu.findMany({
      where: { removed: false },
      orderBy: { date: 'desc' },
    });
    return menus;
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

  async deleteMenu(menuId: number): Promise<MenuResponse> {
    const menu = await this.prismaService.menu.update({
      where: { id: Number(menuId) },
      data: { removed: true },
    });

    return menu;
  }
}
