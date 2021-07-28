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
import { rolesEnum } from '../enums/roles.enum';
import { statusEnum } from '../enums/status.enum';

export default class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  readonly name?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  emailVerify?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  readonly password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @IsMongoId()
  readonly roomId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @IsUrl()
  readonly avatar?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @IsEnum(statusEnum)
  readonly status?: statusEnum;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @IsEnum(rolesEnum)
  readonly role?: rolesEnum;
}
