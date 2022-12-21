import { Injectable } from '@nestjs/common';

import { CreateBoardDto } from './board.dto';
import Board from 'src/boards/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  create(payload: CreateBoardDto) {
    const createdBoard = this.boardRepository.save(payload);
    return createdBoard;
  }

  getById(id: string) {
    return this.boardRepository.findOneBy({ id });
  }

  getAllBoards() {
    return this.boardRepository.find();
  }

  update(id: string, payload: CreateBoardDto) {
    return this.boardRepository.update({ id }, payload);
  }

  delete(id: string) {
    return this.boardRepository.softDelete(id);
  }
}
