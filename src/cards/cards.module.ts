import { Module } from '@nestjs/common';

import { CardsService } from './cards.service';
import Card from './card.entity';
import { CardsResolver } from './cards.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardsService, CardsResolver],
  exports: [CardsService],
})
export class CardsModule {}
