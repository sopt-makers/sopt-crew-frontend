import React, { FC } from 'react';
import { styled } from 'stitches.config';
import UserIcon from '@assets/svg/user.svg';
import CalendarIcon from '@assets/svg/calendar.svg';
import Avatar from '@components/avatar/Avatar';
import { Flex } from '@components/util/layout/Flex';
import {
  GroupBrowsingCardItem,
  parsePartValueToLabel,
  returnIsGroupActive,
  returnNewStatus,
} from '@api/API_LEGACY/meeting';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { PART_NAME, ACTION_STATUS, EActionStatus, CATEGORY_NAME } from '@constants/option';
import Link from 'next/link';
import { getResizedImage } from '@utils/image';
import Separator from '@assets/svg/GroupBrowsingCardSeparator.svg';
import { fontsObject } from '@sopt-makers/fonts';

const GroupBrowsingCard: FC<GroupBrowsingCardItem> = ({
  id,
  title,
  category,
  startDate,
  mStartDate,
  mEndDate,
  recentActivityDate,
  targetActiveGeneration,
  joinableParts,
  capacity,
  appliedCount,
  approvedCount,
  user,
  status,
  imageURL,
}) => {
  const isAllParts = joinableParts?.length === Object.keys(PART_NAME).length || joinableParts === null;
  const isGroupActive = returnIsGroupActive(mStartDate, mEndDate);

  const newStatus = returnNewStatus(status, mStartDate, isGroupActive);

  type statusTextsType = {
    [key: number]: string;
  };

  const statusTexts: statusTextsType = {
    [EActionStatus.BEFORE]: `${-dayjs().diff(startDate, 'day')}일 남음`,
    [EActionStatus.RECRUITING]: `${appliedCount}명 신청 중`,
    [EActionStatus.ACTING]:
      dayjs().diff(recentActivityDate, 'day') === 0
        ? '오늘 새 글'
        : recentActivityDate === null
        ? ''
        : `${dayjs().diff(recentActivityDate, 'day')}일 전 활동`,
  };

  return (
    <Link href={`/detail?id=${id}`} style={{ display: 'flex', justifyContent: 'start', width: '305px' }}>
      <SGroupBrowsingCard
        css={{
          backgroundImage: `url(${imageURL[0].url && getResizedImage(imageURL[0].url, 285)})`,
        }}
      >
        <SInfo>
          <STop>
            <Avatar src={user.profileImage} alt="" sx={{ width: 18, height: 18 }} /> <span>{user.name}</span>
            <STopDivisor>|</STopDivisor> <span>{CATEGORY_NAME(category)}</span>
          </STop>
          <STitle>{title}</STitle>
          <SContents>
            <SContent>
              <CalendarIcon />
              {dayjs(mStartDate).format('YYYY.MM.DD')} - {dayjs(mEndDate).format('YYYY.MM.DD')}
            </SContent>
            <SContent>
              <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                <UserIcon style={{ marginRight: '6px' }} />
                {approvedCount}/{capacity}명
              </div>
              <Separator style={{ margin: '0 3' }} />
              <div>
                {targetActiveGeneration ? '활동 기수' : '전체 기수'} /{' '}
                {isAllParts
                  ? '전체'
                  : joinableParts
                      .map(part => parsePartValueToLabel(part))
                      .filter(item => item !== null)
                      .join(',')}{' '}
                파트
              </div>
            </SContent>
          </SContents>
        </SInfo>
        <SBottom status={newStatus}>
          <Flex align="center">
            <SRecruitStatusIcon status={newStatus} />
            {ACTION_STATUS[newStatus]}
          </Flex>
          <SStatusText status={newStatus}>{statusTexts[newStatus]}</SStatusText>
        </SBottom>
      </SGroupBrowsingCard>
    </Link>
  );
};

export default GroupBrowsingCard;

const SGroupBrowsingCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundBlendMode: 'multiply',
  backgroundColor: '#17181C',
  backgroundSize: 'cover',
  borderRadius: '12px',
  color: '$gray10',
  width: '285px',
  height: '180px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$gray200',
    transition: 'background 0.3s ease-in-out',
  },
  '&:not(:hover)': {
    transition: 'background 0.3s ease-in-out',
  },
});

const STop = styled('div', {
  display: 'flex',
  alignItems: 'center',
  mb: '$4',
  ...fontsObject.LABEL_5_11_SB,
  '& > div:first-child': {
    mr: '$6',
  },
});

const STopDivisor = styled('span', {
  color: '$gray400',
  ml: '$3',
  mr: '$3',
});

const STitle = styled('div', {
  ...fontsObject.HEADING_7_16_B,
  mb: '$12',
});

const SContents = styled('div', {
  ...fontsObject.LABEL_5_11_SB,
});

const SContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  '& > svg:first-child': {
    marginRight: '6px',
  },
  mb: '$6',
});

const SInfo = styled('div', {
  padding: '$16 $16 $0 $16',
});

const SBottom = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  ...fontsObject.LABEL_4_12_SB,
  width: '100%',
  padding: '$0 $16 $12 $16',
  borderBottomLeftRadius: '$12',
  borderBottomRightRadius: '$12',
  variants: {
    status: {
      0: {
        background: 'linear-gradient(180deg, rgba(23, 24, 28, 0.00) 0%, rgba(255, 194, 52, 0.20) 100%);',
      },
      1: {
        background: 'linear-gradient(180deg, rgba(23, 24, 28, 0.00) 0%, rgba(247, 114, 52, 0.20) 100%)',
      },
      2: {
        background: 'linear-gradient(180deg, rgba(23, 24, 28, 0.00) 0%, rgba(157, 157, 164, 0.20) 100%)',
      },
      3: {
        background: 'linear-gradient(180deg, rgba(23, 24, 28, 0.00) 0%, rgba(52, 111, 250, 0.20) 100%)',
      },
      4: {
        background: 'linear-gradient(180deg, rgba(23, 24, 28, 0.00) 0%, rgba(157, 157, 164, 0.20) 100%)',
      },
    },
  },
});

const SRecruitStatusIcon = styled('div', {
  width: '$9',
  height: '$9',
  mr: '$6',
  borderRadius: '$round',
  variants: {
    status: {
      0: {
        background: '$attention',
      },
      1: {
        background: '$secondary',
      },
      2: {
        background: '$gray200',
      },
      3: {
        background: '$success',
      },
      4: {
        background: '$gray200',
      },
    },
  },
});

const SStatusText = styled('div', {
  variants: {
    status: {
      0: {
        color: '$attention',
      },
      1: {
        color: '$secondary',
      },
      2: {
        color: '$gray200',
      },
      3: {
        color: '$success',
      },
      4: {
        color: '$gray200',
      },
    },
  },
});
