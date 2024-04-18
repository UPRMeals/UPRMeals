import { Body, Controller, Post, Req } from '@nestjs/common';
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
}
