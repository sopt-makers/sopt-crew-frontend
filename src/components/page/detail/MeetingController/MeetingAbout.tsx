import { GetMeetingResponse } from '@api/API_LEGACY/meeting';
import { RECRUITMENT_STATUS } from '@constants/option';
import React from 'react';
import { styled } from 'stitches.config';
import dayjs from 'dayjs';
import MentorTooltip from '@components/page/detail/MeetingController/MentorTooltip';
import ProfileAnchor from '@components/page/detail/MeetingController/ProfileAnchor';

const MeetingAbout = ({ detailData }: { detailData: GetMeetingResponse }) => {
  const {
    title,
    status,
    startDate,
    endDate,
    user: { orgId: hostId, name: hostName, profileImage: hostProfileImage },
    category,
    coMeetingLeaders,
    isMentorNeeded,
  } = detailData;

  return (
    <SAbout>
      <div>
        <SRecruitStatus status={status}>{RECRUITMENT_STATUS[status]}</SRecruitStatus>
        <SPeriod>
          {dayjs(startDate).format('YY.MM.DD')} - {dayjs(endDate).format('YY.MM.DD')}
        </SPeriod>
      </div>
      <h1>
        <span>{category}</span>
        {title}
      </h1>
      <SHostWrapper>
        <ProfileAnchor profileData={{ orgId: hostId, userprofileImage: hostProfileImage, userName: hostName }} />
        {coMeetingLeaders?.map((item: typeof coMeetingLeaders[number]) => (
          <ProfileAnchor profileData={item} />
        ))}
      </SHostWrapper>
      {isMentorNeeded && <MentorTooltip />}
    </SAbout>
  );
};

export default MeetingAbout;

const SAbout = styled('div', {
  mr: '$90',

  '@tablet': {
    mr: '$0',
  },

  '& > div': {
    flexType: 'verticalCenter',
    mb: '$12',
  },

  '& > h1': {
    span: {
      color: '$gray400',
      mr: '$8',

      '@tablet': {
        mr: '$4',
      },
    },

    fontAg: '34_bold_140',
    color: '$gray10',
    mb: '$20',

    '@tablet': {
      fontStyle: 'H3',
    },
  },
});

const SRecruitStatus = styled('div', {
  width: 'fit-content',
  padding: '$7 $8',
  mr: '$12',
  borderRadius: '6px',
  fontAg: '16_bold_100',

  '@tablet': {
    padding: '$2 $6',
    mr: '$8',
    borderRadius: '5px',
    fontStyle: 'B4',
  },

  variants: {
    status: {
      0: {
        backgroundColor: '$gray600',
      },
      1: {
        backgroundColor: '$secondary',
        color: '$gray950',
      },
      2: {
        backgroundColor: '$gray700',
      },
    },
  },
});

const SPeriod = styled('div', {
  fontAg: '20_bold_100',
  color: '$gray300',

  '@tablet': {
    fontStyle: 'T6',
  },
});

const SHostWrapper = styled('div', {
  position: 'relative',
  gap: '16px',
  '@mobile': {
    gap: '6px',
  },
});
