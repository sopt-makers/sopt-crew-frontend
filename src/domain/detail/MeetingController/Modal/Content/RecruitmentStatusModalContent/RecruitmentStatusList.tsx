import { paths } from '@/__generated__/schema2';
import { useUserProfileQueryOption } from '@api/user/query';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { APPROVAL_STATUS, EApprovalStatus } from '@constant/option';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';

interface RecruitmentStatusProps {
  recruitmentStatusList: paths['/meeting/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8']['appliedInfo'];
}

const RecruitmentStatusList = ({ recruitmentStatusList }: RecruitmentStatusProps) => {
  const { data: me } = useQuery(useUserProfileQueryOption());

  return (
    <SRecruitmentStatusListWrapper>
      <SRecruitmentStatusList>
        {recruitmentStatusList.map(({ status, applyNumber, user: { orgId, id, name, profileImage } }) => (
          <SRecruitmentStatusItem key={id} isActive={me?.orgId === orgId}>
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

  '@tablet': {
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

  '@tablet': {
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

  '@tablet': {
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

  variants: {
    isActive: {
      true: {
        border: '1px solid $gray10',
      },
      false: {
        border: 'none',
      },
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

  '@tablet': {
    ml: '$9',
    fontSize: '$10',
  },
});
