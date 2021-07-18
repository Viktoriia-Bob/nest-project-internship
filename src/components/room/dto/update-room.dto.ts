import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateRoomDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  ownerId?: Types.ObjectId;

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId({ each: true })
  @IsOptional()
  usersId?: Array<Types.ObjectId>;
}
