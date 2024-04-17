import { z } from 'zod';

const typesEnum = z.enum([
  'HAIRCUTS',
  'MAKE_UP',
  'MANICURE',
  'MASSAGE',
  'BARBER',
]);

export const createUserProfileValidateSchema = z.object({
  name: z.string().min(4),
  specialties: z.union([typesEnum, z.array(typesEnum)]),
});
