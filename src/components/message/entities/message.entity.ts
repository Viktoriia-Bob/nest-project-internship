import { Document } from 'mongoose';

export default class MessageEntity extends Document {
  readonly ownerId: string;
  readonly roomId: string;
  readonly text: string;
}
