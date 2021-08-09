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

import { CreateCardDto } from './card.dto';
import { CardsService } from './cards.service';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { Card, CardDocument } from './card.schema';
import { User } from 'src/users/user.schema';
import { Column } from 'src/columns/column.schema';

@Resolver(() => Card)
export class CardsResolver {
  constructor(private cardsService: CardsService) {}

  @Query(() => [Card])
  //@UseGuards(GqlAuthGuard)
  async getAllCards() {
    return this.cardsService.getAll();
  }
  @Query(() => Card)
  //@UseGuards(GqlAuthGuard)
  async getById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.cardsService.getById(id);
  }

  @Mutation(() => Card)
  //@UseGuards(GqlAuthGuard)
  async createCard(@Args('payload') payload: CreateCardDto): Promise<Card> {
    return this.cardsService.create(payload);
  }

  @Mutation(() => Card)
  @UseGuards(GqlAuthGuard)
  async updateCard(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @Args('payload') payload: CreateCardDto,
  ): Promise<UpdateWriteOpResult> {
    return this.cardsService.updateById(id, payload);
  }

  @ResolveField()
  async column(@Parent() card: CardDocument) {
    await card.populate({ path: 'columns', model: Column.name }).execPopulate();
    return card.author;
  }

  @ResolveField()
  async author(@Parent() card: CardDocument) {
    await card.populate({ path: 'users', model: User.name }).execPopulate();
    return card.author;
  }
}
