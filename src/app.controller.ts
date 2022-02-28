import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse, ApiParam,
  ApiTags
} from "@nestjs/swagger";
import { FileDTO } from "./data/dtos/file.dto";
import { SaveFileDTO } from "./data/dtos/person.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageUtils } from "./common/lib/image-utils";
import { Http500 } from "./common/lib/Http500";


@ApiTags("Main")
@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return "Hello From Server Side";
  }


  // ----------------------------------------- Save Image ---------------------------------------------//
  @ApiCreatedResponse({ type: FileDTO, description: "Image Saved Successfully" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Error" })
  @ApiBody({ type: SaveFileDTO })
  @ApiConsumes("multipart/form-data")
  @Post("save-image")
  @UseInterceptors(FileInterceptor("image"))
  saveImage(@UploadedFile() file): any {
    return { name: file.filename, path: file.path};
  }

  // ----------------------------------------- delete Image ---------------------------------------------//
  @ApiOkResponse({ description: "Image deleted Successfully" })
  @ApiInternalServerErrorResponse({ description: "Unexpected Error" })
  @ApiParam({
    name: "name",
    type: "String",
    required: true
  })
  @Delete("delete-image/:name")
  deleteImage(@Param("name") name: string): any {
    const imagePath = ImageUtils.imagePath + "/" + name;
    try {
      return ImageUtils.deleteImages(imagePath, true);
    } catch (error) {
      Http500.throw(error);
    }
  }


}
