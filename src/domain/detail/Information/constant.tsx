import { GetFlash } from '@api/flash/type';
import { GetMeeting } from '@api/meeting/type';
import CalendarIcon from '@assets/svg/calendar.svg?rect';
import { PART_NAME } from '@constant/option';
import { parseTextToLink } from '@shared/util/parseTextToLink';
import { IconLocation } from '@sopt-makers/icons';
import { Chip } from '@sopt-makers/ui';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { styled } from 'stitches.config';
dayjs.locale('ko');

export const MeetingDetailList = (detailData: GetMeeting['response']) => [
  {
    key: '모임 소개',
    Title: () => <STitle>모임 소개</STitle>,
    Content: () => {
      return (
        <>
          <STarget>
            {detailData?.meetingKeywordTypes.map(tag => (
              <Chip key={tag} style={{ boxShadow: 'none' }} active>
                {tag}
              </Chip>
            ))}
            {detailData?.welcomeMessageTypes.map(tag => (
              <Chip key={tag} style={{ boxShadow: 'none' }}>
                {tag}
              </Chip>
            ))}
          </STarget>
          <SDescription>{parseTextToLink(detailData?.desc)}</SDescription>
        </>
      );
    },
    isValid: detailData?.meetingKeywordTypes.length || detailData?.welcomeMessageTypes.length || detailData?.desc,
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
    Content: () => <SDescription>{parseTextToLink(detailData?.processDesc ?? '')}</SDescription>,
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
    Content: () => <SDescription>{parseTextToLink(detailData?.note ?? '')}</SDescription>,
    isValid: detailData?.note,
  },
];

export const FlashDetailList = (detailData: GetFlash['response']) => {
  return [
    {
      key: '모임 소개',
      Title: () => <STitle>모임 소개</STitle>,
      Content: () => {
        return (
          <>
            <STarget>
              {detailData?.meetingKeywordTypes.map(tag => (
                <Chip key={tag} style={{ boxShadow: 'none' }} active>
                  {tag}
                </Chip>
              ))}
              {detailData?.welcomeMessageTypes.map(tag => (
                <Chip key={tag} disabled style={{ boxShadow: 'none' }}>
                  {tag}
                </Chip>
              ))}
            </STarget>
            <SDescription>{parseTextToLink(detailData?.desc)}</SDescription>
          </>
        );
      },
      isValid: detailData?.meetingKeywordTypes.length || detailData?.welcomeMessageTypes.length || detailData?.desc,
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
      isValid: true,
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

  '@media (max-width: 768px)': {
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

  '@media (max-width: 768px)': {
    mb: '$20',
  },
});

const SIconLocation = styled(IconLocation, {
  width: '24px',
  height: '24px',

  mb: '$24',

  '@media (max-width: 768px)': {
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

  '@media (max-width: 768px)': {
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

  '@media (max-width: 768px)': {
    mb: '$20',
  },
});
