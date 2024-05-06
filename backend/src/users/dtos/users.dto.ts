import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class SignupDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ValidateIf((o) => o.password === o.confirmPassword)
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
