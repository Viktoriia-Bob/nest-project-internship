import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IStrategyValidate } from '../interfaces/strategy-validate.interface';
import { ITokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.SECRET_OR_KEY}`,
    });
  }

  async validate(payload: ITokenPayload): Promise<IStrategyValidate> {
    console.log(payload);
    return {
      _id: payload._id,
      name: payload.name,
      email: payload.email,
    };
  }
}
