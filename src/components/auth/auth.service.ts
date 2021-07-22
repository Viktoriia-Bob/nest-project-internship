import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import { SignOptions } from 'jsonwebtoken';
import { UserService } from 'src/components/user/user.service';
import { MailService } from '../mail/mail.service';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { IUser } from '../user/interfaces/user.interface';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { CreateUserTokenDto } from '../token/dto/create-user-token.dto';
import { SignInDto } from './dto/signin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { statusEnum } from '../user/enums/status.enum';

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {
    this.clientAppUrl = this.configService.get<string>('CLIENT_APP_URL');
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.userService.create(createUserDto);
    await this.sendConfirmation(user);
    return true;
  }

  async signIn({ email, password }: SignInDto): Promise<IUser> {
    const user = await this.userService.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      user.accessToken = await this.signUser(user);
      return this.userService.update(String(user._id), user);
    }
    throw new BadRequestException('Invalid credentials');
  }

  async signUser(user: IUser, withStatusCheck = false): Promise<string> {
    if (withStatusCheck && user.status !== statusEnum.active) {
      throw new MethodNotAllowedException();
    }

    const tokenPayload: ITokenPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = await this.generateToken(tokenPayload);
    const expireAt = moment().add(1, 'day').toISOString();

    await this.saveToken({
      token,
      expireAt,
      userId: user._id,
    });

    return token;
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
      await this.tokenService.deleteAll(userId);
      return true;
    }
  }

  async confirm(token: string): Promise<IUser> {
    const data = await this.verifyToken(token);
    const user = await this.userService.getById(data._id);

    await this.tokenService.delete(data._id, token);

    if (user && user.status === statusEnum.pending) {
      user.status = statusEnum.active;
      return this.userService.update(String(user._id), user);
    }
    throw new BadRequestException('Confirmation Error');
  }

  async sendConfirmation(user: IUser) {
    const token = await this.signUser(user, false);
    const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;
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

  private async generateToken(
    data: ITokenPayload,
    options?: SignOptions,
  ): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  private async verifyToken(token): Promise<any> {
    try {
      const data = await this.jwtService.verify(token);
      const tokenExists = await this.tokenService.exists(data._id, token);

      if (tokenExists) {
        return data;
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async saveToken(createUserTokenDto: CreateUserTokenDto) {
    return this.tokenService.create(createUserTokenDto);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.userService.getUserByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const token = await this.signUser(user);
    const forgotLink = `${this.clientAppUrl}/auth/forgotPassword?token=${token}`;
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

    await this.tokenService.delete(data._id, token);

    if (user && user.status === statusEnum.active) {
      user.status = statusEnum.changePassword;
      return this.userService.update(String(user._id), user);
    }
    throw new BadRequestException('Confirmation Error');
  }
}
