import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Board } from './board.schema';
import { CreateBoardDto, BoardDto } from './board.dto';
import { BoardsService } from './boards.service';
import { UpdateWriteOpResult } from 'mongoose';

@Resolver()
export class BoardsResolver {
  constructor(private boardsService: BoardsService) {}

  @Query(() => Board)
  async board(@Args('payload') payload: BoardDto) {
    return this.boardsService.getBoard(payload);
  }

  @Mutation(() => Board)
  async createBoard(@Args('payload') payload: CreateBoardDto): Promise<Board> {
    return this.boardsService.create(payload);
  }

  @Mutation(() => Board)
  async updateBoard(
    @Args('id') id: string,
    @Args('payload') payload: CreateBoardDto,
  ): Promise<UpdateWriteOpResult> {
    return this.boardsService.update(id, payload);
  }
}
