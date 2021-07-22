import { Types } from 'mongoose';

export interface IUser {
  readonly _id: Types.ObjectId;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly roomId: Types.ObjectId;
  readonly avatar: string;
  status: string;
  accessToken: string;
}
