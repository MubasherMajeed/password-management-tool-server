import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Password, PasswordDocument } from "../../data/schemas/password.schema";

@Injectable()
export class PasswordService {
  constructor(@InjectModel(Password.name) private readonly model:Model<PasswordDocument>) {
  }
  fetch(id?: string) {
    if (id) return this.model.findById(id).exec();
    return this.model.find().exec();
  }

  async fetchByUserId(id: string) {
    return await this.model.find({ user_id: id }).sort({ "createdAt": -1 }).exec();
  }


  async create(data: any) {
    return (await this.model.create(data));
  }


  update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data).exec();
  }

  delete(id: string) {
    // this.model.find({ 'images.user_id': "" }).exec()
    return this.model.findByIdAndDelete(id).exec();
  }

}
