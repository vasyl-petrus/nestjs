import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CreateCardDto } from './card.dto';
import { Card, CardDocument } from './card.schema';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async getAll(): Promise<CardDocument[]> {
    return await this.cardModel.find().exec();
  }

  async getById(_id: MongooseSchema.Types.ObjectId): Promise<CardDocument> {
    return this.cardModel.findById(_id).exec();
  }

  async create(card: CreateCardDto): Promise<CardDocument> {
    const newCard = new this.cardModel(card);
    return await newCard.save();
  }

  async deleteById(id: MongooseSchema.Types.ObjectId): Promise<number> {
    return this.cardModel
      .remove({ _id: id })
      .exec()
      .then((res) => res.ok);
  }

  async updateById(id: MongooseSchema.Types.ObjectId, newCard: CreateCardDto) {
    return this.cardModel.updateOne({ _id: id }, { $set: newCard });
  }
}
