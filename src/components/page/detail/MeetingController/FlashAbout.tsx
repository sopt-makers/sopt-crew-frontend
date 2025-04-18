import React from 'react';
import { styled } from 'stitches.config';
import dayjs from 'dayjs';
import ProfileAnchor from '@components/page/detail/MeetingController/ProfileAnchor';
import { GetFlashByIdResponse } from '@api/flash';
import RecruitmentStatusTag from '@components/Tag/RecruitmentStatusTag';

const FlashAbout = ({ detailData }: { detailData: GetFlashByIdResponse }) => {
  const {
    title,
    status,
    endDate,
    user: { orgId: hostId, name: hostName, profileImage: hostProfileImage },
    category,
  } = detailData;

  return (
    <SAbout>
      <SStatusWrapper>
        <RecruitmentStatusTag status={status} />
        <SPeriod>
          {`~${dayjs(endDate).format('YY.MM.DD')}`}
          <Divider />
          {dayjs(endDate).format('HH:mm')}
        </SPeriod>
      </SStatusWrapper>
      <h1>
        <span>{category}</span>
        {title}
      </h1>
      <SHostWrapper>
        <ProfileAnchor profileData={{ orgId: hostId, userprofileImage: hostProfileImage, userName: hostName }} />
      </SHostWrapper>
    </SAbout>
  );
};

export default FlashAbout;

const SAbout = styled('div', {
  mr: '$90',

  '@media (max-width: 768px)': {
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

      '@media (max-width: 768px)': {
        mr: '$4',
      },
    },

    fontAg: '34_bold_140',
    color: '$gray10',
    mb: '$20',

    '@media (max-width: 768px)': {
      fontStyle: 'H3',
    },
  },
});

const SStatusWrapper = styled('div', {
  display: 'flex',
  gap: '$12',
  '@media (max-width: 768px)': {
    gap: '$8',
  },
});

const Divider = styled('hr', {
  display: 'inline-block',

  width: '$1',
  height: '$16',
  margin: '0 $8',

  backgroundColor: '$gray500',
  color: '$gray500',
  border: 'none',
});

const SPeriod = styled('div', {
  display: 'flex',
  alignItems: 'center',

  fontAg: '20_bold_100',
  color: '$gray300',

  '@media (max-width: 768px)': {
    fontStyle: 'T6',
  },
});

const SHostWrapper = styled('div', {
  position: 'relative',
  gap: '16px',
  '@media (max-width: 414px)': {
    gap: '6px',
  },
});
