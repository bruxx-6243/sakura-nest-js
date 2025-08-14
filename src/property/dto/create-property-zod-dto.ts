import z from 'zod';

export const createPropertySchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z
      .string()
      .min(5, { message: 'Description must be at least 5 characters long' })
      .optional(),
    area: z.number().min(1, { message: 'Area is required' }).positive(),
  })
  .required();

export type CreatePropertyZodDto = z.infer<typeof createPropertySchema>;

export const updatePropertySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).optional(),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters long' })
    .optional(),
  area: z
    .number()
    .min(1, { message: 'Area is required' })
    .positive()
    .optional(),
});
