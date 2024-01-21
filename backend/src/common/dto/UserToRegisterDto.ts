import {IsDate, IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class UserToRegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  username:string;

  @IsDate()
  @IsNotEmpty()
  dateOfRegistration: Date;

  @MinLength(8)
  @IsNotEmpty()
  password:string;

  @IsEmail()
  @IsNotEmpty()
  email:string;
}
