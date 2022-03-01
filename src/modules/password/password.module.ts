import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Password, PasswordSchema } from "../../data/schemas/password.schema";

@Module({
  imports:[MongooseModule.forFeature([{name:Password.name ,schema:PasswordSchema}])],
  providers: [PasswordService],
  controllers: [PasswordController]
})
export class PasswordModule {}
