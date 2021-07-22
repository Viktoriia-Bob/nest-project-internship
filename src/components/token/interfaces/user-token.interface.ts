import { Types } from 'mongoose';

export class IUserToken {
  readonly token: string;
  readonly userId: Types.ObjectId;
  readonly expireAt: string;
}
