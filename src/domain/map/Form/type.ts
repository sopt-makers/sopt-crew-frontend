import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .max(30, { message: '30자 까지 입력할 수 있습니다.' })
    .min(1, { message: '장소 이름을 입력해주세요.' }),
  subwayStations: z
    .array(
      z.object({
        name: z.string().optional(),
        subwayLines: z.array(z.string()).optional(),
      })
    )
    .max(3, { message: '최대 3개까지 선택할 수 있어요' })
    .min(1, { message: '주변 지하철역을 선택해주세요' }),
  description: z
    .string()
    .min(1, {
      message: '한줄 소개를 입력해주세요.',
    })
    .max(80, { message: '80자 까지 입력 가능합니다.' }),
  category: z.object({
    label: z.string(),
    value: z.string({
      required_error: '장소 태그를 선택해주세요.',
      invalid_type_error: '장소 태그를 선택해주세요.',
    }),
  }),
  links: z
    .object({
      naverMapLink: z.string().url({ message: '올바른 URL 형식이 아닙니다.' }).optional().or(z.literal('')),
      kakaoMapLink: z.string().url({ message: '올바른 URL 형식이 아닙니다.' }).optional().or(z.literal('')),
    })
    .refine(data => data.naverMapLink || data.kakaoMapLink, {
      message: '네이버 지도 링크 또는 카카오맵 링크 중 최소한 하나를 입력해주세요.',
    }),
});

export type FormType = z.infer<typeof formSchema>;
