import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import Column from './column.entity';
import { CreateColumnDto } from './column.dto';
import { ColumnsService } from './columns.service';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { UpdateResult } from 'typeorm';

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
    @Args('id', { type: () => String }) id: string,
    @Args('payload') payload: CreateColumnDto,
  ): Promise<UpdateResult> {
    return this.columnsService.updateById(id, payload);
  }
}
