import { Body, Controller, Post } from '@nestjs/common';
import { Combo } from '@prisma/client';

import { StaffOnly } from '../auth/decorators/isStaff.decorator';
import { CreateComboInput } from './combo.dto';
import { ComboService } from './combo.service';

@Controller('combo')
export class ComboController {
  constructor(private comboService: ComboService) {}

  @StaffOnly()
  @Post('')
  async createCombo(@Body() data: CreateComboInput): Promise<Combo> {
    const combo = await this.comboService.createCombo(
      data.comboData,
      data.itemIds,
    );
    return combo;
  }
}
