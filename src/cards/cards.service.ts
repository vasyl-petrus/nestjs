import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CardDto, CreateCardDto } from './card.dto';
import { Card, CardDocument } from './card.schema';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async getAll(): Promise<CardDto[]> {
    return await this.cardModel.find().exec();
  }

  async getById(id: string): Promise<CardDto> {
    return this.cardModel.findById(id).exec();
  }

  async create(card: CreateCardDto): Promise<CardDto> {
    const newCard = new this.cardModel(card);
    return await newCard.save();
  }

  async deleteById(id: string): Promise<number> {
    return this.cardModel
      .remove({ _id: id })
      .exec()
      .then((res) => res.ok);
  }

  async updateById(id: string, newCard: CreateCardDto) {
    return this.cardModel.updateOne({ _id: id }, { $set: newCard });
  }
}
