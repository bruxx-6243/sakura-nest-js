import { BadRequestException, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodTypeAny) {}

  transform(value: unknown): unknown {
    const parsedValue = this.schema.safeParse(value);

    if (!parsedValue.success) {
      const errorMessage = parsedValue.error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ');

      throw new BadRequestException(errorMessage);
    }

    return parsedValue.data;
  }
}
