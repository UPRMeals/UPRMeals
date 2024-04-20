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
import { CreateOrderData } from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('')
  async createOrder(@Body() data: CreateOrderData, @Req() req): Promise<any> {
    const order = await this.orderService.createOrder(req.user.userId, data);
    return order;
  }

  @Get('')
  async getAllOrdersForCustomers(@Req() req): Promise<any> {
    const orders = await this.orderService.getAllOrdersForUser(req.user.userId);
    return orders;
  }

  @Get(':orderId')
  async getOrder(
    @Req() req,
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<any> {
    const orders = await this.orderService.getOrderById(orderId);
    return orders;
  }
}
