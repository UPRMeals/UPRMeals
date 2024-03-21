import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateMenuItemResponse, CreateMenuResponse } from './menu.dto';

@Injectable()
export class MenuService {
  constructor(private prismaService: PrismaService) {}

  async createMenu(data: Prisma.MenuCreateArgs): Promise<CreateMenuResponse> {
    const menu = await this.prismaService.menu.create(data);
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
