import { z } from 'zod';

export const validateCompanyInviteValidateSchema = z.object({
  code: z.string().min(8),
});
