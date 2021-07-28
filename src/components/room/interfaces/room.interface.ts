import { Types } from 'mongoose';

export default interface IRoom {
  readonly title: string;
  readonly ownerId: Types.ObjectId;
  readonly description: string;
  readonly usersId: string[];
}
