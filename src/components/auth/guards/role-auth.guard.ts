import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { rolesEnum } from 'src/components/user/enums/roles.enum';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<rolesEnum>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    console.log('context -', context.switchToHttp().getRequest());
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    if (user.role === ROLES_KEY) {
      return true;
    }
    return false;
  }
}
