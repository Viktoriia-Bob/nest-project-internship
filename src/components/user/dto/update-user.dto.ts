import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { statusEnum } from '../enums/status.enum';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @IsOptional()
  readonly name?: string;

  @IsBoolean()
  @IsOptional()
  emailVerify?: boolean;

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
  readonly roomId?: string;

  @IsString()
  @ApiProperty()
  @IsUrl()
  @IsOptional()
  readonly avatar?: string;

  @IsString()
  @IsEnum(statusEnum)
  @IsOptional()
  readonly status?: statusEnum;
}
