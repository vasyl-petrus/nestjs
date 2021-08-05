import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CardsService } from './cards.service';
import { Card, CardSchema } from './card.schema';
import { CardsResolver } from './cards.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  providers: [CardsService, CardsResolver],
  exports: [CardsService],
})
export class CardsModule {}
