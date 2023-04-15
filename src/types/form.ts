import dayjs from 'dayjs';
import { z } from 'zod';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const schema = z.object({
  title: z
    .string()
    .max(30, { message: '30자 까지 입력할 수 있습니다.' })
    .min(1, { message: '모임 제목을 입력해주세요.' }),
  category: z.object({
    label: z.string(),
    value: z.string({
      required_error: '카테고리를 선택해주세요.',
      invalid_type_error: '카테고리를 선택해주세요.',
    }),
  }),
  files: z.array(z.string(), { required_error: '이미지를 추가해주세요.' }),
  startDate: z
    .string()
    .min(10, { message: '모집 기간을 입력해주세요.' })
    .max(10, { message: 'YYYY.MM.DD 형식으로 입력해주세요.' })
    .refine(datetime => dayjs(datetime, 'YYYY.MM.DD').isValid(), {
      message: 'YYYY.MM.DD 형식으로 입력해주세요.',
    }),
  endDate: z
    .string()
    .min(10, { message: '모집 기간을 입력해주세요.' })
    .max(10, { message: 'YYYY.MM.DD 형식으로 입력해주세요.' })
    .refine(datetime => dayjs(datetime, 'YYYY.MM.DD').isValid(), {
      message: 'YYYY.MM.DD 형식으로 입력해주세요.',
    }),
  capacity: z
    .number({
      required_error: '모집 인원을 입력해주세요.',
      invalid_type_error: '모집 인원을 입력해주세요.',
    })
    .gt(0, { message: '0보다 큰 값을 입력해주세요.' }),
  detail: z.object({
    desc: z
      .string()
      .min(1, {
        message: '모임 소개를 입력해주세요.',
      })
      .max(300, { message: '300자 까지 입력 가능합니다.' }),
    processDesc: z
      .string()
      .min(1, {
        message: '진행 방식 소개를 입력해주세요.',
      })
      .max(300, { message: '300자 까지 입력 가능합니다.' }),
    mStartDate: z
      .string()
      .min(10, { message: '활동 기간을 입력해주세요.' })
      .max(10, { message: 'YYYY.MM.DD 형식으로 입력해주세요.' })
      .refine(datetime => dayjs(datetime, 'YYYY.MM.DD').isValid(), {
        message: 'YYYY.MM.DD 형식으로 입력해주세요.',
      }),
    mEndDate: z
      .string()
      .min(10, { message: '활동 기간을 입력해주세요.' })
      .max(10, { message: 'YYYY.MM.DD 형식으로 입력해주세요.' })
      .refine(datetime => dayjs(datetime, 'YYYY.MM.DD').isValid(), {
        message: 'YYYY.MM.DD 형식으로 입력해주세요.',
      }),
    leaderDesc: z
      .string()
      .min(1, {
        message: '개설자 소개를 입력해주세요.',
      })
      .max(300, { message: '300자 까지 입력 가능합니다.' }),
    isMentorNeeded: z.boolean().optional().nullable(),
    canJoinOnlyActiveGeneration: z.boolean().optional().nullable(),
    joinableParts: z
      .array(
        z.object({
          label: z.string(),
          value: z.string().nullable(),
        })
      )
      .min(2, { message: '대상 파트를 선택해주세요.' }), // NOTE: default 옵션에 더해 최소 1개는 선택해야 한다(총 2개)
    targetDesc: z
      .string()
      .min(1, {
        message: '상세 내용을 작성해주세요.',
      })
      .max(300, { message: '300자 까지 입력 가능합니다.' }),
    note: z.string().max(300, { message: '300자 까지 입력 가능합니다.' }).optional().nullable(),
  }),
});

export type FormType = z.infer<typeof schema>;

export const MAX_FILE_SIZE = 5 * 1024 ** 2; // 5MB

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
