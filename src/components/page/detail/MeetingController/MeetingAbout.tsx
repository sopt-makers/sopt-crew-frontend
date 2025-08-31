import { GetMeeting } from '@api/meeting/type';
import MentorTooltip from '@components/page/detail/MeetingController/MentorTooltip';
import ProfileAnchor from '@components/page/detail/MeetingController/ProfileAnchor';
import RecruitmentStatusTag from '@components/Tag/RecruitmentStatusTag';
import dayjs from 'dayjs';
import { styled } from 'stitches.config';

const MeetingAbout = ({ detailData }: { detailData: GetMeeting['response'] }) => {
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

const SPeriod = styled('div', {
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
