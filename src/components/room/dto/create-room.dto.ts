import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  ownerId: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  description: string;

  @IsMongoId({ each: true })
  @ApiProperty()
  @IsOptional()
  usersId: Array<string>;
}
