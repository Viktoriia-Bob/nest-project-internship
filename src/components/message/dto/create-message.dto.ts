import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  ownerId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  roomId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  text: string;
}
