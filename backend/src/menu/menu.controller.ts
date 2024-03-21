import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { CreateMenuData, CreateMenuItemData, MenuResponse } from './menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post('')
  async createMenu(@Body() data: CreateMenuData): Promise<MenuResponse> {
    // TODO: Validation for Req
    const menu = await this.menuService.createMenu({ data });
    return menu;
  }

  @Get(':menuId/menu')
  async getMenu(
    @Request() req,
    @Param('menuId') menuId: number,
  ): Promise<MenuResponse> {
    // TODO: Validation for Req
    const menu = await this.menuService.getMenuById(menuId);

    return menu;
  }

  @Post(':menuId/item')
  async createMenuItem(
    @Request() req,
    @Param('menuId') menuId: number,
    @Body() menuItemData: CreateMenuItemData,
  ) {
    // TODO: Validation for Req
    // TODO: Make sure this works - WIP
    const menuItem = await this.menuService.createMenuItem({
      data: { ...menuItemData, menuId: menuId },
    });

    return menuItem;
  }
}
