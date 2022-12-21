import { Injectable } from '@nestjs/common';

import Column from './column.entity';
import { CreateColumnDto } from './column.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column) private columnRepository: Repository<Column>,
  ) {}

  async getAll(): Promise<Column[]> {
    return await this.columnRepository.find();
  }

  async getById(id: string): Promise<Column> {
    return this.columnRepository.findOneBy({ id });
  }

  async createColumn(column: CreateColumnDto): Promise<Column> {
    return await this.columnRepository.save(column);
  }

  async deleteById(id: string): Promise<UpdateResult> {
    return await this.columnRepository.softDelete({ id });
  }

  async updateById(id: string, newColumn: CreateColumnDto) {
    return this.columnRepository.update({ id }, newColumn);
  }
}
