import { z } from 'zod';

const typesEnum = z.enum([
  'HAIRCUTS',
  'MAKE_UP',
  'MANICURE',
  'MASSAGE',
  'BARBER',
]);

export const createCompanyValidateSchema = z.object({
  name: z.string().min(4),
  description: z.string().min(10),
  types: z.union([typesEnum, z.array(typesEnum)]),
  cnpj: z.string(),
});
