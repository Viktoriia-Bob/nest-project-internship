import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMessageDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  ownerId: Types.ObjectId;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  roomId: Types.ObjectId;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  text: string;
}
