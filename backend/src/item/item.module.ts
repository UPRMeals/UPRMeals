import { forwardRef, Module } from '@nestjs/common';
import { ComboModule } from 'src/combo/combo.module';
import { PrismaService } from '../database/prisma.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [forwardRef(() => ComboModule)],
  controllers: [ItemController],
  providers: [ItemService, PrismaService],
  exports: [ItemService],
})
export class ItemModule {}
