import { z } from 'zod';

const typesEnum = z.enum([
  'HAIRCUTS',
  'MAKE_UP',
  'MANICURE',
  'MASSAGE',
  'BARBER',
]);

export const createCompanyValidateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(4).optional(),
  description: z.string().min(10).optional(),
  types: z.union([typesEnum, z.array(typesEnum)]).optional(),
});
