import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AccessTokenResponse {
  @ApiProperty()
  access_token: string;
}

export class SignInRequest {
  @IsEmail()
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class SignUpRequest {
  @IsEmail()
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  first_name: string;

  @IsString()
  @ApiProperty()
  last_name: string;

  @IsString()
  @ApiProperty()
  phone: string;
}

