import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  readonly password?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly roomId?: Types.ObjectId;

  @IsString()
  @IsUrl()
  @IsOptional()
  readonly avatar?: string;
}
