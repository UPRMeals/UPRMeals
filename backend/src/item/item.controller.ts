import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Item } from '@prisma/client';

import { StaffOnly } from '../auth/decorators/isStaff.decorator';
import { CreateMenuItem } from './item.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @StaffOnly()
  @Post('')
  async createItem(@Body() data: CreateMenuItem): Promise<Item> {
    const item = await this.itemService.createItem(data);
    return item;
  }

  @StaffOnly()
  @Post(':itemId/update')
  async updateItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() data: Item,
  ): Promise<Item> {
    if (itemId !== data.id) {
      throw new BadRequestException();
    }

    const item = await this.itemService.updateItem(data);
    return item;
  }

  @StaffOnly()
  @Post(':itemId/delete')
  async deleteItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() data: Item,
  ): Promise<Item | { error: string }> {
    if (itemId !== data.id) {
      throw new BadRequestException();
    }

    const item = await this.itemService.deleteItem(data);
    return item;
  }
}
