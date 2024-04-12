import { z } from 'zod';

export const authSignInValidateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
