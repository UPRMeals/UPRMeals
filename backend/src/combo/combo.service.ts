import { Injectable } from '@nestjs/common';
import { Combo } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateMenuCombo } from './combo.dto';

@Injectable()
export class ComboService {
  constructor(private prismaService: PrismaService) {}

  async createCombo(
    comboData: CreateMenuCombo,
    itemIds: number[],
  ): Promise<Combo> {
    const comboItems = itemIds.map((id) => {
      return { itemId: id, removed: false };
    });

    const combo = await this.prismaService.combo.create({
      data: {
        ...comboData,
        comboItems: {
          create: comboItems,
        },
      },
      include: {
        menu: true,
        comboItems: {
          include: {
            item: true,
          },
        },
      },
    });

    return combo;
  }
}
