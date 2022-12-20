import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import User from './user.entity';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService, UsersResolver],
})
export class UsersModule {}
