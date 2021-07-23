import { IsDateString, IsMongoId, IsString } from 'class-validator';

export class CreateUserTokenDto {
  @IsString()
  token: string;

  @IsMongoId()
  userId: string;

  @IsDateString()
  expireAt: string;
}
