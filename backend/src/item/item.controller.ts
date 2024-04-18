import { Body, Controller, Post } from '@nestjs/common';
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
}
