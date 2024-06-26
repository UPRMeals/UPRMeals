import { forwardRef, Module } from '@nestjs/common';
import { ItemModule } from '../item/item.module';
import { MenuModule } from '../menu/menu.module';
import { PrismaService } from '../database/prisma.service';
import { ComboController } from './combo.controller';
import { ComboService } from './combo.service';

@Module({
  imports: [forwardRef(() => ItemModule), MenuModule],
  controllers: [ComboController],
  providers: [ComboService, PrismaService],
  exports: [ComboService],
})
export class ComboModule {}
