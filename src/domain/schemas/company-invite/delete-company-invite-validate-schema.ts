import { z } from 'zod';

export const deleteCompanyInviteValidateSchema = z.object({
  id: z.string(),
});
