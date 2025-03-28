import { paths } from '@/__generated__/schema2';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { APPROVAL_STATUS, EApprovalStatus } from '@constants/option';
import { styled } from 'stitches.config';

interface RecruitmentStatusProps {
  recruitmentStatusList: paths['/meeting/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8']['appliedInfo'];
}

const RecruitmentStatusList = ({ recruitmentStatusList }: RecruitmentStatusProps) => {
  return (
    <SRecruitmentStatusListWrapper>
      <SRecruitmentStatusList>
        {recruitmentStatusList.map(({ status, applyNumber, user: { id, name, profileImage } }) => (
          <SRecruitmentStatusItem key={id}>
            <div>
              <AppliedNumberText>{applyNumber}</AppliedNumberText>
              {profileImage ? <img src={profileImage} alt="" /> : <ProfileDefaultIcon />}
              <span>{name}</span>
            </div>
            <SStatusText isApproved={status === EApprovalStatus.APPROVE}>{APPROVAL_STATUS[status]}</SStatusText>
          </SRecruitmentStatusItem>
        ))}
      </SRecruitmentStatusList>
    </SRecruitmentStatusListWrapper>
  );
};

export default RecruitmentStatusList;

const SRecruitmentStatusListWrapper = styled('div', {
  height: '$219',

  overflowY: 'scroll',

  '@media (max-width: 768px)': {
    height: '$160',
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

const SRecruitmentStatusList = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '$12',

  padding: '0 $24',

  '@media (max-width: 768px)': {
    gap: '$8',

    padding: '0 $20',
  },

  '@mobile': {
    gridTemplateColumns: '1fr',
  },
});

const SRecruitmentStatusItem = styled('div', {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',

  width: '100%',
  height: '$64',
  padding: '$16 $20',

  borderRadius: '12px',
  backgroundColor: '$gray700',
  color: '$gray10',

  fontAg: '16_semibold_100',

  '@media (max-width: 768px)': {
    height: '$48',
    padding: '$11 $12',
    fontAg: '14_medium_100',
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
});

const AppliedNumberText = styled('p', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '$30',
  mr: '$10',
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
