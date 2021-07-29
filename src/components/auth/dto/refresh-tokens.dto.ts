import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class RefreshTokensDto {
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}
