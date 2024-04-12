import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { CreateMenuData, MenuResponse, GetAllMenusResponse } from './menu.dto';
import { MenuService } from './menu.service';
import { StaffOnly } from 'src/auth/decorators/isStaff.decorator';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @StaffOnly()
  @Post('')
  async createMenu(@Body() data: CreateMenuData): Promise<MenuResponse> {
    // TODO: Validation for Req
    const menu = await this.menuService.createMenu({ data });
    return menu;
  }

  @StaffOnly()
  @Get(':menuId/menu')
  async getMenu(
    @Request() req,
    @Param('menuId') menuId: number,
  ): Promise<MenuResponse> {
    const menu = await this.menuService.getMenuById(menuId);

    return menu;
  }

  @StaffOnly()
  @Get('menus')
  async getAllMenus(@Request() req): Promise<GetAllMenusResponse[]> {
    const menu = await this.menuService.getAllMenus();
    return menu;
  }

  @StaffOnly()
  @Post('menus/:menuId/delete')
  async deleteMenu(
    @Request() req,
    @Param('menuId') menuId: number,
  ): Promise<MenuResponse> {
    const menu = await this.menuService.deleteMenu(menuId);

    return menu;
  }

  @StaffOnly()
  @Post('menus/:menuId/activate')
  async activateMenu(
    @Request() req,
    @Param('menuId') menuId: number,
  ): Promise<MenuResponse> {
    const menu = await this.menuService.activateMenu(menuId);

    return menu;
  }

  @Get('active-menu')
  async getActiveMenu() {
    return await this.menuService.getActiveMenu();
  }
}
