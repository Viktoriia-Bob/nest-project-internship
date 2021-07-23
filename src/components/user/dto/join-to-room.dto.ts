import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class JoinToRoomDto {
  @IsString()
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  roomId: string;
}
