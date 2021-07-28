import { Types } from 'mongoose';
import { rolesEnum } from 'src/components/user/enums/roles.enum';

export default interface ITokenPayload {
  _id: Types.ObjectId;
  email: string;
  role: rolesEnum;
}
