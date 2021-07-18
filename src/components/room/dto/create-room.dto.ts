import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
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
  usersId: Array<Types.ObjectId>;
}
