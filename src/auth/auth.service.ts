import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { addDays } from 'date-fns';

import { TokenService } from 'src/token/token.service';
import { UserTokenDto } from 'src/token/token.dto';
import { CreateUserDto, UserDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import { TokenTypesEnum } from 'src/token/token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly userService: UsersService,
  ) {}

  async signUp(newUser: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.getByEmail(newUser.email);

    if (!user) return await this.userService.create(newUser);

    return user;
  }

  async signIn({ email, password }): Promise<UserDto> {
    const user = await await this.userService.getByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const tokenPayload = {
        id: user.id,
        type: 'auth',
      };

      const token = await this.generateToken(tokenPayload);
      const expiresAt = addDays(new Date(), 1);

      await this.saveToken({
        token,
        user_id: user.id,
        expires_at: expiresAt,
        type: TokenTypesEnum.auth,
      });
      delete user.password;

      return Object.assign(user, { token: token });
    }
    throw new BadRequestException('Invalid credentials');
  }

  private async generateToken(data, options?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  private async verifyToken(token): Promise<any> {
    try {
      const data = this.jwtService.verify(token);
      const tokenExists = await this.tokenService.exists(data.id, token);

      if (tokenExists) return data;

      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async saveToken(userTokenDto: UserTokenDto) {
    return await this.tokenService.create(userTokenDto);
  }
}
