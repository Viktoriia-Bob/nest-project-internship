import { Document, Types } from 'mongoose';
import { statusEnum } from '../enums/status.enum';

export class UserEntity extends Document {
  readonly _id: Types.ObjectId;
  readonly name: string;
  readonly email: string;
  emailVerify: boolean;
  readonly password: string;
  readonly roomId: string;
  readonly avatar: string;
  status: statusEnum;
}
