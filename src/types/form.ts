import { z } from 'zod';

export const schema = z.object({
  title: z.string().max(30).min(1),
  category: z.object({
    label: z.string(),
    value: z.string(),
  }),
  // TODO: add iamge
  // image: z.string(),
  applicationStartAt: z.string().min(1),
  applicationEndAt: z.string().min(1),
  memberCount: z.number().gt(0),
  detail: z.object({
    intro: z.string().min(1),
    flow: z.string().min(1),
    startAt: z.string().min(1),
    endAt: z.string().min(1),
    creator: z.string().min(1),
    targetMember: z.string().min(1),
    notice: z.string().optional().nullable(),
  }),
});

export type FormType = z.infer<typeof schema>;
