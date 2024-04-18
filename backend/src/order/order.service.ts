import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateOrderData } from './order.dto';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async createOrder(userId: number, data: CreateOrderData): Promise<any> {
    const items = data.items.flatMap((item) => ({
      item: {
        connect: {
          id: item.id,
        },
      },
    }));

    const combos = data.combos.flatMap((combo) => ({
      combo: {
        connect: {
          id: combo.id,
        },
      },
      comboItems: {
        create: combo.items.flatMap((item) => ({
          comboItem: {
            connect: {
              id: item.id,
            },
          },
        })),
      },
    }));

    const order = await this.prismaService.order.create({
      data: {
        userId: userId,
        totalPrice: data.totalPrice,
        items: {
          create: items,
        },
        combos: {
          create: combos,
        },
      },
    });
    return order;
  }
}
