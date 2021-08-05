import { Module } from '@nestjs/common';
import config from './config.root';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [...config, UsersModule, AuthModule, BoardsModule, ColumnsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
