import { Document } from 'mongoose';

export class MessageEntity extends Document {
  readonly ownerId: string;
  readonly roomId: string;
  readonly text: string;
}
