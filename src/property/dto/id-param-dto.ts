import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class IdParamDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'Id must be a positive number' })
  id: number;
}
