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
  files: z
    .array(z.string(), { required_error: '이미지를 추가해주세요.' })
    .min(1, { message: '이미지를 추가해주세요.' }),
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
      .max(1000, { message: '1000자 까지 입력 가능합니다.' }),
    processDesc: z
      .string()
      .min(1, {
        message: '진행 방식 소개를 입력해주세요.',
      })
      .max(1000, { message: '1000자 까지 입력 가능합니다.' }),
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
    leaderDesc: z.string().optional().nullable(),
    isMentorNeeded: z.boolean().optional().nullable(),
    canJoinOnlyActiveGeneration: z.boolean().optional().nullable(),
    joinableParts: z
      .array(
        z.object({
          label: z.string(),
          value: z.string().nullable(),
        })
      )
      .min(1, { message: '대상 파트를 선택해주세요.' }),
    note: z.string().max(1000, { message: '1000자 까지 입력 가능합니다.' }).optional().nullable(),
    coLeader: z.array(z.any()).optional(),
  }),
});

export type FormType = z.infer<typeof schema>;

export const MAX_FILE_SIZE = 20 * 1024 ** 2; // 5MB

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

export const flashSchema = z.object({
  title: z
    .string()
    .max(30, { message: '30자 까지 입력할 수 있습니다.' })
    .min(1, { message: '모임 제목을 입력해주세요.' }),
  desc: z
    .string()
    .min(1, {
      message: '번쩍 설명을 입력해주세요.',
    })
    .max(500, { message: '500자 까지 입력 가능합니다.' }),
  timeInfo: z
    .object({
      time: z.object({
        label: z.string(),
        value: z.string(),
      }),
      startDate: z
        .string()
        .min(10, { message: '번쩍 기간을 입력해주세요.' })
        .max(10, { message: 'YYYY.MM.DD 형식으로 입력해주세요.' })
        .optional()
        .refine(datetime => dayjs(datetime, 'YYYY.MM.DD').isValid(), {
          message: 'YYYY.MM.DD 형식으로 입력해주세요.',
        }),
      endDate: z
        .string()
        .optional()
        .refine(datetime => (datetime ? dayjs(datetime, 'YYYY.MM.DD').isValid() : true), {
          message: 'YYYY.MM.DD 형식으로 입력해주세요.',
        }),
    })
    .refine(
      data =>
        data.time.label === '당일' ||
        (data.time.label === '예정 기간 (협의 후 결정)' && data.endDate && data.endDate.length === 10)
    ),
  placeInfo: z
    .object({
      place: z.object({
        label: z.string(),
        value: z.string(),
      }),
      placeDetail: z.string().optional(),
    })
    .refine(data => {
      if (data.place.label === '오프라인' || data.place.label === '온라인') {
        return data.placeDetail && data.placeDetail.length > 0;
      } else if (data.place.label === '협의 후 결정') {
        return true;
      }
      return false;
    }),
  minCapacity: z
    .number({
      required_error: '모집 인원을 입력해주세요.',
      invalid_type_error: '모집 인원을 입력해주세요.',
    })
    .gt(0, { message: '0보다 큰 값을 입력해주세요.' })
    .lte(999, { message: '모집 인원을 다시 입력해주세요.' }),
  maxCapacity: z
    .number({
      required_error: '모집 인원을 입력해주세요.',
      invalid_type_error: '모집 인원을 입력해주세요.',
    })
    .gt(0, { message: '0보다 큰 값을 입력해주세요.' })
    .lte(999, { message: '모집 인원을 다시 입력해주세요.' }),
  files: z.array(z.string()),
  welcomeTags: z
    .array(
      z
        .object({
          label: z.string(),
          value: z.string(),
        })
        .optional()
        .nullable()
    )
    .optional()
    .nullable(),
});

export type FlashFormType = z.infer<typeof flashSchema>;
