import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { CreateMenuData, MenuResponse } from './menu.dto';
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

  @Get('menus')
  async getAllMenus(@Request() req): Promise<MenuResponse[]> {
    // TODO: Validation for Req
    const menu = await this.menuService.getAllMenus();

    return menu;
  }

  @Post('menus/:menuId/delete')
  async deleteMenu(
    @Request() req,
    @Param('menuId') menuId: number,
  ): Promise<MenuResponse> {
    // TODO: Validation for Req
    const menu = await this.menuService.deleteMenu(menuId);

    return menu;
  }
}
