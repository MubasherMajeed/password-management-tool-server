import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpRequest } from '../../data/dtos/auth.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Person, PersonDocument } from '../../data/schemas/person.schema';
import {
  ForgotPassword,
  ForgotPasswordDocument,
} from '../../data/schemas/forgotPassword.schema';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private readonly model: Model<PersonDocument>,
    @InjectModel(ForgotPassword.name)
    private readonly forgotPasswordModel: Model<ForgotPasswordDocument>,
  ) {}

  fetch(id?: string) {
    if (id) return this.model.findById(id).exec();
    return this.model.find().exec();
  }

  async create(data: SignUpRequest) {
    if (await this.model.findOne({ username: data.username })) {
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    let user = (await this.model.create(data)) as PersonDocument;
    return user;
  }





  update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data).exec();
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }

  async fetchByUsername(username: string): Promise<Person> {
    return await this.model.findOne({ username }).exec();
  }

  ///////////////////////////////
  // Used In Auth Module only ///
  ///////////////////////////////
  async fetchByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<Person> {
    return await this.model.findOne({ username, password }).exec();
  }

  // async sendAccountVerificationEmail(
  //   email: string,
  //   name: string,
  //   id: string,
  // ): Promise<boolean> {
  //   try {
  //     const hash = await NoGeneratorUtils.generateCode();
  //
  //     if (
  //       await SendGridMail.sendGridEmail(
  //         SendGridTemplates.Verification,
  //         {
  //           name: name,
  //           verification_url:
  //             'https://app.reputationrooster.com/auth/verifyaccount/' +
  //             hash +
  //             '/' +
  //             id,
  //         },
  //         email.toString(),
  //       )
  //     ) {
  //       if (
  //         await this.model
  //           .findByIdAndUpdate(id, { verification_hash: hash })
  //           .exec()
  //       )
  //         return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     Http500.throw(error);
  //   }
  // }

  // async verifyAccount(id: string, hash: string): Promise<Person> {
  //   let person;
  //   try {
  //     person = await this.model
  //       .findOne({ _id: id, verification_hash: hash })
  //       .exec();
  //   } catch (e) {
  //     throw new HttpException(
  //       'Invalid Request',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  //   if (person) {
  //     try {
  //       return await this.model
  //         .findOneAndUpdate(
  //           { _id: id, verification_hash: hash },
  //           {
  //             is_verified: true,
  //             verification_hash: null,
  //           },
  //         )
  //         .exec();
  //     } catch (e) {
  //       Http500.throw(e);
  //     }
  //   } else if (
  //     await this.model.findOne({ _id: id, is_verified: true }).exec()
  //   ) {
  //     throw new HttpException('Account Already Verified!', HttpStatus.CONFLICT);
  //   } else {
  //     throw new HttpException(
  //       'Verification email is expired',
  //       HttpStatus.NOT_ACCEPTABLE,
  //     );
  //   }
  // }

  // async updatePassword(data: PasswordUpdateRequest) {
  //   if (
  //     !(await this.model
  //       .findOne({ _id: data.person_id, password: data.oldPassword })
  //       .exec())
  //   ) {
  //     throw new HttpException(
  //       'Old Password Not Correct!',
  //       HttpStatus.NOT_ACCEPTABLE,
  //     );
  //   } else {
  //     return await this.model
  //       .findByIdAndUpdate(
  //         data.person_id,
  //         { password: data.newPassword },
  //         { new: true },
  //       )
  //       .exec();
  //   }
  // }

  // async forgotPassword(email: string) {
  //   const person = (await this.model
  //     .findOne({ username: email.toLowerCase() })
  //     .exec()) as PersonDocument;
  //
  //   if (person) {
  //     try {
  //       const hash = await NoGeneratorUtils.generateCode();
  //
  //       if (
  //         await SendGridMail.sendGridEmail(
  //           SendGridTemplates.ForgotPassword,
  //           {
  //             reset_password_url:
  //               'https://app.reputationrooster.com/auth/resetpassword/' + hash,
  //           },
  //           email,
  //         )
  //       ) {
  //         await this.forgotPasswordModel
  //           .findOneAndDelete({ person: person._id })
  //           .exec();
  //         return await this.forgotPasswordModel.create({
  //           person: person._id,
  //           hash,
  //         });
  //       }
  //     } catch (error) {
  //       Http500.throw(error);
  //     }
  //   } else {
  //     throw new HttpException(
  //       'The email you entered does not exist in our system!',
  //       HttpStatus.NOT_ACCEPTABLE,
  //     );
  //   }
  // }

  // async resetPassword(document: ResetPassword): Promise<Person> {
  //   const forgotPasswordDocument = (await this.forgotPasswordModel
  //     .findOne({ hash: document.hash })
  //     .exec()) as ForgotPasswordDocument;
  //   if (
  //     forgotPasswordDocument &&
  //     moment().diff(
  //       // @ts-ignore
  //       forgotPasswordDocument.createdAt,
  //       'hours',
  //     ) < 24
  //   ) {
  //     try {
  //       await this.forgotPasswordModel
  //         .findByIdAndDelete(forgotPasswordDocument._id)
  //         .exec();
  //       return await this.model
  //         .findByIdAndUpdate(
  //           forgotPasswordDocument.person,
  //           { password: document.password },
  //           { new: true },
  //         )
  //         .exec();
  //     } catch (error) {
  //       Http500.throw(error);
  //     }
  //   } else {
  //     throw new HttpException(
  //       'Reset Password Email has been expired!',
  //       HttpStatus.NOT_ACCEPTABLE,
  //     );
  //   }
  // }
}
