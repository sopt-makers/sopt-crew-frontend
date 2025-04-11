import dayjs from 'dayjs';
import { z } from 'zod';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const capacitySchema = z.number({
  required_error: '모집 인원을 입력해주세요.',
  invalid_type_error: '모집 인원을 입력해주세요.',
});

const isValidDate = (date?: string) => dayjs(date, 'YYYY.MM.DD', true).isValid();

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
  dateRange: z
    .array(z.string())
    .min(1, { message: '모집 기간을 입력해주세요.' })
    .max(2, { message: '시작일과 종료일만 입력해주세요.' })

    .superRefine((dates, ctx) => {
      console.log('superRefine 실행', dates);

      // 날짜 형식 검사
      dates.forEach((date, index) => {
        if (!date) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '모집 기간을 입력해주세요.',
            path: [],
          });
          return;
        }

        if (!isValidDate(date)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '유효한 날짜가 아닙니다',
            path: [],
          });
          return;
        }
      });

      // 시작일과 종료일이 모두 있을 때만 1년 범위 체크
      if (dates[0] && dates[1]) {
        const startDate = dayjs(dates[0], 'YYYY.MM.DD');
        const endDate = dayjs(dates[1], 'YYYY.MM.DD');
        const diffInYears = endDate.diff(startDate, 'year');

        if (diffInYears > 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '모집 기간은 1년을 초과할 수 없습니다.',
            path: [1],
          });
        }
      }
    }),
  capacity: capacitySchema.gt(0, { message: '0보다 큰 값을 입력해주세요.' }),
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
    mDateRange: z
      .array(z.string())
      .min(1, { message: '활동 기간을 입력해주세요.' })
      .max(2, { message: '시작일과 종료일만 입력해주세요.' })
      .superRefine((dates, ctx) => {
        console.log('mDateRange superRefine 실행', dates);

        dates.forEach((date, index) => {
          if (!date) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '활동 기간을 입력해주세요.',
              path: [index],
            });
            return;
          }

          if (!isValidDate(date)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '유효한 날짜가 아닙니다.',
              path: [index],
            });
            return;
          }
        });

        // 👉 1년 범위 초과 여부 체크
        if (dates[0] && dates[1]) {
          const startDate = dayjs(dates[0], 'YYYY.MM.DD');
          const endDate = dayjs(dates[1], 'YYYY.MM.DD');

          if (endDate.isBefore(startDate)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '종료일은 시작일보다 이후여야 합니다.',
              path: [1],
            });
          }

          const diffInYears = endDate.diff(startDate, 'year', true); // 소수점 단위로 비교 가능
          if (diffInYears > 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '활동 기간은 1년을 초과할 수 없습니다.',
              path: [1],
            });
          }
        }
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
      dateRange: z.array(z.string().max(10, { message: 'YYYY.MM.DD 형식으로 입력해주세요.' })),
    })
    .superRefine(({ time, dateRange }, ctx) => {
      if (time.label === '당일') {
        if (dateRange[0] === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '번쩍 진행일을 입력해주세요.',
            path: ['dateRange', 0],
          });
        } else if (!isValidDate(dateRange[0])) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '유효한 날짜가 아닙니다.',
            path: ['dateRange', 0],
          });
        }
      } else if (time.label === '예정 기간 (협의 후 결정)') {
        if (dateRange.length !== 2 || dateRange.some(date => date === '')) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '번쩍 시작일과 종료일을 입력해주세요.',
            path: ['dateRange'],
          });
        }
        dateRange.forEach((date, index) => {
          if (!isValidDate(date)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '유효한 날짜가 아닙니다.',
              path: ['dateRange', index],
            });
          }
        });
      }
    }),
  placeInfo: z
    .object({
      place: z.object({
        label: z.string(),
        value: z.string(),
      }),
      placeDetail: z.string().nullable().optional(),
    })
    .refine(data => {
      if (data.place.label === '오프라인' || data.place.label === '온라인') {
        return data.placeDetail && data.placeDetail.length > 0;
      } else if (data.place.label === '협의 후 결정') {
        return true;
      }
      return false;
    }),
  capacityInfo: z
    .object({
      minCapacity: capacitySchema
        .gt(0, { message: '0보다 큰 값을 입력해주세요.' })
        .lte(999, { message: '모집 인원을 다시 입력해주세요.' }),
      maxCapacity: capacitySchema
        .gt(0, { message: '0보다 큰 값을 입력해주세요.' })
        .lte(999, { message: '모집 인원을 다시 입력해주세요.' }),
    })
    .superRefine(({ minCapacity, maxCapacity }, ctx) => {
      if (minCapacity > maxCapacity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '최소 인원수가 최대 인원수보다 큽니다.',
          path: ['maxCapacity'],
        });
      }
    }),
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
