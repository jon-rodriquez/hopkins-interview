import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsString()
  @IsNotEmpty()
  from: string;
}
