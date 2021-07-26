import { SetMetadata } from '@nestjs/common';
import { rolesEnum } from 'src/components/user/enums/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (role: rolesEnum) => SetMetadata(ROLES_KEY, role);
