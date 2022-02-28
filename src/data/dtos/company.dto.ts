import { ApiProperty, PartialType } from "@nestjs/swagger";
import { FileDTO } from "./file.dto";


export class CompanyCreateRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ type: [String] })
  guests: [string];

  @ApiProperty({ type: FileDTO })
  logo: FileDTO;

  @ApiProperty({ type: [String] })
  projects: [string];
}


export class CompanyUpdateRequestDto extends PartialType(CompanyCreateRequestDto) {

}

export class CompanyResponseDto extends PartialType(CompanyCreateRequestDto) {

  @ApiProperty()
  _id: string;
}
