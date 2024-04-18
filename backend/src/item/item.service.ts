import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateMenuItem } from './item.dto';

@Injectable()
export class ItemService {
  constructor(private prismaService: PrismaService) {}

  async createItem(data: CreateMenuItem): Promise<Item> {
    const item = await this.prismaService.item.create({
      data: { ...data, removed: false },
    });
    return item;
  }
}
