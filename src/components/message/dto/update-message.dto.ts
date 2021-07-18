import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  text?: string;
}
