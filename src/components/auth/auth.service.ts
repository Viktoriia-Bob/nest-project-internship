import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as Redis from 'ioredis';
import { RedisService } from 'nestjs-redis';
import { ConfigService } from '@nestjs/config';
import UserService from 'src/components/user/user.service';
import MailService from '../mail/mail.service';
import IUser from '../user/interfaces/user.interface';
import ITokenPayload from './interfaces/token-payload.interface';
import SignInDto from './dto/sign-in.dto';
import ChangePasswordDto from './dto/change-password.dto';
import ForgotPasswordDto from './dto/forgot-password.dto';
import { statusEnum } from '../user/enums/status.enum';
import SignUpDto from './dto/sign-up.dto';

@Injectable()
export default class AuthService {
  private readonly clientAppUrl: string;
  private readonly redisClient: Redis.Redis;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
  ) {
    this.clientAppUrl = this.configService.get<string>('CLIENT_APP_URL');
    this.redisClient = redisService.getClient();
  }

  async signUp(createUserDto: SignUpDto): Promise<boolean> {
    const user = await this.userService.create(createUserDto);
    await this.sendConfirmation(user);
    return true;
  }

  async signIn({ email }: SignInDto) {
    const user = await this.userService.getUserByEmail(
      email.toLocaleLowerCase(),
    );
    if (user.emailVerify) {
      const { accessToken, refreshToken } = await this.signUser(user);
      return {
        user,
        accessToken,
        refreshToken,
      };
    }
    throw new BadRequestException('User not verify email');
  }

  async signUser(user: IUser, withStatusCheck = true) {
    if (withStatusCheck && user.status !== statusEnum.active) {
      throw new MethodNotAllowedException();
    }

    const tokenPayload: ITokenPayload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(tokenPayload, {
      expiresIn: '1 day',
    });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      expiresIn: '7 days',
    });
    await this.redisClient.set(
      refreshToken,
      'refreshToken',
      'EX',
      60 * 60 * 24 * 7,
    );
    return { accessToken, refreshToken };
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    const user = await this.userService.getById(userId);
    if (user && user.status === 'changePassword') {
      user.status = statusEnum.active;
      await this.userService.update(userId, user);
      const password = await this.userService.hashPassword(
        changePasswordDto.password,
      );
      await this.userService.update(userId, { password });
      return true;
    }
    throw new BadRequestException();
  }

  async confirm(token: string): Promise<IUser> {
    const data = await this.verifyToken(token);
    const user = await this.userService.getById(data._id);

    await this.redisClient.del(token);

    if (user && user.status === statusEnum.pending) {
      user.status = statusEnum.active;
      user.emailVerify = true;
      return this.userService.update(String(user._id), user);
    }
    throw new BadRequestException('Confirmation Error');
  }

  async sendConfirmation(user: IUser) {
    const { accessToken } = await this.signUser(user, false);
    const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${accessToken}`;
    await this.mailService.send({
      from: this.configService.get<string>('MAIL_ADDRESS'),
      to: user.email,
      subject: 'Verify User',
      html: `
        <h3>Hello, ${user.name}!</h3>
        <p>Please use this <a href="${confirmLink}">link</a> to confirm your account</p>
        `,
    });
  }

  async verifyToken(token): Promise<any> {
    const payload = await this.jwtService.verify(token);
    const data = payload as ITokenPayload;
    if (this.userService.getUserByEmail(data.email)) {
      return data;
    }
    throw new UnauthorizedException();
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.getUserByEmail(
      forgotPasswordDto.email.toLocaleLowerCase(),
    );
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const { accessToken } = await this.signUser(user);
    const forgotLink = `${this.clientAppUrl}/auth/forgot-password?token=${accessToken}`;
    await this.mailService.send({
      from: this.configService.get<string>('MAIL_ADDRESS'),
      to: user.email,
      subject: 'Verify user',
      html: `
        <h3>Hello, ${user.name}!</h3>
        <p>Please use this <a href="${forgotLink}">link</a> to confirm your account for change password.</p>
      `,
    });
  }

  async getForgotPassword(token: string) {
    const data = await this.verifyToken(token);
    const user = await this.userService.getById(data._id);

    await this.redisClient.del(token);

    if (user && user.emailVerify === true) {
      user.status = statusEnum.changePassword;
      return this.userService.update(String(user._id), user);
    }
    throw new BadRequestException('Confirmation Error');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new BadRequestException('Invalid credentials');
  }

  async refreshTokens(token) {
    const data = await this.verifyToken(token);
    const user = await this.userService.getUserByEmail(data.email);
    return this.signUser(user);
  }

  async signInByToken(token: string) {
    const payload = await this.jwtService.verify(token);
    const data = payload as ITokenPayload;
    const user = await this.userService.getUserByEmail(data.email);
    if (user.emailVerify) {
      const { accessToken, refreshToken } = await this.signUser(user);
      return {
        user,
        accessToken,
        refreshToken,
      };
    }
    throw new BadRequestException('User not verify email');
  }
}
