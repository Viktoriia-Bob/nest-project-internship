import { Types } from 'mongoose';

export interface IStrategyValidate {
  _id: Types.ObjectId;
  email: string;
  name: string;
}
