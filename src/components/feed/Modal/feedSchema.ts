import { z } from 'zod';

export const ERROR_MESSAGE = {
  TITLE: {
    MIN: '피드 제목을 입력해주세요.',
    MAX: '최대 100자까지만 입력할 수 있어요',
  },
  CONTENTS: {
    MIN: '피드 내용을 입력해주세요.',
  },
};

export const feedSchema = z.object({
  title: z.string().max(100, { message: ERROR_MESSAGE.TITLE.MAX }).min(1, { message: ERROR_MESSAGE.TITLE.MIN }),

  contents: z.string().min(1, { message: ERROR_MESSAGE.CONTENTS.MIN }),
  images: z.array(z.string()),
});

export type FormType = z.infer<typeof feedSchema>;
