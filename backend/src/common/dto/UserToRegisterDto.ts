import {IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, MinLength} from "class-validator";

export class UserToRegisterDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;

  @IsNotEmpty()
  username:string;
  @IsNotEmpty()
  lastname: string;

  @IsDate()
  @IsNotEmpty()
  dateOfRegistration: Date;

  @MinLength(8)
  @IsNotEmpty()
  password:string;

  @IsEmail()
  @IsNotEmpty()
  email:string;

  @IsNotEmpty()
  @IsPhoneNumber()
  tel:string

  @IsNotEmpty()
  gender:string;
}
