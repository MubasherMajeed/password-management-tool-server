import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CompanyService } from "./company.service";
import { CompanyCreateRequestDto, CompanyResponseDto, CompanyUpdateRequestDto } from "../../data/dtos/company.dto";

@ApiTags("Company")
@Controller('company')
export class CompanyController {
constructor(private readonly service:CompanyService) {
}

  @ApiOkResponse({ type: [CompanyResponseDto], description: "All Companies" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Errors" })
  @Get()
  async fetchAll(){
    return this.service.fetch();
  }



  @ApiOkResponse({ type: CompanyResponseDto, description: "Company with id " })
  @ApiInternalServerErrorResponse({ description: "Unexpected Errors" })
  @Get("/:id")
  async fetchOne(@Param("id") id:string){
    return this.service.fetch(id);
  }



  @ApiCreatedResponse({ type: CompanyResponseDto, description: "Company Created Successfully" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Error" })
  @ApiBody({
    type: CompanyCreateRequestDto
  })
  @Post()
  async createNew(@Body() data:any){
    return this.service.create(data);
  }


  @ApiCreatedResponse({ type: CompanyResponseDto, description: "Company Updated Successfully" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Error" })
  @Patch("/:id")
  @ApiBody({type:CompanyUpdateRequestDto})
  async updateOne(@Param("id") id:string,@Body() data:any){
    return this.service.update(id,data);
  }


  @ApiOkResponse({ description: "Company Deleted successfully" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Errors" })
  @Delete("/:id")
  async delete(@Param("id") id:string){
    await this.service.delete(id);
  }


}
