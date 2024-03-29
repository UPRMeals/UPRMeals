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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    MenuModule,
  ],
  controllers: [AppController, AuthController, UserController, MenuController],
  providers: [AppService],
})
export class AppModule {}
