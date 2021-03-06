import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Company, CompanyDocument } from "../../data/schemas/company.schema";
import { Model } from "mongoose";
import { Password } from "../../data/schemas/password.schema";
import { Person } from "../../data/schemas/person.schema";

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private readonly model: Model<CompanyDocument>) {
  }

  fetch(id?: string) {
    if (id) return this.model.findById(id).exec();
    return this.model.find()
      .populate({
        path: "projects",
        populate: [
          {
            path: "passwords",
            model: Password.name
          }
        ]
      }).populate({
        path: "projects",
        populate: [
          {
            path: "guests",
            model: Person.name
          }
        ]
      }).exec();
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
