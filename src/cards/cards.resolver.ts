import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateCardDto } from './card.dto';
import { CardsService } from './cards.service';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import Card from './card.entity';
import { UpdateResult } from 'typeorm';

@Resolver(() => Card)
export class CardsResolver {
  constructor(private cardsService: CardsService) {}

  @Query(() => [Card])
  @UseGuards(GqlAuthGuard)
  async getAllCards() {
    return this.cardsService.getAll();
  }
  @Query(() => Card)
  @UseGuards(GqlAuthGuard)
  async getById(@Args('id', { type: () => String }) id: string) {
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
    @Args('id', { type: () => String }) id: string,
    @Args('payload') payload: CreateCardDto,
  ): Promise<UpdateResult> {
    return this.cardsService.updateById(id, payload);
  }
}
