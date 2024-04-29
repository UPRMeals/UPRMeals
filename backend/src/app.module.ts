import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { MenuModule } from './menu/menu.module';
import { MenuController } from './menu/menu.controller';
import { ItemModule } from './item/item.module';
import { ComboModule } from './combo/combo.module';
import { OrderModule } from './order/order.module';
import { OrderController } from './order/order.controller';
import { ItemController } from './item/item.controller';
import { ComboController } from './combo/combo.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    MenuModule,
    ItemModule,
    ComboModule,
    OrderModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    OrderController,
    ItemController,
    MenuController,
    ComboController,
  ],
  providers: [AppService],
})
export class AppModule {}
