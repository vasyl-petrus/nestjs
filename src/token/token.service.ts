import { Injectable } from '@nestjs/common';
import Token from './token.entity';
import { UserTokenDto } from './token.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
  ) {}

  async create(payload: UserTokenDto) {
    return await this.tokenRepository.save(payload);
  }

  async getById(id: string) {
    return await this.tokenRepository.findBy({ id });
  }

  exists(userId: string, token: string): boolean {
    const tokenExists = this.tokenRepository.find({
      relations: ['users'],
      where: {
        user_id: userId,
        token,
      },
    });

    return !!tokenExists;
  }

  async delete(userId: string) {
    return await this.tokenRepository.softDelete({ user_id: userId });
  }
}
