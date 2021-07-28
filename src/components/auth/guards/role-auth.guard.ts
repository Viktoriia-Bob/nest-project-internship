import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { rolesEnum } from 'src/components/user/enums/roles.enum';
import { ROLES_KEY } from '../decorators/role.decorator';
import ITokenPayload from '../interfaces/token-payload.interface';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<rolesEnum>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { headers } = context.switchToHttp().getRequest();
    const token = headers.authorization.slice(7);
    const payload = (await this.jwtService.verify(token)) as ITokenPayload;
    if (payload.role === requiredRoles) {
      return true;
    }
    return false;
  }
}
