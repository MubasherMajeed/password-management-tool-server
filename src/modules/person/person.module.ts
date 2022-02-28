import { Module } from "@nestjs/common";
import { PersonService } from "./person.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PersonController } from "./person.controller";
import { Person, PersonSchema } from "../../data/schemas/person.schema";
import { ForgotPassword, ForgotPasswordSchema } from "../../data/schemas/forgotPassword.schema";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Person.name, schema: PersonSchema },
    { name: ForgotPassword.name, schema: ForgotPasswordSchema }
  ])],
  providers: [PersonService],
  controllers: [PersonController],
  exports: [PersonService]
})
export class PersonModule {
}
