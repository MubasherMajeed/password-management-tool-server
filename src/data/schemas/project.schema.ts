import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Person } from "./person.schema";
import { Password } from "./password.schema";


export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop()
  name:string;

  @Prop()
  description:string;

  @Prop([{type:mongoose.Schema.Types.ObjectId ,ref:Password.name}])
  passwords:[string];

  @Prop([{type:mongoose.Schema.Types.ObjectId,ref:Person.name}])
  guests : [string];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
