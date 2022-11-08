import { z } from 'zod';

export const schema = z.object({
  title: z.string().max(30).min(1),
  category: z.object({
    label: z.string(),
    value: z.string(),
  }),
  // TODO: add iamge
  // image: z.string(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  capacity: z.number().gt(0),
  detail: z.object({
    desc: z.string().min(1),
    processDesc: z.string().min(1),
    mStartDate: z.string().min(1),
    mEndDate: z.string().min(1),
    leaderDesc: z.string().min(1),
    targetDesc: z.string().min(1),
    note: z.string().optional().nullable(),
  }),
});

export type FormType = z.infer<typeof schema>;
