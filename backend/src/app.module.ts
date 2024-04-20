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
  ],
  controllers: [AppController, AuthController, UserController, MenuController],
  providers: [AppService],
})
export class AppModule {}
