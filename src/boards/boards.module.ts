import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BoardsService } from './boards.service';
import { Board, BoardSchema } from './board.schema';
import { BoardsResolver } from './boards.resolver';
import User from '../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [BoardsService, BoardsResolver],
})
export class BoardsModule {}
