import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import z from 'zod';

export class IdParamDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'Id must be a positive number' })
  id: number;
}

export const idParamSchema = z
  .string()
  .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
    message: 'Id must be a valid UUID',
  });

export type IdParamZodDto = z.infer<typeof idParamSchema>;
