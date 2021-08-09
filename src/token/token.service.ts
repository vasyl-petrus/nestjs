import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Token, TokenDocument } from './token.schema';
import { UserTokenDto } from './token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  async create(payload: UserTokenDto) {
    const createdToken = new this.tokenModel(payload);
    return await createdToken.save();
  }

  async getById(_id: MongooseSchema.Types.ObjectId) {
    return await this.tokenModel.findById(_id).exec();
  }

  exists(userId: MongooseSchema.Types.ObjectId, token: string): boolean {
    const tokenExists = this.tokenModel.findOne({
      user_id: userId,
      token,
    });

    return !!tokenExists;
  }

  async delete(userId: MongooseSchema.Types.ObjectId) {
    return await this.tokenModel.findOneAndDelete({ user_id: userId });
  }
}
