import { forwardRef, Module } from '@nestjs/common';
import { ComboModule } from '../combo/combo.module';
import { MenuModule } from '../menu/menu.module';
import { PrismaService } from '../database/prisma.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [forwardRef(() => ComboModule), MenuModule],
  controllers: [ItemController],
  providers: [ItemService, PrismaService],
  exports: [ItemService],
})
export class ItemModule {}
