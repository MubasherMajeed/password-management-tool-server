import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  PersonResponse,
  PersonUpdateRequest,
} from '../../data/dtos/person.dto';
import { PersonService } from './person.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
} from '@nestjs/common';

@ApiTags('Person')
@Controller('persons')
export class PersonController {
  constructor(private readonly service: PersonService) {}

  // // ----------------------------------------- Reset Password ---------------------------------------------//
  // @ApiOkResponse({
  //   description: 'Password Reset Successfully',
  // })
  // @ApiInternalServerErrorResponse({ description: 'Unexpected Errors' })
  // @ApiBadRequestResponse({ description: 'Issue in request data' })
  // @ApiNotAcceptableResponse({
  //   description: 'Reset Password Email has been expired!',
  // })
  // @Patch('reset-password')
  // async resetPassword(@Body() data: ResetPassword): Promise<any> {
  //   return this.service.resetPassword(data);
  // }

  @ApiOkResponse({
    type: [PersonResponse],
    description: 'Get all users',
  })
  @ApiInternalServerErrorResponse({ description: 'Unexpected Errors' })
  @Get()
  fetchAll() {
    return this.service.fetch();
  }

  // // ----------------------------------------- Forgot Password ---------------------------------------------//
  // @ApiOkResponse({
  //   description: 'Email has been sent successfully',
  // })
  // @ApiNotAcceptableResponse({ description: 'Email not exists!' })
  // @ApiBadRequestResponse({ description: 'Issue in request data' })
  // @ApiInternalServerErrorResponse({ description: 'Unexpected Errors' })
  // @Post('forgot-password')
  // async forgotPassword(@Body() data: ForgotPasswordRequest): Promise<any> {
  //   return this.service.forgotPassword(data.email);
  // }

  // // ----------------------------------------- Verify Account ---------------------------------------------//
  // @ApiOkResponse({
  //   description: 'Account Verified Successfully',
  //   type: PersonResponse,
  // })
  // @ApiInternalServerErrorResponse({ description: 'Unexpected Errors' })
  // @ApiNotAcceptableResponse({
  //   description:
  //     'Invalid Verification Email, You can re-send verification email after login',
  // })
  // @ApiConflictResponse({ description: 'Account Already Verified!' })
  // @ApiBadRequestResponse({ description: 'Issue in request data' })
  // @Patch('verify-account')
  // async verifyAccount(@Body() data: AccountVerification): Promise<any> {
  //   return this.service.verifyAccount(data.id, data.hash);
  // }

  // // ----------------------------------------- Resend Account Verification Email ---------------------------------------------//
  // @ApiOkResponse({
  //   description: 'Account Verification Email has been sent successfully',
  //   type: PersonResponse,
  // })
  // @ApiBadRequestResponse({ description: 'Issue in request data' })
  // @ApiInternalServerErrorResponse({ description: 'Unexpected Errors' })
  // @Patch('verification-email')
  // async sendAccountVerificationEmail(
  //   @Body() data: AccountVerificationEmail,
  // ): Promise<any> {
  //   return this.service.sendAccountVerificationEmail(
  //     data.email,
  //     data.name,
  //     data.id,
  //   );
  // }

  // ----------------------------------------- Update Password ---------------------------------------------//
  // @ApiOkResponse({
  //   description: 'Password Updated Successfully',
  // })
  // @ApiInternalServerErrorResponse({ description: 'Unexpected Errors' })
  // @ApiBadRequestResponse({ description: 'Issue in request data' })
  // @ApiNotAcceptableResponse({ description: 'Old Password Not Correct!' })
  // @Patch('change-password')
  // async updatePassword(@Body() data: PasswordUpdateRequest): Promise<any> {
  //   return this.service.updatePassword(data);
  // }

  @ApiOkResponse({
    type: PersonResponse,
    description: 'Get single user',
  })
  @ApiInternalServerErrorResponse({ description: 'Unexpected Errors' })
  @Get(':id')
  fetchOne(@Param('id') id: string) {
    return this.service.fetch(id);
  }

  @ApiCreatedResponse({
    type: PersonResponse,
    description: 'Person Updated Successfully',
  })
  @ApiBadRequestResponse({ description: 'Issue in request data' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected Error' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: PersonUpdateRequest) {
    return this.service.update(id, data);
  }

  @ApiOkResponse({ description: 'Person deleted successfully' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
