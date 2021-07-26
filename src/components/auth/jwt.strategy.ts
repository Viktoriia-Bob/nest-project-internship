import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.SECRET_OR_KEY}`,
    });
  }

  async validate(payload) {
    console.log('payload -', payload);
    return {
      _id: payload._id,
      email: payload.email,
      role: payload.role,
    };
  }
}
