import { forwardRef, Module } from '@nestjs/common';
import { ItemModule } from 'src/item/item.module';
import { PrismaService } from '../database/prisma.service';
import { ComboController } from './combo.controller';
import { ComboService } from './combo.service';

@Module({
  imports: [forwardRef(() => ItemModule)],
  controllers: [ComboController],
  providers: [ComboService, PrismaService],
  exports: [ComboService],
})
export class ComboModule {}
