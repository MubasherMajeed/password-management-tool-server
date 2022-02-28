import {
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { FileDTO } from './file.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PersonUpdateRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: true })
  first_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: true })
  last_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @ApiProperty()
  image: FileDTO;
}

export class PersonResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  image: FileDTO;

  @ApiProperty()
  verification_hash: string;
}

export class PasswordUpdateRequest {
  @IsMongoId()
  @ApiProperty({ required: true, description: 'Person Id' })
  person_id: string;

  @IsString()
  @ApiProperty({ required: true })
  oldPassword: string;

  @IsString()
  @ApiProperty({ required: true })
  newPassword: string;
}

export class AccountVerification {
  @IsString()
  @ApiProperty()
  hash: string;

  @IsMongoId()
  @ApiProperty()
  id: string;
}

export class AccountVerificationEmail {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsMongoId()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;
}

export class ResetPassword {
  @IsString()
  @ApiProperty()
  hash: string;

  @IsString()
  @ApiProperty({ type: String, format: 'password' })
  password: string;
}

export class ForgotPasswordRequest {
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class SaveFileDTO {
  @ApiProperty({ required: true, type: 'string', format: 'binary' })
  image: FileDTO;
}
