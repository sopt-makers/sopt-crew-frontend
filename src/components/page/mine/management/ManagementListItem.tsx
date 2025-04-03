import { ampli } from '@/ampli';
import { MeetingPeopleResponse } from '@api/meeting';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { playgroundLink } from '@sopt-makers/playground-common';
import dayjs from 'dayjs';
import { styled } from 'stitches.config';

interface ManagementListItemProps {
  application: MeetingPeopleResponse['apply'][number];
}

const ManagementListItem = ({ application }: ManagementListItemProps) => {
  const { appliedDate, user, applyNumber } = application;
  const date = dayjs(appliedDate).format('YY.MM.DD');
  const time = dayjs(appliedDate).format('HH:mm:ss');

  return (
    <>
      <SListItem>
        <SUserInformation>
          <SOrderNumber>{applyNumber}</SOrderNumber>
          <SProfile>
            <SGuestProfileImage>
              {user.profileImage ? <img src={user.profileImage} alt="" /> : <ProfileDefaultIcon />}
            </SGuestProfileImage>
            <SName onClick={() => navigateToUserProfileWithTracking(user.orgId)}>{user.name}</SName>
          </SProfile>
          <SVerticalLine />
          <SDate>{date}</SDate>
          <STime>{time}</STime>
        </SUserInformation>
      </SListItem>
    </>
  );
};

export const navigateToUserProfileWithTracking = (memberId: number) => {
  ampli.clickManagementListProfile();
  window.location.href = `${playgroundLink.memberDetail(memberId)}`;
};

export default ManagementListItem;

export const SUserInformation = styled('div', {
  flexType: 'verticalCenter',
  width: '100%',
});

export const SListItem = styled('div', {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  borderRadius: '20px',
  backgroundColor: '$gray800',
  padding: '$24',
  minWidth: 'fit-content',
  height: '$80',
  mb: '$16',

  '@media (max-width: 768px)': {
    borderRadius: '8px',
    mb: '$10',
    padding: '$16',
    height: '$56',
  },
});

const SVerticalLine = styled('div', {
  width: '$1',
  height: '$12',
  ml: '$30',
  mr: '$30',
  backgroundColor: '$gray500',

  '@media (max-width: 768px)': {
    display: 'none',
  },
});

export const SProfile = styled('div', {
  flexType: 'verticalCenter',

  '@media (max-width: 768px)': {
    flex: 1,
  },
});

export const SProfileImage = styled('div', {
  width: '$32',
  height: '$32',
  background: '$gray600',
  borderRadius: '$round',
  ml: '$4',
  overflow: 'hidden',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const SGuestProfileImage = styled(SProfileImage, {
  '@media (max-width: 768px)': {
    width: '$24',
    height: '$24',
    margin: 0,

    svg: {
      width: '$24',
      height: '$24',
    },
  },
});

export const SName = styled('button', {
  ml: '$8',
  color: '$gray10',
  fontAg: '18_semibold_100',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  textAlign: 'center',
  minWidth: '$48',

  '@media (max-width: 768px)': {
    fontAg: '14_bold_100',
    minWidth: 'fit-content',
  },
});

export const SDate = styled('p', {
  flexType: 'verticalCenter',
  fontAg: '18_semibold_100',

  '@media (max-width: 768px)': {
    fontAg: '12_medium_100',
    color: '$gray400',
    justifyContent: 'space-between',
  },
});

export const STime = styled('p', {
  ml: '$8',
  fontAg: '18_semibold_100',
  color: '$gray300',

  '@media (max-width: 768px)': {
    ml: '$4',
    fontAg: '12_medium_100',
    color: '$gray500',
  },
});

export const SOrderNumber = styled('p', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '$60',
  marginRight: '$28',

  fontAg: '16_semibold_100',

  '@media (max-width: 768px)': {
    fontAg: '14_medium_100',
    color: '$gray400',
    justifyContent: 'space-between',

    width: 'fit-content',
    marginRight: '$16',
  },
});
