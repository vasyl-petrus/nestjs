import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateWriteOpResult } from 'mongoose';
import { UseGuards } from '@nestjs/common';

import { CreateCardDto } from './card.dto';
import { CardsService } from './cards.service';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { Card } from './card.schema';

@Resolver()
export class CardsResolver {
  constructor(private cardsService: CardsService) {}

  @Query(() => Card)
  @UseGuards(GqlAuthGuard)
  async getAll() {
    return this.cardsService.getAll();
  }
  @Query(() => Card)
  @UseGuards(GqlAuthGuard)
  async getById(@Args('id') id: string) {
    return this.cardsService.getById(id);
  }

  @Mutation(() => Card)
  @UseGuards(GqlAuthGuard)
  async createCard(@Args('payload') payload: CreateCardDto): Promise<Card> {
    return this.cardsService.create(payload);
  }

  @Mutation(() => Card)
  @UseGuards(GqlAuthGuard)
  async updateCard(
    @Args('id') id: string,
    @Args('payload') payload: CreateCardDto,
  ): Promise<UpdateWriteOpResult> {
    return this.cardsService.updateById(id, payload);
  }
}
