import { IsString, IsNotEmpty, IsEmail, MaxLength, MinLength, IsEnum, IsOptional, IsUrl, IsNumber, IsPhoneNumber, Length, IsBoolean } from 'class-validator';
import { Role, Gender } from '@prisma/client';
export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(30, { message: 'Name must be at most 30 characters long' })
  name: string;

  @IsString({message: 'Email must be a string'})
  @IsNotEmpty({message: 'Email is required'})
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsNotEmpty({message: 'Password is required'})
  @MinLength(6, {message: 'Password must be at least 6 characters long'})
  @MaxLength(30, {message: 'Password must be at most 30 characters long'})
  password: string;

  @IsEnum(Role, { message: 'Role must be ADMIN or USER' })
  @IsOptional()
  role: Role;

  @IsOptional()
  @IsString({ message: 'Avatar must be a string' })
  @IsUrl({}, { message: 'Avatar must be a valid URL' })
  avatar: string;

  @IsNumber({}, { message: 'Age must be a number' })
  @IsOptional()
  age: number;

  @IsNumber({}, { message: 'Phone number must be a number' })
  @IsPhoneNumber('EG', { message: 'Phone number is must be a valid Egyptian phone number' })
  @Length(11, 11, { message: 'Phone number must be 11 digits' })
  @IsOptional()
  phoneNumber: number;

  @IsString({ message: 'Address must be a string' })
  @IsOptional()
  address: string;

  @IsEnum(Gender, { message: 'Gender must be MALE or FEMALE' })
  @IsOptional()
  gender: Gender;

  @IsBoolean({ message: 'Is Active must be a boolean' })
  @IsEnum(['true', 'false'], { message: 'Is Active must be true or false' })
  @IsOptional()
  isActive: boolean;

  @IsString({ message: 'verification code must be a string' })
  @Length(6, 6, { message: 'verification code must be 6 digits' })
  @IsOptional()
  verificationCode: string;

}
