import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { statusEnum } from '../enums/status.enum';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @IsOptional()
  readonly name?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  readonly password?: string;

  @IsString()
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  readonly roomId?: Types.ObjectId;

  @IsString()
  @ApiProperty()
  @IsUrl()
  @IsOptional()
  readonly avatar?: string;

  @IsString()
  @IsEnum(statusEnum)
  @IsOptional()
  readonly status?: string;

  @IsString()
  @IsOptional()
  accessToken?: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;
}
