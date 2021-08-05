import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Column, ColumnSchema } from './column.schema';
import { ColumnsService } from './columns.service';
import { ColumnsResolver } from './columns.resolver';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]),
  ],
  providers: [ColumnsService, ColumnsResolver],
})
export class ColumnsModule {}
