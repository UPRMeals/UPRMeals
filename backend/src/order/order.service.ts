import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateOrderData, PrismaFindOrderResponse } from './order.dto';
import { Item, ItemType } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async createOrder(userId: number, data: CreateOrderData): Promise<any> {
    if (!userId) throw new Error('User not found');
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

  async getAllOrdersForUser(userId: number): Promise<any> {
    if (!userId) throw new Error('User not found');
    const tempOrdersResponse = await this.prismaService.order.findMany({
      where: {
        userId: userId,
        removed: false,
      },
      include: {
        orderItems: {
          include: {
            item: true,
          },
        },
        orderCombos: {
          include: {
            combo: true,
            orderComboItems: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    const orders = tempOrdersResponse.flatMap((order) => {
      return this.getSimplifiedOrder(order);
    });

    return orders;
  }

  async getOrderById(orderId: number) {
    if (!orderId) throw new Error('Method not implemented.');
    const order = await this.prismaService.order.findUnique({
      where: {
        id: orderId,
        removed: false,
      },
      include: {
        orderItems: {
          include: {
            item: true,
          },
        },
        orderCombos: {
          include: {
            combo: true,
            orderComboItems: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    return this.getSimplifiedOrder(order);
  }

  //gets rid of the relationships (easier for frontend)
  private getSimplifiedOrder(order: PrismaFindOrderResponse) {
    const orderItems = order.orderItems.map((orderItem) => orderItem.item);

    const orderCombos = order.orderCombos.map((orderCombo) => {
      const proteins = orderCombo.orderComboItems.flatMap<Item>(
        (orderComboItem) => {
          return orderComboItem.item.type === ItemType.PROTEIN
            ? orderComboItem.item
            : [];
        },
      );

      const sides = orderCombo.orderComboItems.flatMap<Item>(
        (orderComboItem) => {
          return orderComboItem.item.type === ItemType.SIDE
            ? orderComboItem.item
            : [];
        },
      );

      return {
        id: orderCombo.combo.id,
        name: orderCombo.combo.name,
        description: orderCombo.combo.description,
        price: orderCombo.combo.price,
        status: orderCombo.combo.status,
        proteinCount: orderCombo.combo.proteinCount,
        sideCount: orderCombo.combo.sideCount,
        menuId: orderCombo.combo.menuId,
        proteins,
        sides,
      };
    });

    return {
      id: order.id,
      userId: order.userId,
      status: order.status,
      totalPrice: order.totalPrice,
      createdAt: new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      updatedAt: new Date(order.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      orderItems,
      orderCombos,
    };
  }
}
