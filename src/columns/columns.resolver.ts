import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UpdateWriteOpResult, Schema as MongooseSchema } from 'mongoose';
import { UseGuards } from '@nestjs/common';

import { Column, ColumnDocument } from './column.schema';
import { CreateColumnDto } from './column.dto';
import { ColumnsService } from './columns.service';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';

@Resolver(() => Column)
export class ColumnsResolver {
  constructor(private columnsService: ColumnsService) {}

  @Query(() => [Column])
  @UseGuards(GqlAuthGuard)
  async getAllColumns(): Promise<Column[]> {
    return this.columnsService.getAll();
  }

  @Mutation(() => Column)
  @UseGuards(GqlAuthGuard)
  async createColumn(
    @Args('payload') payload: CreateColumnDto,
  ): Promise<Column> {
    return this.columnsService.createColumn(payload);
  }

  @Mutation(() => Column)
  @UseGuards(GqlAuthGuard)
  async updateBoard(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @Args('payload') payload: CreateColumnDto,
  ): Promise<UpdateWriteOpResult> {
    return this.columnsService.updateById(id, payload);
  }

  @ResolveField()
  async board(@Parent() column: ColumnDocument) {
    await column.populate('board').execPopulate();
    return column.board;
  }
}
