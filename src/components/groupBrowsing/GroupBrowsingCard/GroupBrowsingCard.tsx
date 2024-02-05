import React, { FC } from 'react';
import { styled } from 'stitches.config';
import UserIcon from '@assets/svg/user.svg';
import CalendarIcon from '@assets/svg/calendar.svg';
import Avatar from '@components/avatar/Avatar';
import { Flex } from '@components/util/layout/Flex';
import { fonts } from '@sopt-makers/fonts';
import { GroupBrowsingCardDetail, parsePartValueToLabel } from '@api/meeting';
import dayjs from 'dayjs';
import { ACTION_STATUS, EActionStatus } from '@constants/option';
import Link from 'next/link';

const GroupBrowsingCard: FC<GroupBrowsingCardDetail> = ({
  id,
  userId,
  title,
  category,
  imageURL,
  startDate,
  endDate,
  capacity,
  mStartDate,
  mEndDate,
  recentActivityDate,
  targetActiveGeneration,
  joinableParts,
  applicantCount,
  approvedUserCount,
  user,
  status,
}) => {
  const isAllParts = joinableParts?.length === 6 || joinableParts === null;
  const isGroupActive = new Date(mStartDate) <= new Date() && new Date() <= new Date(mEndDate);

  const returnNewStatus = () => {
    if (status == 0) {
      return 0;
    } else if (status == 1) {
      return 1;
    } else {
      if (new Date(mStartDate) > new Date()) {
        return 2;
      } else if (isGroupActive) {
        return 3;
      } else {
        return 4;
      }
    }
  };

  const newStatus = returnNewStatus();

  const returnStatusText = () => {
    switch (newStatus) {
      case EActionStatus.BEFORE:
        return <SStatusText status={newStatus}>{dayjs().diff(startDate, 'day')}일 남음</SStatusText>;
      case EActionStatus.RECRUITING:
        return <SStatusText status={newStatus}>{applicantCount}명 신청 중</SStatusText>;
      case EActionStatus.ACTING:
        return (
          <SStatusText status={newStatus}>
            {recentActivityDate ? `${dayjs().diff(recentActivityDate, 'day')}일 전 활동` : '오늘 새 글'}
          </SStatusText>
        );
    }
  };

  return (
    <Link href={`/group/detail?id=${id}`}>
      <a>
        <SGroupBrowsingCard>
          <SInfo>
            <STop>
              <Avatar src={user.profileImage} alt="" sx={{ width: 18, height: 18 }} /> {user.name}
              <STopDivisor>|</STopDivisor> {category}
            </STop>
            <STitle>{title}</STitle>
            <SContents>
              <SContent>
                <CalendarIcon />
                {dayjs(mStartDate).format('YYYY.MM.DD')} - {dayjs(mEndDate).format('YYYY.MM.DD')}
              </SContent>
              <SContent>
                <UserIcon />
                {applicantCount}/{approvedUserCount}명 {targetActiveGeneration}기 /
                {isAllParts
                  ? '전체'
                  : joinableParts
                      .map(part => parsePartValueToLabel(part))
                      .filter(item => item !== null)
                      .join(',')}{' '}
                파트
              </SContent>
            </SContents>
          </SInfo>
          <SBottom status={newStatus}>
            <Flex align="center">
              <SRecruitStatusIcon status={newStatus}></SRecruitStatusIcon>
              {ACTION_STATUS[newStatus]}
            </Flex>
            {returnStatusText()}
          </SBottom>
        </SGroupBrowsingCard>
      </a>
    </Link>
  );
};

export default GroupBrowsingCard;

const SGroupBrowsingCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background:
    'url(https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/05/13/e907b6b8-015b-4685-854d-47f633c90c53.jpeg) no-repeat center',
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
  fontSize: '11px',
  fontWeight: '600',
  lineHeight: '14px',
  '& > div:first-child': {
    marginRight: '6px',
  },
});

const STopDivisor = styled('span', {
  color: '$gray400',
  ml: '$3',
  mr: '$3',
});

const STitle = styled('div', {
  fontStyle: 'H4',
  mb: '$12',
});

const SContents = styled('div', {
  fontSize: '11px',
  fontWeight: '600',
  lineHeight: '14px',
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
  fontSize: '12px',
  fontWeight: '600',
  lineHeight: '16px',
  width: '100%',
  pb: '$12',
  pl: '$16',
  pr: '$16',
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
