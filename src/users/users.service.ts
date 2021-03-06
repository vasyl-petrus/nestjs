import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { User, UserDocument } from './user.schema';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(payload: CreateUserDto) {
    const hash = await this.hashPassword(payload.password);
    const createdPerson = new this.userModel(
      Object.assign(payload, { password: hash }),
    );
    return createdPerson.save();
  }

  async update(userId: MongooseSchema.Types.ObjectId, payload: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: userId }, { $set: payload });
  }

  async getById(_id: MongooseSchema.Types.ObjectId) {
    return await this.userModel.findById(_id).exec();
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10));
    return await bcrypt.hash(password, salt);
  }
}
