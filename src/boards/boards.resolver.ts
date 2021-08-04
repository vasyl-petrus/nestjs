import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Board } from './board.schema';
import { CreateBoardDto, BoardDto } from './board.dto';
import { BoardsService } from './boards.service';
import { UpdateWriteOpResult } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';

@Resolver()
export class BoardsResolver {
  constructor(private boardsService: BoardsService) {}

  @Query(() => Board)
  @UseGuards(GqlAuthGuard)
  async board(@Args('payload') payload: BoardDto) {
    return this.boardsService.getBoard(payload);
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
  ): Promise<UpdateWriteOpResult> {
    return this.boardsService.update(id, payload);
  }
}
