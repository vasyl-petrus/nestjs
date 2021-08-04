import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(payload: CreateUserDto) {
    const createdPerson = new this.userModel(payload);
    return createdPerson.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.userModel.findById(_id).exec();
  }
}
