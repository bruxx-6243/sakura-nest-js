import { IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  area: number;

  @IsNotEmpty({ groups: ['create'] })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
}
