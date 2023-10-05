import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { APPROVAL_STATUS, EApprovalStatus } from '@constants/option';
import { ApplyResponse } from '@api/user';
import { styled } from 'stitches.config';

interface RecruitmentStatusProps {
  recruitmentStatusList: ApplyResponse[];
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

  '@tablet': {
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
    background: '$gray40',
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
  backgroundColor: '$black60',
  color: '$white100',
  fontAg: '16_semibold_100',

  '&:not(:nth-last-child(-n + 2))': {
    mb: '$12',
  },

  '@tablet': {
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
    background: '$black40',

    '@tablet': {
      width: '$26',
      height: '$26',
    },
  },

  svg: {
    width: '$32',
    height: '$32',

    '@tablet': {
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

    '@tablet': {
      maxWidth: '$61',
    },
  },

  '&:nth-child(2n)': {
    ml: '$12',

    '@tablet': {
      ml: '$8',
    },
  },
});

const SStatusText = styled('div', {
  ml: '$14',
  color: '$gray100',
  fontAg: '14_medium_100',

  variants: {
    isApproved: {
      true: {
        color: '$blue50',
      },
      false: {
        color: '$gray100',
      },
    },
  },

  '@tablet': {
    ml: '$9',
    fontSize: '$10',
  },
});
