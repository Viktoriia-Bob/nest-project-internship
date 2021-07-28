import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export default class CreateMessageDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  ownerId: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  roomId: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  text: string;
}
