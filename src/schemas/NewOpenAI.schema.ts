import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NewOpenAI extends Document {
  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  projectFrameWork: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  fileData: any[];

  @Prop({ required: false, default: Date.now() })
  createdAt: Date;

  @Prop({ required: false, default: Date.now() })
  updatedAt: Date;
}

export const newOpenAISchema = SchemaFactory.createForClass(NewOpenAI);
