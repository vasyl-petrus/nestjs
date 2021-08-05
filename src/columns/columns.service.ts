import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Column, ColumnDocument } from './column.schema';
import { CreateColumnDto } from './column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
  ) {}

  async getAll(): Promise<Column[]> {
    return await this.columnModel.find().exec();
  }

  async getById(id: MongooseSchema.Types.ObjectId): Promise<Column> {
    return this.columnModel.findById(id).exec();
  }

  async addColumn(column: CreateColumnDto): Promise<Column> {
    const newColumn = new this.columnModel(column);
    return await newColumn.save();
  }

  async deleteById(id: MongooseSchema.Types.ObjectId): Promise<number> {
    return this.columnModel
      .remove({ _id: id })
      .exec()
      .then((res) => res.ok);
  }

  async updateById(id: string, newColumn: CreateColumnDto) {
    return this.columnModel.updateOne({ _id: id }, { $set: newColumn });
  }
}
