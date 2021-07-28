import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  @IsString()
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  readonly password: string;
}
