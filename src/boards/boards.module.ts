import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BoardsService } from './boards.service';
import { Board, BoardSchema } from './board.schema';
import { BoardsResolver } from './boards.resolver';
import { User, UserSchema } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [BoardsService, BoardsResolver],
})
export class BoardsModule {}
