import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export default class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  @ApiProperty()
  readonly password: string;
}
