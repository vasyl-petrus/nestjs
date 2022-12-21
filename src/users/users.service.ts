import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import User from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto) {
    const hash = await this.hashPassword(payload.password);
    const user = await this.userRepository.save(
      Object.assign(payload, { password: hash }),
    );

    return user;
  }

  async update(userId: string, payload: UpdateUserDto) {
    return await this.userRepository.update({ id: userId }, payload);
  }

  async getById(userId: string) {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10));
    return await bcrypt.hash(password, salt);
  }
}
