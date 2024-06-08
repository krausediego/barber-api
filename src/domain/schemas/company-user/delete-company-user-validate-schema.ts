import { z } from 'zod';

export const deleteCompanyUserValidateSchema = z.object({
  id: z.string().uuid(),
});
