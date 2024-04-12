import { z } from 'zod';

export const authSignUpValidateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['ADMIN', 'EMPLOYEE']).optional(),
});
