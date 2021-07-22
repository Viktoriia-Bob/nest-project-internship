import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UserTokenEntity } from './entities/user-token.entity';
import { IUserToken } from './interfaces/user-token.interface';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Token') private tokenRepository: Model<UserTokenEntity>,
  ) {}

  async create(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
    return this.tokenRepository.create(createUserTokenDto);
  }

  async delete(userId: string, token: string) {
    return this.tokenRepository.deleteOne({ userId, token });
  }

  async deleteAll(userId: string) {
    return this.tokenRepository.deleteMany({ userId });
  }

  async exists(userId: Types.ObjectId, token: string): Promise<boolean> {
    return this.tokenRepository.exists({ userId, token });
  }
}
