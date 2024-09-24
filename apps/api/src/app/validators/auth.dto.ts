import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;  // First Name validation

  @IsNotEmpty()
  @IsString()
  lastName: string;  // Last Name validation


  @IsNotEmpty()
  @IsString()
  username: string;  // Last Name validation

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })  // Validates email format
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })  // Updated to 8 characters based on your form
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Confirm password must be at least 8 characters long' })
  confirmPassword: string;  // Validation for confirm password
}

export class SignInDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })  // Email-based sign-in
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
