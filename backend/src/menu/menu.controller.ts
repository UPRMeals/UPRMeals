import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import {
  CreateMenuData,
  MenuResponse,
  GetAllMenusResponse,
  Menu,
} from './menu.dto';
import { MenuService } from './menu.service';
import { StaffOnly } from '../auth/decorators/isStaff.decorator';
import { Public } from '../auth/decorators/public.decorator';

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
    @Param('menuId', ParseIntPipe) menuId: number,
  ): Promise<Menu> {
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

  @Public()
  @Get('active-menu')
  async getActiveMenu(): Promise<Menu> {
    return await this.menuService.getActiveMenu();
  }
}
