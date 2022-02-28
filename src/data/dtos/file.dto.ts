import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FileDTO {
  @IsString()
  @ApiProperty()
  name: String;

  @IsString()
  @ApiProperty()
  path: String;

}
