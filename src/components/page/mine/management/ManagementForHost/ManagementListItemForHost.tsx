import { useUpdateMeetingApplicationMutation } from '@api/meeting/hook';
import { GetMeetingMemberList } from '@api/meeting/type';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import {
  navigateToUserProfileWithTracking,
  SDate,
  SListItem,
  SName,
  SOrderNumber,
  SProfile,
  SProfileImage,
  STime,
  SUserInformation,
} from '@components/page/mine/management/ManagementForGuest/ManagementListItemForGuest';
import { APPROVAL_STATUS_ENGLISH_TO_KOREAN, EApprovalStatus } from '@constants/option';
import { addHyphenToPhoneNumber } from '@utils/addHypenToPhoneNumber';
import dayjs from 'dayjs';
import { useState } from 'react';
import { styled } from 'stitches.config';

type ManagementListItemForHostProps = {
  meetingId: number;
  application: GetMeetingMemberList['response']['apply'][number];
};

const ManagementListItemForHost = ({ meetingId, application }: ManagementListItemForHostProps) => {
  const { appliedDate, status = 'WAITING', user, applyNumber } = application;
  const date = dayjs(appliedDate).format('YY.MM.DD');
  const time = dayjs(appliedDate).format('HH:mm:ss');

  const { mutate: mutateUpdateApplication } = useUpdateMeetingApplicationMutation();
  const [isMutateLoading, setIsMutateLoading] = useState(false);

  const handleChangeApplicationStatus = (status: number) => () => {
    setIsMutateLoading(true);
    mutateUpdateApplication(
      {
        meetingId,
        body: {
          applyId: application.id,
          status,
        },
      },
      {
        onSuccess: () => {
          setIsMutateLoading(false);
        },
      }
    );
  };

  const statusButtonConfig = {
    desktop: {
      WAITING: [
        { type: 'approve', label: '승인', action: EApprovalStatus.APPROVE, ButtonComponent: SWhiteButton },
        { type: 'reject', label: '거절', action: EApprovalStatus.REJECT, ButtonComponent: SGrayButton },
      ],
      APPROVE: [{ type: 'cancel', label: '승인 취소', action: EApprovalStatus.WAITING, ButtonComponent: SGrayButton }],
      REJECT: [{ type: 'cancel', label: '거절 취소', action: EApprovalStatus.WAITING, ButtonComponent: SGrayButton }],
    },
    mobile: {
      WAITING: [
        {
          type: 'reject',
          label: '거절',
          action: EApprovalStatus.REJECT,
          ButtonComponent: SRejectButton,
        },
        {
          type: 'approve',
          label: '승인',
          action: EApprovalStatus.APPROVE,
          ButtonComponent: SApproveButton,
        },
      ],
      APPROVE: [
        {
          type: 'cancel',
          label: '승인 취소',
          action: EApprovalStatus.WAITING,
          ButtonComponent: SCancelButton,
        },
      ],
      REJECT: [
        {
          type: 'cancel',
          label: '거절 취소',
          action: EApprovalStatus.WAITING,
          ButtonComponent: SCancelButton,
        },
      ],
    },
  };

  return (
    <>
      <SDesktopListItem>
        <SUserInformation>
          <SOrderNumber>{applyNumber}</SOrderNumber>
          <SDesktopProfile>
            <SProfileImage>
              {user.profileImage ? <img src={user.profileImage} alt="" /> : <ProfileDefaultIcon />}
            </SProfileImage>
            <SName onClick={() => navigateToUserProfileWithTracking(user.orgId)}>{user.name}</SName>
            <SUserStatus status={status}>{APPROVAL_STATUS_ENGLISH_TO_KOREAN[status]}</SUserStatus>
          </SDesktopProfile>
          <SGeneration>{user.recentActivity.generation}기</SGeneration>
          <SPhone>{user.phone ? addHyphenToPhoneNumber(user.phone) : '-'}</SPhone>
          <SDateAndTime>
            <SDate>{date}</SDate>
            <STime>{time}</STime>
          </SDateAndTime>
        </SUserInformation>
        <SButtonContainer>
          {statusButtonConfig['desktop'][status]?.map(({ type, label, action, ButtonComponent }) => (
            <ButtonComponent key={type} disabled={isMutateLoading} onClick={handleChangeApplicationStatus(action)}>
              {label}
            </ButtonComponent>
          ))}
        </SButtonContainer>
      </SDesktopListItem>
      <SMobileCard>
        <SCardContent>
          <SCardUserInformation>
            <div>
              <SOrderNumber>{applyNumber}</SOrderNumber>
              <SCardName onClick={() => navigateToUserProfileWithTracking(user.orgId)}>{user.name}</SCardName>
              <SCardUserStatus status={status}>{APPROVAL_STATUS_ENGLISH_TO_KOREAN[status]}</SCardUserStatus>
            </div>
            <SCardGenerationAndPhone>
              <p>{user.recentActivity.generation}기</p>
              <p>{user.phone ? `, ${addHyphenToPhoneNumber(user.phone)}` : ''}</p>
            </SCardGenerationAndPhone>
          </SCardUserInformation>
          <SCardApplicationInformation>
            <SCardDateAndTime>
              <span>{date}</span>
              <span>{time}</span>
            </SCardDateAndTime>
          </SCardApplicationInformation>
        </SCardContent>
        <SCardButtonContainer>
          {statusButtonConfig['mobile'][status]?.map(({ type, label, action, ButtonComponent }) => (
            <ButtonComponent key={type} disabled={isMutateLoading} onClick={handleChangeApplicationStatus(action)}>
              {label}
            </ButtonComponent>
          ))}
        </SCardButtonContainer>
      </SMobileCard>
    </>
  );
};

export default ManagementListItemForHost;

const SDesktopListItem = styled(SListItem, {
  display: 'flex',

  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const SMobileCard = styled('div', {
  display: 'none',

  '@media (max-width: 768px)': {
    display: 'block',
  },
});

const SCardContent = styled('div', {
  display: 'flex',
  height: '$80',
  padding: '$20',
  backgroundColor: '$gray800',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
});

const SCardUserInformation = styled('div', {
  flex: 1,
  '& > div': {
    flexType: 'verticalCenter',
    '& + &': {
      mt: '$7',
    },
  },
});

const SCardApplicationInformation = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

const SDesktopProfile = styled(SProfile, {
  width: '$163',
});

const SCardName = styled('button', {
  color: '$gray10',
  fontAg: '14_bold_100',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  mr: '$4',
});

const SDateAndTime = styled('div', {
  flexType: 'horizontalCenter',
  width: '$168',
  marginLeft: '$20',
});

const SCardDateAndTime = styled('div', {
  display: 'flex',
  gap: '$4',
  mt: '$13',
  fontAg: '10_medium_100',
  color: '$gray500',
});

const SUserStatus = styled('span', {
  padding: '$4 $5',
  ml: '$10',
  borderRadius: '4px',
  fontAg: '12_semibold_100',
  backgroundColor: '$gray500',

  variants: {
    status: {
      WAITING: {
        backgroundColor: '$gray500',
      },
      APPROVE: {
        backgroundColor: '$success',
      },
      REJECT: {
        backgroundColor: '$gray600',
      },
    },
  },
});

const SCardUserStatus = styled(SUserStatus, {
  ml: '$0',
  padding: '$3 $5 $4 $5',
  fontAg: '10_bold_100',
});

const SGeneration = styled('div', {
  width: '$166',
  textAlign: 'center',
});

const SCardGenerationAndPhone = styled('div', {
  mt: '$8',
  fontAg: '12_medium_100',
  color: '$gray300',
  whiteSpace: 'pre',
});

const SPhone = styled('div', {
  width: '$166',
  textAlign: 'center',
});

const SButtonContainer = styled('div', {
  mr: '$8',
  minWidth: 'fit-content',
});

const SCardButtonContainer = styled('div', {
  flexType: 'verticalCenter',
  mb: '$16',
});

const SRoundButton = styled('button', {
  color: '$gray10',
  borderRadius: '32px',
  fontAg: '16_bold_100',
  padding: '$12 $20',
  lineHeight: '$16',

  '&:disabled': {
    opacity: '0.35',
    cursor: 'not-allowed',
  },
});

const buttonStyles = {
  width: '50%',
  padding: '$13 0',
  textAlign: 'center',
  fontAg: '14_semibold_100',
  color: '$gray400',
  backgroundColor: '$gray800',
  borderTop: '1px solid $gray600',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
  variants: {
    isMutateLoading: {
      true: {
        opacity: '0.35',
        cursor: 'not-allowed',
      },
    },
  },
} as const;

const SGrayButton = styled(SRoundButton, {
  backgroundColor: '$gray600',
});

const SWhiteButton = styled(SRoundButton, {
  mr: '$8',
  backgroundColor: '$gray10',
  color: '$gray950',
});

const SRejectButton = styled('button', {
  ...buttonStyles,
  borderBottomRightRadius: '0',
});

const SApproveButton = styled('button', {
  ...buttonStyles,
  color: '$gray950',
  backgroundColor: '$gray10',
  borderBottomLeftRadius: '0',
});

const SCancelButton = styled('button', {
  ...buttonStyles,
  width: '100%',
});
