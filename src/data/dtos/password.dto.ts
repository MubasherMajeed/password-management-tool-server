import { ApiProperty, PartialType } from "@nestjs/swagger";
import { FileDTO } from "./file.dto";


export class PasswordCreateRequestDto {
  @ApiProperty()
  url: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  folder: string;

  @ApiProperty()
  user_name: string;

  @ApiProperty()
  site_password: string;

  @ApiProperty()
  notes: string;

  @ApiProperty({ type: [FileDTO] })
  files: [FileDTO];
}


export class PasswordUpdateRequestDto extends PartialType(PasswordCreateRequestDto) {
}

export class PasswordResponseDto extends PartialType(PasswordCreateRequestDto) {
  @ApiProperty()
  _id: string;
}


