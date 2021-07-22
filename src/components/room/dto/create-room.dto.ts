import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoomDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  ownerId: Types.ObjectId;

  @IsString()
  @ApiProperty()
  @IsOptional()
  description: string;

  @IsMongoId({ each: true })
  @ApiProperty()
  @IsOptional()
  usersId: Array<Types.ObjectId>;
}
