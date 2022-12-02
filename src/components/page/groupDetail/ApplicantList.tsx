import ProfileDefaultIcon from '@assets/svg/profile_default.svg';
import { Box } from '@components/box/Box';
import { ApplyResponse } from 'src/api/user';
import { styled } from 'stitches.config';

interface ApplicantListProps {
  applicantList: ApplyResponse[];
}

const ApplicantList = ({ applicantList }: ApplicantListProps) => {
  const profileImage = '';

  return (
    <SApplicantList>
      {applicantList.map(({ user: { id, name } }) => (
        <SApplicantListItem key={id}>
          {profileImage ? <img src={profileImage} /> : <ProfileDefaultIcon />}
          <span>{name}</span>
        </SApplicantListItem>
      ))}
    </SApplicantList>
  );
};

export default ApplicantList;

const SApplicantList = styled(Box, {
  display: 'flex',
  flexWrap: 'wrap',
  height: '$219',
  overflowY: 'scroll',

  '&::-webkit-scrollbar': {
    width: '$6',
  },

  '&::-webkit-scrollbar-thumb': {
    height: '$125',
    background: '$gray40',
    borderRadius: '6px',
  },
});

const SApplicantListItem = styled(Box, {
  flexType: 'verticalCenter',
  width: '$280',
  height: '$64',
  padding: '$17 $20 $16 $20',
  borderRadius: '12px',
  backgroundColor: '$black60',
  color: '$white',
  fontAg: '16_bold_100',
  mb: '$12',

  img: {
    width: '$32',
    height: '$32',
    borderRadius: '$round',
    objectFit: 'cover',
  },

  span: {
    ml: '$10',
  },

  '&:nth-child(2n)': {
    ml: '$12',
  },
});
