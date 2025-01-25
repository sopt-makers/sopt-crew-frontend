import { GetMeetingResponse } from '@api/API_LEGACY/meeting';
import React from 'react';
import { styled } from 'stitches.config';
import dayjs from 'dayjs';
import MentorTooltip from '@components/page/detail/MeetingController/MentorTooltip';
import ProfileAnchor from '@components/page/detail/MeetingController/ProfileAnchor';
import RecruitmentStatusTag from '@components/Tag/RecruitmentStatusTag';

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
      <SStatusWrapper>
        <RecruitmentStatusTag status={status} />
        <SPeriod>
          {dayjs(startDate).format('YY.MM.DD')} - {dayjs(endDate).format('YY.MM.DD')}
        </SPeriod>
      </SStatusWrapper>
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

const SStatusWrapper = styled('div', {
  display: 'flex',
  gap: '$12',
  '@tablet': {
    gap: '$8',
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
