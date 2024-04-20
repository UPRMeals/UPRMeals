import { Injectable } from '@nestjs/common';
import { Combo, Prisma } from '@prisma/client';
import { CreateMenuItem, Item } from 'src/item/item.dto';
import { ItemService } from 'src/item/item.service';
import { PrismaService } from '../database/prisma.service';
import { CreateMenuCombo } from './combo.dto';

@Injectable()
export class ComboService {
  constructor(
    private prismaService: PrismaService,
    private readonly itemService: ItemService,
  ) {}

  async createCombo(
    comboData: CreateMenuCombo,
    itemData: CreateMenuItem[],
  ): Promise<Combo> {
    const itemPromises = itemData.map((data) => {
      const promise = this.itemService.createItem(data);
      return promise;
    });

    const itemResults = await Promise.allSettled(itemPromises); // Create items concurrently
    const createdItems = itemResults.flatMap((result) => {
      if (result.status === 'fulfilled') {
        return { itemId: result.value.id };
      } else {
        return [];
      }
    });

    const combo = await this.prismaService.combo.create({
      data: {
        ...comboData,
        items: {
          create: createdItems,
        },
      },
      include: {
        menu: true,
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    return combo;
  }
}
