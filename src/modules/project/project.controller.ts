import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CompanyCreateRequestDto, CompanyResponseDto, CompanyUpdateRequestDto } from "../../data/dtos/company.dto";
import { ProjectService } from "./project.service";
import { ProjectCreateRequestDto, ProjectResponseDto, ProjectUpdateRequestDto } from "../../data/dtos/project.dto";

@ApiTags("Project")
@Controller('project')
export class ProjectController {
  constructor(private readonly service:ProjectService) {
  }

  @ApiOkResponse({ type: [ProjectResponseDto], description: "All Projects" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Errors" })
  @Get()
  async fetchAll(){
    return this.service.fetch();
  }



  @ApiOkResponse({ type: ProjectResponseDto, description: "Project with id " })
  @ApiInternalServerErrorResponse({ description: "Unexpected Errors" })
  @Get("/:id")
  async fetchOne(@Param("id") id:string){
    return this.service.fetch(id);
  }



  @ApiCreatedResponse({ type: ProjectResponseDto, description: "Project Created Successfully" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Error" })
  @ApiBody({
    type: ProjectCreateRequestDto
  })
  @Post()
  async createNew(@Body() data:any){
    return this.service.create(data);
  }


  @ApiCreatedResponse({ type: ProjectResponseDto, description: "Project Updated Successfully" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Error" })
  @Patch("/:id")
  @ApiBody({type:ProjectUpdateRequestDto})
  async updateOne(@Param("id") id:string,@Body() data:any){
    return this.service.update(id,data);
  }


  @ApiOkResponse({ description: "Project Deleted successfully" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Errors" })
  @Delete("/:id")
  async delete(@Param("id") id:string){
    await this.service.delete(id);
  }


}
