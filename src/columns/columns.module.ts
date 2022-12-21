import { Module } from '@nestjs/common';

import Column from './column.entity';
import { ColumnsService } from './columns.service';
import { ColumnsResolver } from './columns.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Column])],
  providers: [ColumnsService, ColumnsResolver],
})
export class ColumnsModule {}
