import { Body, Controller, Post } from '@nestjs/common';
import { Combo } from '@prisma/client';
import { CreateMenuItem } from 'src/item/item.dto';

import { StaffOnly } from '../auth/decorators/isStaff.decorator';
import { CreateMenuCombo } from './combo.dto';
import { ComboService } from './combo.service';

@Controller('combo')
export class ComboController {
  constructor(private comboService: ComboService) {}

  @StaffOnly()
  @Post('')
  async createCombo(
    @Body() comboData: CreateMenuCombo,
    @Body() itemData: CreateMenuItem[],
  ): Promise<Combo> {
    const combo = await this.comboService.createCombo(comboData, itemData);
    return combo;
  }
}
