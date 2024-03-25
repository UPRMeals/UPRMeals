import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateMenuItemResponse, MenuResponse } from './menu.dto';

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

  async deleteMenu(menuId: number): Promise<MenuResponse> {
    const menu = await this.prismaService.menu.update({
      where: { id: Number(menuId) },
      data: { removed: true },
    });

    return menu;
  }
}
