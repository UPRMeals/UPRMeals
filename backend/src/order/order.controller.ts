import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderData,
  CreateOrderResponse,
  SimplifiedOrder,
} from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('')
  async createOrder(@Body() data: CreateOrderData, @Req() req): Promise<any> {
    const order = await this.orderService.createOrder(req.user.userId, data);
    return order;
  }

  @Get('today')
  async getTodaysOrders() {
    const orders = await this.orderService.getTodaysOrders();
    return orders;
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
