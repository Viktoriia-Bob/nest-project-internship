import { Types } from 'mongoose';

export interface ITokenPayload {
  _id: Types.ObjectId;
  email: string;
  name: string;
}
