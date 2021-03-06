import { Module } from '@nestjs/common';
import config from './config.root';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    ...config,
    UsersModule,
    AuthModule,
    BoardsModule,
    ColumnsModule,
    CardsModule,
  ],
})
export class AppModule {}
