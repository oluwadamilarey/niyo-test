import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false, timestamps: true })
export class Todo extends AbstractDocument {
  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop()
  expiryDate?: Date;

  @Prop({ required: true })
  userId: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
