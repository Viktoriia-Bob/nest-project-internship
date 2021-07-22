import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateRoomDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  ownerId?: Types.ObjectId;

  @IsString()
  @ApiProperty()
  @IsOptional()
  description?: string;

  @IsMongoId({ each: true })
  @ApiProperty()
  @IsOptional()
  usersId?: Array<Types.ObjectId>;
}
