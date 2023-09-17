import { z } from 'zod';

export const schema = z.object({
  title: z
    .string()
    .max(100, { message: '최대 100자까지만 입력할 수 있어요' })
    .min(1, { message: '피드 제목을 입력해주세요.' }),

  contents: z.string().min(1, { message: '피드 내용을 입력해주세요.' }),
  images: z.array(z.string()),
});

export type FormType = z.infer<typeof schema>;

export const MAX_FILE_SIZE = 5 * 1024 ** 2; // 5MB

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
