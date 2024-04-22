import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderData,
  CreateOrderResponse,
  SimplifiedOrder,
} from './order.dto';
import { OrderStatusType } from '@prisma/client';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('')
  async createOrder(
    @Body() data: CreateOrderData,
    @Req() req,
  ): Promise<CreateOrderResponse> {
    const order = await this.orderService.createOrder(req.user.userId, data);
    return order;
  }

  @Get('')
  async getAllOrdersForCustomers(@Req() req): Promise<SimplifiedOrder[]> {
    const orders = await this.orderService.getAllOrdersForUser(req.user.userId);
    return orders;
  }

  @Get(':orderId')
  async getOrder(
    @Req() req,
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<SimplifiedOrder> {
    const order = await this.orderService.getOrderById(orderId);
    return order;
  }

  @Get('today')
  async getTodaysOrders() {
    const orders = await this.orderService.getTodaysOrders();
    return orders;
  }

  @Put(':orderId/status')
  async updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body('status') newStatus: OrderStatusType,
  ) {
    return await this.orderService.updateOrderStatus(orderId, newStatus);
  }

  @Get('')
  async getAllOrdersForCustomers(@Req() req): Promise<SimplifiedOrder[]> {
    const orders = await this.orderService.getAllOrdersForUser(req.user.userId);
    return orders;
  }

  @Get(':orderId')
  async getOrder(
    @Req() req,
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<SimplifiedOrder> {
    const order = await this.orderService.getOrderById(orderId);
    return order;
  }
}
