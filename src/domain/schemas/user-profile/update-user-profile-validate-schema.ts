import { z } from 'zod';

const typesEnum = z.enum([
  'HAIRCUTS',
  'MAKE_UP',
  'MANICURE',
  'MASSAGE',
  'BARBER',
]);

export const updateUserProfileValidateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(4).optional(),
  specialties: z.union([typesEnum, z.array(typesEnum)]).optional(),
});
