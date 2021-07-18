import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  ownerId: Types.ObjectId;

  @IsString()
  description: string;

  @IsMongoId({ each: true })
  @IsOptional()
  usersId: Array<Types.ObjectId>;
}
