import { paths } from '@/__generated__/schema2';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { APPROVAL_STATUS, EApprovalStatus } from '@constants/option';
import { styled } from 'stitches.config';

interface RecruitmentStatusProps {
  recruitmentStatusList: paths['/meeting/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8']['appliedInfo'];
}

const RecruitmentStatusList = ({ recruitmentStatusList }: RecruitmentStatusProps) => {
  return (
    <SRecruitmentStatusList>
      {recruitmentStatusList.map(({ status, user: { id, name, profileImage } }) => (
        <SRecruitmentStatusItem key={id}>
          <div>
            {profileImage ? <img src={profileImage} alt="" /> : <ProfileDefaultIcon />}
            <span>{name}</span>
          </div>
          <SStatusText isApproved={status === EApprovalStatus.APPROVE}>{APPROVAL_STATUS[status]}</SStatusText>
        </SRecruitmentStatusItem>
      ))}
    </SRecruitmentStatusList>
  );
};

export default RecruitmentStatusList;

const SRecruitmentStatusList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  height: '$219',
  overflowY: 'scroll',
  alignContent: 'flex-start',

  '@media (max-width: 768px)': {
    height: '$160',
    pl: '$20',
    pr: '$6',
    mr: '$8',
  },

  '&::-webkit-scrollbar': {
    width: '$6',
  },

  '&::-webkit-scrollbar-thumb': {
    height: '$125',
    background: '$gray200',
    borderRadius: '6px',
  },
});

const SRecruitmentStatusItem = styled('div', {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  width: 'calc(50% - 11px)',
  height: '$64',
  padding: '$16 $20',
  borderRadius: '12px',
  backgroundColor: '$gray700',
  color: '$gray10',
  fontAg: '16_semibold_100',

  '&:not(:nth-last-child(-n + 2))': {
    mb: '$12',
  },

  '@media (max-width: 768px)': {
    width: 'calc(50% - 4px)',
    height: '$48',
    padding: '$11 $12',
    fontAg: '14_medium_100',

    '&:not(:nth-last-child(-n + 2))': {
      mb: '$8',
    },
  },

  div: {
    flexType: 'verticalCenter',
  },

  img: {
    width: '$32',
    height: '$32',
    borderRadius: '$round',
    objectFit: 'cover',
    background: '$gray600',

    '@media (max-width: 768px)': {
      width: '$26',
      height: '$26',
    },
  },

  svg: {
    width: '$32',
    height: '$32',

    '@media (max-width: 768px)': {
      width: '$26',
      height: '$26',
    },
  },

  span: {
    ml: '$10',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '$154',

    '@media (max-width: 768px)': {
      maxWidth: '$61',
    },
  },

  '&:nth-child(2n)': {
    ml: '$12',

    '@media (max-width: 768px)': {
      ml: '$8',
    },
  },
});

const SStatusText = styled('div', {
  ml: '$14',
  color: '$gray500',
  fontAg: '14_medium_100',

  variants: {
    isApproved: {
      true: {
        color: '$success',
      },
      false: {
        color: '$gray500',
      },
    },
  },

  '@media (max-width: 768px)': {
    ml: '$9',
    fontSize: '$10',
  },
});
