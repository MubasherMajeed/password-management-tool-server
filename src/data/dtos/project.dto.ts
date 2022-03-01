import { ApiProperty, PartialType } from "@nestjs/swagger";


export class ProjectCreateRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String] })
  passwords: [string];

  @ApiProperty({ type: [String] })
  guests: [string];
}


export class ProjectUpdateRequestDto extends PartialType(ProjectCreateRequestDto) {

}

export class ProjectResponseDto extends PartialType(ProjectCreateRequestDto) {
  @ApiProperty()
  _id: string;

}
