import { Types, Document } from 'mongoose';

export class UserTokenEntity extends Document {
  readonly token: string;
  readonly userId: Types.ObjectId;
  readonly expireAt: string;
}
