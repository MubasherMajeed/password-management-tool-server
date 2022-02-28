import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from "./common/auth/auth.module";
import { DbModule } from "./common/db/db.module";
import { MulterModule } from "@nestjs/platform-express";
import { ImageUtils } from "./common/lib/image-utils";
import { PersonModule } from "./modules/person/person.module";
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from "./modules/company/company.module";


@Module({
  imports: [
    CompanyModule,
    //To use .env variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),AuthModule,DbModule,MulterModule.register({
    dest: ImageUtils.imagePath,
  }),PersonModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
