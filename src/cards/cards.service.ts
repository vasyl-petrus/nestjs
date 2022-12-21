import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCardDto } from './card.dto';
import Card from './card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
  ) {}

  async getAll(): Promise<Card[]> {
    return await this.cardRepository.find();
  }

  async getById(id: string): Promise<Card> {
    return this.cardRepository.findOneBy({ id });
  }

  async create(card: CreateCardDto): Promise<Card> {
    return await this.cardRepository.save(card);
  }

  async deleteById(id: string): Promise<UpdateResult> {
    return this.cardRepository.softDelete({ id });
  }

  async updateById(id: string, newCard: CreateCardDto) {
    return this.cardRepository.update({ id }, newCard);
  }
}
