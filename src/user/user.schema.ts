import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({required: true, default: Date.now})
  createdAt: Date;

  @Prop({required: true, unique: true, default: 'JaneDoe'})
  username: string;

  @Prop({required: true, unique: true, default: 'JaneDoeLovesBark'})
  nickname: string;

  @Prop({required: true, unique: true, lowercase: true, default: 'janedoelovesyou@example.com'})
  email: string;

  @Prop({required: true, default: ''})
  password: string;

  @Prop()
  birthdate: Date;

  @Prop({required: true, default: []})
  interest: string[];
  
  @Prop({required: true, default: false})
  isVerified: boolean;

  @Prop({})
  otpCode: string

  @Prop()
  otpExpiration: Date;

  @Prop()
  isFinishSignUp: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
