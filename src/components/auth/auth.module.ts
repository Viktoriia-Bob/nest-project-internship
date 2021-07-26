import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserModule } from 'src/components/user/user.module';
import { MailModule } from '../mail/mail.module';
import { TokenModule } from '../token/token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import JwtStrategy from './jwt.strategy';
import LocalStrategy from './strategies/local.strategy';

@ApiTags('Auth')
@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule,
    MailModule,
    TokenModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.SECRET_OR_KEY}`,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export default class AuthModule {}
