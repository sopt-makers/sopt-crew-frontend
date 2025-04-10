import React, { FC } from 'react';
import { keyframes, styled } from 'stitches.config';
import CalendarIcon from '@assets/svg/calendar.svg';
import Avatar from '@components/@common/avatar/Avatar';
import { Flex } from '@components/util/layout/Flex';
import { GroupBrowsingCardItem } from '@api/API_LEGACY/meeting';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import Link from 'next/link';
import { getResizedImage } from '@utils/image';
import { fontsObject } from '@sopt-makers/fonts';
import { Tag } from '@sopt-makers/ui';
import { IconLocation } from '@sopt-makers/icons';
import { useFlashByIdQuery } from '@api/flash/hook';

const GroupBrowsingCard: FC<GroupBrowsingCardItem> = ({ id, title, user, imageURL }) => {
  const { data: flashData } = useFlashByIdQuery({ meetingId: +id });

  const imgSrc = imageURL[0]?.url && getResizedImage(imageURL[0].url, 285);

  const parseAppliedInfo = () => {
    switch (flashData?.appliedInfo.length) {
      case 0:
        return '지금 첫 번째로 신청해보세요!';
      case 1:
        return `${flashData.appliedInfo[0]?.user.name}님이 신청중이에요`;
      default:
        return `${flashData?.appliedInfo[0]?.user.name}님 외 ${flashData?.appliedInfo.length}명 신청중이에요`;
    }
  };

  return (
    <Link href={`/detail?id=${id}`} style={{ display: 'flex', justifyContent: 'start', width: '305px' }}>
      <SGroupBrowsingCard
        css={{
          background: `linear-gradient(0deg, rgba(23, 24, 28, 0.60) 0%, rgba(23, 24, 28, 0.60) 100%), url(${imgSrc}) lightgray 50% / cover no-repeat`,
          '&:hover': {
            background: `linear-gradient(0deg, rgba(23, 24, 28, 0.80) 0%, rgba(23, 24, 28, 0.80) 100%), url(${imgSrc}) lightgray 50% / cover no-repeat`,
          },
        }}
      >
        <SUser>
          <Avatar src={user.profileImage} alt="" sx={{ width: 18, height: 18 }} />
          <SDesc>{user.name}</SDesc>
        </SUser>
        <STitle>{title}</STitle>
        <SBottom>
          <SDesc css={{ color: '$green400' }}>{parseAppliedInfo()}</SDesc>
          <SDesc>
            {dayjs(flashData?.endDate).diff(dayjs(), 'day') >= 0
              ? `모집 ${dayjs(flashData?.endDate).diff(dayjs(), 'day')}일 남음`
              : '모집마감'}
          </SDesc>
        </SBottom>

        <SOverlayContent>
          <Flex align="center">
            <CalendarIcon style={{ marginRight: '6px' }} />
            <SDesc>
              {dayjs(flashData?.activityStartDate).format('YYYY.MM.DD')} -{' '}
              {dayjs(flashData?.activityEndDate).format('YYYY.MM.DD')}
            </SDesc>
          </Flex>
          <Flex align="center">
            <IconLocation style={{ width: '12px', height: '12px', marginRight: '6px', color: '#9D9DA4' }} />
            <SDesc>{flashData?.flashPlace ?? '협의 후 결정'}</SDesc>
          </Flex>
          <SChipWrapper>
            {flashData?.welcomeMessageTypes.map(welcome => (
              <Tag size="sm" shape="pill" variant="secondary" type="solid">
                {welcome}
              </Tag>
            ))}
          </SChipWrapper>
        </SOverlayContent>
      </SGroupBrowsingCard>
    </Link>
  );
};

export default GroupBrowsingCard;

const STitle = styled('h3', {
  ...fontsObject.HEADING_7_16_B,
  mb: '$2',
  transition: 'transform 0.3s ease-in-out',
});

const SBottom = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  opacity: 1,
  visibility: 'visible',
  transform: 'translateY(0)',
  transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
});

const SUser = styled('div', {
  position: 'absolute',

  display: 'flex',
  alignItems: 'center',
  gap: '$6',

  left: '16px',
  top: '16px',

  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
});

const SOverlayContent = styled('div', {
  position: 'absolute',
  top: '156px',
  left: '$16',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
});

const SChipWrapper = styled('div', {
  display: 'flex',
  gap: '$4',

  mt: '$2',
});

const moveUpFadeOut = keyframes({
  '0%': {
    transform: 'translateY(0)',
    opacity: 1,
  },
  '100%': {
    transform: 'translateY(-50px)',
    opacity: 0,
    visibility: 'hidden',
  },
});

const moveUpFadeIn = keyframes({
  '0%': {
    transform: 'translateY(0)',
    opacity: 0,
    visibility: 'hidden',
  },
  '100%': {
    transform: 'translateY(-50px)',
    opacity: 1,
    visibility: 'visible',
  },
});

const moveDownFadeIn = keyframes({
  '0%': {
    transform: 'translateY(-50px)',
    opacity: 0,
    visibility: 'hidden',
  },
  '100%': {
    transform: 'translateY(0)',
    opacity: 1,
    visibility: 'visible',
  },
});

const moveDownFadeOut = keyframes({
  '0%': {
    transform: 'translateY(-50px)',
    opacity: 1,
    visibility: 'hidden',
  },
  '100%': {
    transform: 'translateY(0)',
    opacity: 0,
    visibility: 'visible',
  },
});

const SGroupBrowsingCard = styled('section', {
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',

  width: '285px',
  height: '180px',
  padding: '$16',

  backgroundSize: 'cover',

  borderRadius: '12px',
  cursor: 'pointer',

  [`&:hover ${STitle}`]: {
    transform: 'translateY(-45px)',
    transition: 'transform 0.3s ease-in-out',
  },

  [`&:hover ${SBottom}`]: {
    animation: `${moveUpFadeOut} 0.3s ease-in-out forwards`,
  },
  [`&:not(:hover) ${SBottom}`]: {
    animation: `${moveDownFadeIn} 0.3s ease-in-out forwards`,
  },

  [`&:hover ${SUser}`]: {
    opacity: 1,
    visibility: 'visible',
    transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
  },

  [`&:hover ${SOverlayContent}`]: {
    animation: `${moveUpFadeIn} 0.3s ease-in-out forwards`,
  },
  [`&:not(:hover) ${SOverlayContent}`]: {
    animation: `${moveDownFadeOut} 0.3s ease-in-out forwards`,
  },
});

const SDesc = styled('p', {
  ...fontsObject.LABEL_5_11_SB,
  color: '$white',
});
