import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Company, CompanyDocument } from "../../data/schemas/company.schema";
import { Model } from "mongoose";
import { Project, ProjectDocument } from "../../data/schemas/project.schema";

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private readonly model:Model<ProjectDocument>) {
  }
  fetch(id?: string) {
    if (id) return this.model.findById(id).exec();
    return this.model.find().exec();
  }

  search(name: string) {
    return this.model.find({name:{$regex: name}}).exec();
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
