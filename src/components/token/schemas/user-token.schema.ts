import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'tokens',
})
export class Token {
  @Prop()
  token: string;

  @Prop()
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  expiresAt: string;
}

export const UserTokenSchema = SchemaFactory.createForClass(Token);
