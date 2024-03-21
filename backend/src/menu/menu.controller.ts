import { Body, Controller, Param, Post, Request } from '@nestjs/common';
import {
  CreateMenuData,
  CreateMenuItemData,
  CreateMenuResponse,
} from './menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post('')
  async createMenu(@Body() data: CreateMenuData): Promise<CreateMenuResponse> {
    // TODO: Validation for Req
    const menu = await this.menuService.createMenu({ data });
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
