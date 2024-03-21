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

  // TODO: Make sure this works - WIP
  // This needs a menu item type
  async createMenuItem(
    data: Prisma.ItemCreateArgs,
  ): Promise<CreateMenuItemResponse> {
    const menuItem = await this.prismaService.item.create(data);

    return menuItem;
  }
}
