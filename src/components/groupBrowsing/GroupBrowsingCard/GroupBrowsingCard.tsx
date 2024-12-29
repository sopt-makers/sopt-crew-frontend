import React, { FC } from 'react';
import { keyframes, styled } from 'stitches.config';
import CalendarIcon from '@assets/svg/calendar.svg';
import LocationIcon from '@assets/svg/location.svg';
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

const GroupBrowsingCard: FC<GroupBrowsingCardItem> = ({ id, title, mStartDate, mEndDate, user, imageURL }) => {
  const imgSrc = imageURL[0].url && getResizedImage(imageURL[0].url, 285);
  return (
    <Link href={`/detail?id=${id}`} style={{ display: 'flex', justifyContent: 'start', width: '305px' }}>
      <SGroupBrowsingCard
        css={{
          background: `linear-gradient(0deg, rgba(23, 24, 28, 0.30) 0%, rgba(23, 24, 28, 0.30) 100%), url(${imgSrc}) lightgray 50% / cover no-repeat`,
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
          <SDesc css={{ color: '$green400' }}>김솝트님 외 8명 신청중이에요</SDesc>
          <SDesc>모집 2일 남음</SDesc>
        </SBottom>

        <SOverlayContent>
          <Flex align="center">
            <CalendarIcon style={{ marginRight: '6px' }} />
            <SDesc>
              {dayjs(mStartDate).format('YYYY.MM.DD')} - {dayjs(mEndDate).format('YYYY.MM.DD')}
            </SDesc>
          </Flex>
          <Flex align="center">
            <LocationIcon style={{ marginRight: '6px' }} />
            <SDesc>건대입구역</SDesc>
          </Flex>
          <SChipWrapper>
            <Tag size="sm" shape="pill" variant="secondary" type="solid">
              YB 환영
            </Tag>
            <Tag size="sm" shape="pill" variant="secondary" type="solid">
              입문자 환영
            </Tag>
            <Tag size="sm" shape="pill" variant="secondary" type="solid">
              초면 환영
            </Tag>
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
