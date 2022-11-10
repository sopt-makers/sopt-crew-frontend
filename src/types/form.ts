import { z } from 'zod';

export const schema = z.object({
  title: z.string().max(30).min(1),
  category: z.object({
    label: z.string(),
    value: z.string(),
  }),
  files: z
    .any()
    .refine((files: FileList) => files?.length > 0, '이미지를 추가해주세요.')
    .refine(
      (files: FileList) => files?.[0]?.size <= MAX_FILE_SIZE,
      `5MB 이하의 사진만 업로드할 수 있습니다.`
    )
    .refine(
      (files: FileList) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png, .webp, .gif 파일만 업로드할 수 있습니다.'
    ),
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

const MAX_FILE_SIZE = 500 * 1000; // 5MB

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];
