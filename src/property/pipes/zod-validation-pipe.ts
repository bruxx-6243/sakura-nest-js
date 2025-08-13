import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodError, z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodTypeAny) {}

  transform(value: unknown): unknown {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errorMessage = error.issues
          .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
          .join(', ');

        throw new BadRequestException(errorMessage);
      }

      throw new BadRequestException('Validation failed');
    }
  }
}
