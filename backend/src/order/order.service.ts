import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateOrderData } from './order.dto';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async createOrder(userId: number, data: CreateOrderData): Promise<any> {
    const orderItems = data.items.flatMap((item) => ({
      item: {
        connect: {
          id: item.id,
        },
      },
    }));

    const orderCombos = data.combos.flatMap((combo) => ({
      combo: {
        connect: {
          id: combo.id,
        },
      },
      orderComboItems: {
        create: combo.items.flatMap((item) => ({
          item: {
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
        orderItems: {
          create: orderItems,
        },
        orderCombos: {
          create: orderCombos,
        },
      },
    });
    return order;
  }
}
