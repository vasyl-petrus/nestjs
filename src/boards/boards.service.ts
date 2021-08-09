import { Injectable } from '@nestjs/common';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateBoardDto } from './board.dto';
import { Board, BoardDocument } from './board.schema';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  create(payload: CreateBoardDto) {
    const createdBoard = new this.boardModel(payload);
    return createdBoard.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.boardModel.findById(_id).exec();
  }

  getAllBoards() {
    return this.boardModel.find().exec();
  }

  update(id: string, payload: CreateBoardDto) {
    return this.boardModel.updateOne({ _id: id }, { $set: payload });
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.boardModel.findByIdAndDelete(_id).exec();
  }
}
