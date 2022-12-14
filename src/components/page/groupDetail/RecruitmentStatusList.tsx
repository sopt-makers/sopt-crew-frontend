import ProfileDefaultIcon from '@assets/svg/profile_default.svg';
import { Box } from '@components/box/Box';
import { ApplyResponse } from 'src/api/user';
import { styled } from 'stitches.config';

interface RecruitmentStatusProps {
  recruitmentStatusList: ApplyResponse[];
}

const RecruitmentStatusList = ({
  recruitmentStatusList,
}: RecruitmentStatusProps) => {
  const profileImage = '';

  return (
    <SRecruitmentStatusList>
      {recruitmentStatusList.map(({ user: { id, name } }) => (
        <SRecruitmentStatusItem key={id}>
          {profileImage ? <img src={profileImage} /> : <ProfileDefaultIcon />}
          <span>{name}</span>
        </SRecruitmentStatusItem>
      ))}
    </SRecruitmentStatusList>
  );
};

export default RecruitmentStatusList;

const SRecruitmentStatusList = styled(Box, {
  display: 'flex',
  flexWrap: 'wrap',
  maxHeight: '$219',
  overflowY: 'scroll',

  '@mobile': {
    height: '$160',
    pl: '$20',
    pr: '$6',
    mr: '$8',
    alignContent: 'flex-start',
  },

  '&::-webkit-scrollbar': {
    width: '$6',
  },

  '&::-webkit-scrollbar-thumb': {
    height: '$125',
    background: '$gray40',
    borderRadius: '6px',
  },
});

const SRecruitmentStatusItem = styled(Box, {
  flexType: 'verticalCenter',
  width: '$280',
  height: '$64',
  padding: '$17 $20 $16 $20',
  borderRadius: '12px',
  backgroundColor: '$black60',
  color: '$white',
  fontAg: '16_bold_100',
  mb: '$12',

  '@mobile': {
    width: 'calc(50% - 3.5px)',
    height: '$48',
    padding: '$11 $12',
    fontAg: '14_medium_100',
    mb: '$8',
  },

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

    '@mobile': {
      ml: '$7',
    },
  },
});
