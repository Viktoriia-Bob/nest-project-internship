import { Document, Types } from 'mongoose';

export class MessageEntity extends Document {
  readonly ownerId: Types.ObjectId;
  readonly roomId: Types.ObjectId;
  readonly text: string;
}
