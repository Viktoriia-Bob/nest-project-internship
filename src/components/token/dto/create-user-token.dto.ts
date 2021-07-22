import { IsDateString, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserTokenDto {
  @IsString()
  token: string;

  @IsMongoId()
  userId: Types.ObjectId;

  @IsDateString()
  expireAt: string;
}
