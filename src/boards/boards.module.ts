import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BoardsService } from './boards.service';
import { Board, BoardSchema } from './board.schema';
import { BoardsResolver } from './boards.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
  ],
  providers: [BoardsService, BoardsResolver],
})
export class BoardsModule {}
