import { GetMeetingResponse } from '@api/API_LEGACY/meeting';
import { PART_NAME } from '@constants/option';
import { Chip } from '@sopt-makers/ui';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { styled } from 'stitches.config';
import { parseTextToLink } from '@components/util/parseTextToLink';
dayjs.locale('ko');
import CalendarIcon from '@assets/svg/calendar.svg?rect';
import { GetFlashByIdResponse } from '@api/flash';
import { IconLocation } from '@sopt-makers/icons';

export const MeetingDetailList = (detailData: GetMeetingResponse) => [
  {
    key: '모임 소개',
    Title: () => <STitle>모임 소개</STitle>,
    Content: () => <SDescription>{parseTextToLink(detailData?.desc)}</SDescription>,
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

export const FlashDetailList = (detailData: GetFlashByIdResponse) => {
  return [
    {
      key: detailData.welcomeMessageTypes.length ? '환영 태그' : '',
      Title: () => (detailData?.welcomeMessageTypes.length ? <STitle>#환영 태그</STitle> : null),
      Content: () => {
        return detailData?.welcomeMessageTypes.length ? (
          <STarget>
            {detailData?.welcomeMessageTypes.map(tag => (
              <Chip key={tag} style={{ boxShadow: 'none' }} active>
                {tag}
              </Chip>
            ))}
          </STarget>
        ) : null;
      },
      isValid: detailData?.welcomeMessageTypes,
    },
    {
      key: '설명',
      Title: () => <STitle>설명</STitle>,
      Content: () => {
        return <SDescription>{parseTextToLink(detailData?.desc)}</SDescription>;
      },
      isValid: detailData?.desc,
    },
    {
      key: '진행일',
      Title: () => (
        <SIconTitleWrapper>
          <SIconCalendar />
          <STitle>진행일</STitle>
        </SIconTitleWrapper>
      ),
      Content: () => {
        const isSingleDay = detailData.flashTimingType === '당일';
        const isPeriodNotDecided = detailData.flashTimingType.includes('협의 후 결정');
        return (
          <SDescription style={{ color: 'white' }}>
            {`${dayjs(detailData.activityStartDate).format('YYYY. MM. DD (dd)')}${
              isSingleDay ? '' : ` ~ ${dayjs(detailData.activityEndDate).format('YYYY. MM. DD (dd)')}`
            }`}
            {isPeriodNotDecided && (
              <>
                <Divider />
                기간 중 협의 후 결정
              </>
            )}
          </SDescription>
        );
      },
      isValid: detailData.activityStartDate && detailData.activityEndDate,
    },
    {
      key: '장소',
      Title: () => (
        <SIconTitleWrapper>
          <SIconLocation />
          <STitle>장소</STitle>
        </SIconTitleWrapper>
      ),
      Content: () => (
        <SDescription style={{ color: 'white' }}>{`${parsePlaceType(
          detailData.flashPlaceType,
          detailData.flashPlace
        )}`}</SDescription>
      ),
      isValid: detailData.flashPlace,
    },
  ];
};

const parsePlaceType = (placeType: string, place: string) => {
  switch (placeType) {
    case '오프라인':
      return place;
    case '온라인':
      return `온라인 , ${place}`;
    case '협의 후 결정':
      return placeType;
  }
};

const STitle = styled('h2', {
  fontAg: '24_bold_100',
  mb: '$24',

  '@tablet': {
    fontStyle: 'H4',
    mb: '$20',
  },
});

const SIconCalendar = styled(CalendarIcon, {
  width: '24px',
  height: '24px',

  mb: '$24',

  '& path': {
    stroke: '$white',
  },

  '@tablet': {
    mb: '$20',
  },
});

const SIconLocation = styled(IconLocation, {
  width: '24px',
  height: '24px',

  mb: '$24',

  '@tablet': {
    mb: '$20',
  },
});

const SIconTitleWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$12',
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

const Divider = styled('hr', {
  display: 'inline-block',

  width: '$2',
  height: '$16',
  margin: '0 $16',

  backgroundColor: '$gray300',
  color: '$gray300',
  border: 'none',
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
