import { z } from 'zod';

const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

export const createOperationTimeValidateSchema = z.object({
  startMorning: z.string().regex(regex),
  endAfternoon: z.string().regex(regex),
  companyId: z.string().uuid(),
  endMorning: z.string().regex(regex).optional().nullable().default(null),
  startAfternoon: z.string().regex(regex).optional().nullable().default(null),
});
