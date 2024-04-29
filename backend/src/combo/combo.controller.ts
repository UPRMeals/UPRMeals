import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Combo } from '@prisma/client';

import { StaffOnly } from '../auth/decorators/isStaff.decorator';
import { CreateComboInput, UpdateComboInput } from './combo.dto';
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

  @StaffOnly()
  @Post(':comboId/delete')
  async deleteCombo(
    @Param('comboId', ParseIntPipe) comboId: number,
    @Body() data: Combo,
  ): Promise<Combo> {
    if (comboId !== data.id) {
      throw new BadRequestException();
    }

    const item = await this.comboService.deleteCombo(data);
    return item;
  }

  @StaffOnly()
  @Post(':comboId/update')
  async updateCombo(
    @Param('comboId', ParseIntPipe) comboId: number,
    @Body() data: UpdateComboInput,
  ): Promise<Combo> {
    const combo = await this.comboService.updateCombo(
      comboId,
      data.comboData,
      data.itemIds,
      data.menuId,
    );

    return combo;
  }
}
