import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class UserRegisteration extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ required: false, default: Date.now() })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const userRegisterationSchema =
  SchemaFactory.createForClass(UserRegisteration);
