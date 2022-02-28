import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { FileSchema } from "./file.schema";


export type PasswordDocument = Password & Document;

@Schema({ timestamps: true })
export class Password {
 @Prop()
  url:string;

  @Prop()
  name:string;

  @Prop()
  folder:string;

  @Prop()
  user_name:string;

  @Prop()
  site_password:string

  @Prop()
  notes : string;

  @Prop()
  files:[FileSchema]
}

export const PasswordSchema = SchemaFactory.createForClass(Password);
