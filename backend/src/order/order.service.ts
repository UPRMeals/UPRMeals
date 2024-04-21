import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  CreateOrderData,
  PrismaFindOrderResponse,
  SimplifiedOrder,
} from './order.dto';
import { Item, ItemType } from '@prisma/client';
import { endOfDay, startOfDay } from 'date-fns';

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
    return { orderId: order.id };
  }

  async getTodaysOrders(): Promise<any[]> {
    // Return type as any[] for simplicity
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const ordersResponse = await this.prismaService.order.findMany({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
        removed: false,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        orderItems: {
          include: {
            item: true,
          },
        },
        orderCombos: {
          include: {
            combo: {
              include: {
                comboItems: {
                  include: {
                    item: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return ordersResponse; // Directly return the fetched data
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
  private getSimplifiedOrder(order: PrismaFindOrderResponse): SimplifiedOrder {
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
        removed: orderCombo.combo.removed,
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
