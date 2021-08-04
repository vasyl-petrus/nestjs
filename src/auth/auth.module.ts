import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { configModule } from '../config.root';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    configModule,
    UsersModule,
    TokenModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService, AuthResolver],
})
export class AuthModule {}
