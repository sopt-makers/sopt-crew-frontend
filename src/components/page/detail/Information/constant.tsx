import { GetMeetingResponse } from '@api/API_LEGACY/meeting';
import { PART_NAME } from '@constants/option';
import { Chip } from '@sopt-makers/ui';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { styled } from 'stitches.config';
import { parseTextToLink } from '@components/util/parseTextToLink';
dayjs.locale('ko');

export const meetingDetailList = (detailData: GetMeetingResponse) => [
  {
    key: '모임 소개',
    Title: () => <STitle>모임 소개</STitle>,
    Content: () => <SDescription>{parseTextToLink(detailData?.desc)},</SDescription>,
    isValid: detailData?.desc,
  },
  {
    key: '활동 기간',
    Title: () => <STitle>활동 기간</STitle>,
    Content: () => (
      <SDescription>{`${dayjs(detailData?.mStartDate ?? '').format('YYYY.MM.DD (ddd)')} ~ ${dayjs(
        detailData?.mEndDate ?? ''
      ).format('YYYY.MM.DD (ddd)')}`}</SDescription>
    ),
    isValid: detailData?.mStartDate && detailData?.mEndDate,
  },
  {
    key: '진행 방식',
    Title: () => <STitle>진행 방식</STitle>,
    Content: () => <SDescription>{parseTextToLink(detailData?.processDesc)}</SDescription>,
    isValid: detailData?.processDesc,
  },
  {
    key: '모집 대상',
    Title: () => <STitle>모집 대상</STitle>,
    Content: () => (
      <STarget>
        {detailData?.joinableParts
          ?.map(key => PART_NAME[key])
          .map(part => (
            <Chip key={part} style={{ width: '80px', boxShadow: 'none' }} active>
              {part}
            </Chip>
          ))}
        {detailData?.canJoinOnlyActiveGeneration ? '활동 기수' : '전체 기수'}
      </STarget>
    ),
    isValid: detailData?.joinableParts,
  },
  {
    key: '개설자 소개',
    Title: () => <STitle>개설자 소개</STitle>,
    Content: () => <SDescription>{detailData?.leaderDesc}</SDescription>,
    isValid: detailData?.leaderDesc,
  },
  {
    key: '유의사항',
    Title: () => <STitle>유의 사항</STitle>,
    Content: () => <SDescription>{parseTextToLink(detailData?.note)}</SDescription>,
    isValid: detailData?.note,
  },
];

export const LighteningDetailList = (detailData: GetMeetingResponse) => [
  {
    key: '#환영 태그',
    content: detailData?.note,
  },
  {
    key: '설명',
    content: detailData.desc,
  },
];

const STitle = styled('h2', {
  fontAg: '24_bold_100',
  mb: '$24',

  '@tablet': {
    fontStyle: 'H4',
    mb: '$20',
  },
});

const SDescription = styled('p', {
  fontAg: '22_regular_170',
  whiteSpace: 'pre-line',
  color: '$gray200',

  a: {
    textDecoration: 'underline',
    wordBreak: 'break-all',
  },

  '@tablet': {
    fontStyle: 'B3',
  },
});

const STarget = styled(SDescription, {
  display: 'flex',
  alignItems: 'center',
  gap: '$10',
  color: '$gray10',
  flexWrap: 'wrap',

  mb: '$24',

  '@tablet': {
    mb: '$20',
  },
});
