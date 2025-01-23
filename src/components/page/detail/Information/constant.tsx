import { GetMeetingResponse } from '@api/API_LEGACY/meeting';
import { PART_NAME } from '@constants/option';
import { Chip } from '@sopt-makers/ui';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { styled } from 'stitches.config';
import { parseTextToLink } from '@components/util/parseTextToLink';
dayjs.locale('ko');
import CalendarIcon from '@assets/svg/calendar.svg';
import LocationIcon from '@assets/svg/location.svg';

export const meetingDetailList = (detailData: GetMeetingResponse) => [
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

export const LightningDetailList = (detailData: GetMeetingResponse) => [
  {
    key: '#환영 태그',
    Title: () => <STitle>#환영 태그</STitle>,
    Content: () => (
      <STarget>
        {detailData?.welcomeMessageTypes.map(tag => (
          <Chip key={tag} style={{ width: '80px', boxShadow: 'none' }} active>
            {tag}
          </Chip>
        ))}
      </STarget>
    ),
    isValid: detailData?.joinableParts,
  },
  {
    key: '설명',
    Title: () => <STitle>설명</STitle>,
    Content: () => <SDescription>{parseTextToLink(detailData?.desc)}</SDescription>,
    isValid: detailData?.desc,
  },
  {
    key: '진행일',
    Title: () => (
      <SIconTitleWrapper>
        <CalendarIcon />
        <STitle>진행일</STitle>
      </SIconTitleWrapper>
    ),
    isValid: detailData.activityStartDate,
  },
  {
    key: '장소',
    Title: () => (
      <SIconTitleWrapper>
        <LocationIcon />
        <STitle>장소</STitle>
      </SIconTitleWrapper>
    ),
    Content: () => <SDescription>{`${parsePlaceType(detailData.placeType, detailData.place)}`}</SDescription>,
    isValid: detailData.place,
  },
];

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
