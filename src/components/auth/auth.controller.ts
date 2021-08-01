import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import AuthService from './auth.service';
import ChangePasswordDto from './dto/change-password.dto';
import ConfirmAccountDto from './dto/confirm-account.dto';
import ForgotPasswordDto from './dto/forgot-password.dto';
import SignUpDto from './dto/sign-up.dto';
import SignInDto from './dto/sign-in.dto';
import LocalAuthGuard from './guards/local-auth.guard';
import RefreshTokensDto from './dto/refresh-tokens.dto';

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: SignUpDto })
  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<boolean> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/confirm')
  async confirm(@Query() query: ConfirmAccountDto): Promise<boolean> {
    await this.authService.confirm(query.token);
    return true;
  }

  @ApiBody({ type: SignInDto })
  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return await this.authService.signIn(signInDto);
  }

  @ApiBody({ type: ForgotPasswordDto })
  @Post('/forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Get('/forgot-password')
  async getForgotPassword(@Query() query: ConfirmAccountDto): Promise<boolean> {
    await this.authService.getForgotPassword(query.token);
    return true;
  }

  @ApiBody({ type: ChangePasswordDto })
  @Patch('/change-password/:userId')
  async changePassword(
    @Param('userId') userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    return this.authService.changePassword(userId, changePasswordDto);
  }

  @ApiBody({ type: RefreshTokensDto })
  @Get('/refresh-tokens')
  async refreshTokens(@Query() query: RefreshTokensDto) {
    return this.authService.refreshTokens(query.token);
  }

  @Get('/sign/in/by/token')
  async signInByToken(@Query('token') token: string) {
    return this.authService.signInByToken(token);
  }
}
