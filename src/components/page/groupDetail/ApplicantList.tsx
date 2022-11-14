import ProfileDefaultIcon from '@assets/svg/profile_default.svg';
import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

const ApplicantList = () => {
  // TODO : API 연결하고 없애기
  const applicantList = [
    {
      id: 1,
      profileImage: '',
      name: '백지연',
    },
    {
      id: 2,
      profileImage: '',
      name: '이재훈',
    },
    {
      id: 3,
      profileImage: '',
      name: '김은수',
    },
    {
      id: 4,
      profileImage: '',
      name: '김인우',
    },
    {
      id: 5,
      profileImage: '',
      name: '김나연',
    },
    {
      id: 6,
      profileImage: '',
      name: '이동훈',
    },
    {
      id: 7,
      profileImage: '',
      name: '김준영',
    },
  ];

  return (
    <SApplicantList>
      {applicantList.map(({ id, profileImage, name }) => (
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
