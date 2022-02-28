import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { FileSchema } from "./file.schema";
import mongoose, { Document } from "mongoose";
import { Person } from "./person.schema";



export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  @Prop()
  name:string;

  @Prop()
  website:string;

  @Prop()
  address:string;

  @Prop([{type:mongoose.Schema.Types.ObjectId,ref:Person.name}])
  guests : [string];

  @Prop()
  logo:FileSchema

  @Prop()
  projects:[string]

}

export const CompanySchema = SchemaFactory.createForClass(Company);
