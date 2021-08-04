import { Module } from '@nestjs/common';
import config from './config.root';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [...config],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
