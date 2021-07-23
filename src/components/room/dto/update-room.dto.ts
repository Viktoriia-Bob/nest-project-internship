import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  ownerId?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  description?: string;

  @IsMongoId({ each: true })
  @ApiProperty()
  @IsOptional()
  usersId?: string[];
}
