import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  text?: string;
}
