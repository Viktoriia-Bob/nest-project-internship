import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/components/user/dto/create-user.dto';
import { IUser } from '../user/interfaces/user.interface';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { SignInDto } from './dto/signin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
  @Post('/signUp')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return this.authService.signUp(createUserDto);
  }

  @Get('/confirm')
  async confirm(@Query() query: ConfirmAccountDto): Promise<boolean> {
    await this.authService.confirm(query.token);
    return true;
  }

  @ApiBody({ type: SignInDto })
  @Post('/signIn')
  async signIn(@Body() signInDto: SignInDto): Promise<IUser> {
    return this.authService.signIn(signInDto);
  }

  @ApiBody({ type: ForgotPasswordDto })
  @Post('/forgotPassword')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Get('/forgotPassword')
  async getForgotPassword(@Query() query: ConfirmAccountDto): Promise<boolean> {
    await this.authService.getForgotPassword(query.token);
    return true;
  }

  @ApiBody({ type: ChangePasswordDto })
  @Patch('/changePassword/:userId')
  async changePassword(
    @Param('userId') userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    return this.authService.changePassword(userId, changePasswordDto);
  }
}
