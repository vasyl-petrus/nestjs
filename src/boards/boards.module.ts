import { Module } from '@nestjs/common';

import { BoardsService } from './boards.service';
import BoardEntity from './board.entity';
import { BoardsResolver } from './boards.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardsService, BoardsResolver],
})
export class BoardsModule {}
