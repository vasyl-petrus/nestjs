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

import { Board, BoardDocument } from './board.schema';
import { CreateBoardDto } from './board.dto';
import { BoardsService } from './boards.service';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { User } from 'src/users/user.schema';

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
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<Board> {
    return this.boardsService.getById(_id);
  }

  @Mutation(() => Board)
  //@UseGuards(GqlAuthGuard)
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

  @ResolveField()
  async author(@Parent() board: BoardDocument) {
    await board.populate({ path: 'users', model: User.name }).execPopulate();
    return board.author;
  }
}
