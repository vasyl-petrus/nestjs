import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import Board from 'src/boards/board.entity';
import { CreateBoardDto } from './board.dto';
import { BoardsService } from './boards.service';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { UpdateResult } from 'typeorm';

@Resolver(() => Board)
export class BoardsResolver {
  constructor(private boardsService: BoardsService) {}

  @Query(() => [Board])
  async getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Query(() => Board)
  @UseGuards(GqlAuthGuard)
  async getBoard(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Board> {
    return this.boardsService.getById(id);
  }

  @Mutation(() => Board)
  @UseGuards(GqlAuthGuard)
  async createBoard(@Args('payload') payload: CreateBoardDto): Promise<Board> {
    return this.boardsService.create(payload);
  }

  @Mutation(() => Board)
  @UseGuards(GqlAuthGuard)
  async updateBoard(
    @Args('id') id: string,
    @Args('payload') payload: CreateBoardDto,
  ): Promise<UpdateResult> {
    return this.boardsService.update(id, payload);
  }
}
