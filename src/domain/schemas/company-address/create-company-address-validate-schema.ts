import { z } from 'zod';

export const createCompanyAddressValidateSchema = z.object({
  state: z.string(),
  city: z.string(),
  street: z.string(),
  district: z.string(),
  number: z.number(),
  zipCode: z.string(),
  companyId: z.string(),
  reference: z.string().optional().nullable().default(null),
  complement: z.string().optional().nullable().default(null),
});
