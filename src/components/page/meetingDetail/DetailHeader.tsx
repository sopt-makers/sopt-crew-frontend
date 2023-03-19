import { Box } from '@components/box/Box';
import React, { useState } from 'react';
import { styled } from 'stitches.config';
import ArrowSmallRightIcon from '@assets/svg/arrow_small_right.svg';
import QuestionMarkIcon from '@assets/svg/question_mark.svg?rect';
import useModal from '@hooks/useModal';
import DefaultModal from '@components/modal/DefaultModal';
import { useRouter } from 'next/router';
import RecruitmentStatusList from './RecruitmentStatusList';
import Link from 'next/link';
import { PostApplicationRequest, MeetingResponse, UpdateInvitationRequest } from 'src/api/meeting';
import { EApprovalStatus, ERecruitmentStatus, RECRUITMENT_STATUS } from '@constants/option';
import { AxiosError } from 'axios';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import dayjs from 'dayjs';
import { usePlaygroundLink } from '@hooks/usePlaygroundLink';
import { useGetMemberOfMe } from 'src/api/members/hooks';
import HostConfirmModal from './HostConfirmModal';
import GuestConfirmModal from './GuestConfirmModal';
import ProfileConfirmModal from './ProfileConfirmModal';
import ApplicationModalContent from './ApplicationModalContent';

interface DetailHeaderProps {
  detailData: MeetingResponse;
  mutateMeetingDeletion: UseMutateFunction<
    {
      statusCode: number;
    },
    AxiosError,
    number
  >;
  mutateApplication: UseMutateFunction<
    {
      statusCode: number;
    },
    AxiosError,
    PostApplicationRequest
  >;
  mutateInvitation: UseMutateFunction<{ statusCode: number }, AxiosError, UpdateInvitationRequest>;
}

const DetailHeader = ({
  detailData,
  mutateMeetingDeletion,
  mutateApplication,
  mutateInvitation,
}: DetailHeaderProps) => {
  const {
    status,
    startDate,
    endDate,
    category,
    title,
    user: { orgId: hostId, name: hostName, profileImage: hostProfileImage },
    appliedInfo,
    capacity,
    host: isHost,
    apply: isApplied,
    approved: isApproved,
    invite: isInvited,
  } = detailData;
  const { data: me } = useGetMemberOfMe();
  const queryClient = useQueryClient();
  const router = useRouter();
  const meetingId = router.query.id;
  const hasMentor = false; // TODO: API response 바뀌면 수정할 예정
  const isRecruiting = status === ERecruitmentStatus.RECRUITING;
  const current = appliedInfo.length;
  const total = appliedInfo.length; // TODO: API response 바뀌면 수정할 예정
  const {
    isModalOpened: isHostModalOpened,
    handleModalOpen: handleHostModalOpen,
    handleModalClose: handleHostModalClose,
  } = useModal();
  const {
    isModalOpened: isGuestModalOpened,
    handleModalOpen: handleGuestModalOpen,
    handleModalClose: handleGuestModalClose,
  } = useModal();
  const {
    isModalOpened: isProfileModalOpened,
    handleModalOpen: handleProfileModalOpen,
    handleModalClose: handleProfileModalClose,
  } = useModal();
  const {
    isModalOpened: isDefaultModalOpened,
    handleModalOpen: handleDefaultModalOpen,
    handleModalClose: handleDefaultModalClose,
  } = useModal();
  const [modalTitle, setModalTitle] = useState('');
  const { memberDetail, memberUpload } = usePlaygroundLink();

  const handleRecruitmentStatusListModal = () => {
    handleDefaultModalOpen();
    setModalTitle(`모집 현황 (${current}/${capacity}명)`);
  };

  const handleApplicationModal = () => {
    // if (!me?.hasProfile) {
    //   handleProfileModalOpen();
    //   return;
    // }
    if (!isApplied) {
      handleDefaultModalOpen();
      setModalTitle('모임 신청하기');
      return;
    }
    handleGuestModalOpen();
  };

  const handleApplicationButton = (textareaValue: string) => {
    mutateApplication(
      { id: Number(meetingId), content: textareaValue },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['getMeeting'],
          });
          handleDefaultModalClose();
        },
      }
    );
  };

  const handleCancelApplication = () => {
    mutateApplication(
      { id: Number(meetingId), content: '' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['getMeeting'],
          });
          handleGuestModalClose();
        },
      }
    );
  };

  const handleDeleteMeeting = () => {
    queryClient.invalidateQueries({ queryKey: ['fetchMeetingList'] });
    mutateMeetingDeletion(Number(meetingId), {
      onSuccess: () => {
        router.push('/');
      },
    });
    handleHostModalClose();
  };

  const handleApproveInvitation = () => {
    mutateInvitation(
      {
        id: Number(meetingId),
        applyId: Number(meetingId),
        status: EApprovalStatus.APPROVE,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['getMeeting'],
          });
        },
      }
    );
  };

  const handleCancelInvitation = () => {
    mutateInvitation(
      {
        id: Number(meetingId),
        applyId: Number(meetingId),
        status: EApprovalStatus.REJECT,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['getMeeting'],
          });
          handleGuestModalClose();
        },
      }
    );
  };

  const handleNoProfile = () => {
    const uploadHref = memberUpload();
    router.push(uploadHref);
  };

  return (
    <>
      <SDetailHeader>
        <SAbout>
          <div>
            <SRecruitStatus status={status}>{RECRUITMENT_STATUS[status]}</SRecruitStatus>
            <SPeriod>
              {dayjs(startDate).format('YY.MM.DD')} - {dayjs(endDate).format('YY.MM.DD')}
            </SPeriod>
          </div>
          <h1>
            <span>{category}</span>
            {title}
          </h1>
          <SHostWrapper>
            <Link href={memberDetail(hostId)} passHref>
              <SProfileAnchor>
                {hostProfileImage ? <img src={hostProfileImage} alt="" /> : <ProfileDefaultIcon />}
                <span>{hostName}</span>
                <ArrowSmallRightIcon />
              </SProfileAnchor>
            </Link>
            {!hasMentor && (
              <STooltip>
                <STooltipTitle>
                  멘토 구해요 <QuestionMarkIcon />
                </STooltipTitle>
                <STooltipDescription>
                  <p>이 모임의 멘토로 참여할 의향이 있으신가요?</p>
                  <p>개설자 프로필에서 쪽지를 보내주세요:)</p>
                </STooltipDescription>
              </STooltip>
            )}
          </SHostWrapper>
        </SAbout>
        <div>
          <SStatusButton onClick={handleRecruitmentStatusListModal}>
            <div>
              <span>모집 현황</span>
              <span>
                {current}/{capacity}명
              </span>
            </div>
            <ArrowSmallRightIcon />
          </SStatusButton>
          {!isHost && !isInvited && !isApproved && (
            <SGuestButton
              disabled={!isRecruiting}
              isRecruiting={isRecruiting}
              isApplied={isApplied}
              onClick={handleApplicationModal}
            >
              신청{isApplied ? ' 취소' : '하기'}
            </SGuestButton>
          )}
          {!isHost && isInvited && (
            <SGuestButton isInvited={isInvited} onClick={handleApproveInvitation}>
              초대 승인하기
            </SGuestButton>
          )}
          {!isHost && isApproved && (
            <SGuestButton isApproved={isApproved} onClick={handleGuestModalOpen}>
              승인 취소
            </SGuestButton>
          )}
          {isHost && (
            <SHostButtonContainer>
              <button onClick={handleHostModalOpen}>삭제</button>
              <Link href={`/edit?id=${meetingId}`} passHref>
                <a>수정</a>
              </Link>
            </SHostButtonContainer>
          )}
        </div>
      </SDetailHeader>
      {isHost && isHostModalOpened && (
        <HostConfirmModal
          isModalOpened={isHostModalOpened}
          handleModalClose={handleHostModalClose}
          handleConfirm={handleDeleteMeeting}
        />
      )}
      {!me?.hasProfile && isProfileModalOpened && (
        <ProfileConfirmModal
          isModalOpened={isProfileModalOpened}
          handleModalClose={handleProfileModalClose}
          handleConfirm={handleNoProfile}
        />
      )}
      {isGuestModalOpened && (
        <GuestConfirmModal
          isModalOpened={isGuestModalOpened}
          message={`${isApproved ? '승인' : '신청'}을 취소하시겠습니까?`}
          handleModalClose={handleGuestModalClose}
          handleConfirm={isApproved ? handleCancelInvitation : handleCancelApplication}
        />
      )}
      {isDefaultModalOpened && (
        <DefaultModal
          isModalOpened={isDefaultModalOpened}
          title={modalTitle}
          handleModalClose={handleDefaultModalClose}
        >
          {modalTitle === '모임 신청하기' && (
            <ApplicationModalContent handleApplicationButton={handleApplicationButton} />
          )}
          {modalTitle.includes('모집 현황') &&
            (current > 0 ? (
              <SRecruitmentStatusListWrapper>
                <RecruitmentStatusList recruitmentStatusList={appliedInfo} />
              </SRecruitmentStatusListWrapper>
            ) : (
              <SEmptyText>{isHost ? '신청자' : '참여자'}가 없습니다.</SEmptyText>
            ))}
          {modalTitle.includes('모집 현황') && (total > 0 || isHost || isApplied) && (
            <SRecruitmentStatusModalBottom>
              {total > 0 && <STotal>총 {total}명 신청</STotal>}
              <Link href={`/mine/management?id=${meetingId}`} passHref>
                <SManagementAnchor>
                  {isHost ? '신청자 관리' : isApplied && '참여자 리스트'}
                  <ArrowSmallRightIcon />
                </SManagementAnchor>
              </Link>
            </SRecruitmentStatusModalBottom>
          )}
        </DefaultModal>
      )}
    </>
  );
};

export default DetailHeader;

const SDetailHeader = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  paddingBottom: '$120',
  borderBottom: `2px solid $black60`,
  mb: '$40',

  '@mobile': {
    display: 'block',
    paddingBottom: '0',
    borderBottom: 'none',
    mb: '$64',
  },
});

const SAbout = styled(Box, {
  marginRight: '$90',

  '@mobile': {
    mr: '$0',
  },

  '& > div': {
    flexType: 'verticalCenter',
    mb: '$12',
  },

  '& > h1': {
    span: {
      color: '$gray80',
      marginRight: '$8',
    },

    fontAg: '34_bold_140',
    color: '$white',
    mb: '$20',

    '@mobile': {
      fontAg: '18_bold_140',
    },
  },
});

const SRecruitStatus = styled(Box, {
  width: 'fit-content',
  padding: '$7 $8',
  mr: '$12',
  borderRadius: '6px',
  fontAg: '16_bold_100',

  '@mobile': {
    padding: '$5',
    mr: '$8',
    borderRadius: '5px',
    fontAg: '10_bold_100',
  },

  variants: {
    status: {
      0: {
        backgroundColor: '$black40',
      },
      1: {
        backgroundColor: '$purple100',
      },
      2: {
        backgroundColor: '$gray60',
      },
    },
  },
});

const SPeriod = styled(Box, {
  fontAg: '20_bold_100',

  '@mobile': {
    fontAg: '12_semibold_100',
  },
});

const SProfileAnchor = styled('a', {
  flexType: 'verticalCenter',
  color: '$white',
  width: 'fit-content',

  img: {
    width: '$60',
    height: '$60',
    borderRadius: '50%',
    objectFit: 'cover',
    mr: '$16',
    '@mobile': {
      width: '$30',
      height: '$30',
      mr: '$8',
    },
  },

  '& > svg:first-child': {
    width: '$60',
    height: '$60',
    mr: '$16',

    '@mobile': {
      width: '$30',
      height: '$30',
      mr: '$8',
    },
  },

  '& > span': {
    mr: '$16',

    '@mobile': {
      fontAg: '12_semibold_100',
      mr: '$8',
    },
  },
});

const SHostWrapper = styled(Box, {
  position: 'relative',
});

const STooltip = styled(Box, {
  position: 'absolute',
  top: '$13',
  left: '176px',
  backgroundColor: '$black40',
  width: 'max-content',
  padding: '$12 $14',
  borderRadius: '10px',
  fontAg: '14_medium_100',
  cursor: 'default',

  svg: {
    marginLeft: '$10',

    '@mobile': {
      marginLeft: '$6',
      width: '$12',
      height: '$12',
    },
  },

  '@mobile': {
    top: '-2px',
    left: '109px',
    fontAg: '12_medium_100',
  },

  '&:hover': {
    '& > div:last-child': {
      display: 'block',
      marginTop: '$14',
      lineHeight: '140%',
    },
  },

  '&::after': {
    content: '',
    position: 'absolute',
    top: '$14',
    right: '100%',
    border: 'solid transparent',
    borderWidth: '3.5px 9px',
    borderRightColor: '$black40',
  },
});

const STooltipTitle = styled(Box, {
  flexType: 'verticalCenter',
});

const STooltipDescription = styled(Box, {
  display: 'none',

  '& > p': {
    '@mobile': {
      fontSize: '$10',
      lineHeight: '150%',
    },
  },
});

const Button = styled('button', {
  width: '$300',
  height: '$60',
  borderRadius: '12px',
  color: '$white',
});

const SStatusButton = styled(Button, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  padding: '$21 $20',
  mb: '$16',
  backgroundColor: '$black80',
  fontAg: '18_semibold_100',

  '@mobile': {
    width: '100%',
    height: '$46',
    padding: '$13 0',
    mt: '$32',
    mb: '$10',
    textAlign: 'center',
    justifyContent: 'center',
    fontAg: '14_semibold_100',

    svg: {
      ml: '$8',
    },
  },

  'span:first-child': {
    mr: '$12',
    color: '$gray80',
  },
});

const SGuestButton = styled(Button, {
  fontAg: '20_bold_100',
  padding: '$20 0',
  textAlign: 'center',

  '@mobile': {
    width: '100%',
    height: '$46',
    fontAg: '14_bold_100',
    padding: '$16 0',
  },

  variants: {
    isRecruiting: {
      false: {
        opacity: 0.35,
        cursor: 'not-allowed',
      },
    },
    isApplied: {
      true: {
        border: `2px solid $black40`,
      },
      false: {
        backgroundColor: '$purple100',
      },
    },
    isInvited: {
      true: {
        backgroundColor: '$purple100',
      },
    },
    isApproved: {
      true: {
        border: `2px solid $black40`,
      },
    },
  },
});

const SHostButtonContainer = styled(Box, {
  '& > *': {
    width: '$144',
    color: '$white',
    padding: '$20 0',
    textAlign: 'center',
    borderRadius: '$50',
    fontAg: '20_bold_100',

    '@mobile': {
      width: 'calc(50% - 3.5px)',
      padding: '$16 0',
      fontAg: '14_bold_100',
    },
  },

  button: {
    border: `2px solid $black40`,
    mr: '$12',

    '@mobile': {
      mr: '$7',
    },
  },

  a: {
    display: 'inline-block',
    backgroundColor: '$purple100',
  },
});

const SRecruitmentStatusListWrapper = styled(Box, {
  padding: '$24 $24 0 $24',

  '@mobile': {
    padding: '$0',
  },
});

const SRecruitmentStatusModalBottom = styled(Box, {
  margin: '$24 $42 $44 $30',
  flexType: 'verticalCenter',
  justifyContent: 'space-between',

  '@mobile': {
    margin: '$16 $20 $24 $20',
  },
});

const STotal = styled('p', {
  color: '$gray80',
  fontAg: '16_medium_100',

  '@mobile': {
    fontAg: '12_medium_100',
  },
});

const SManagementAnchor = styled('a', {
  fontAg: '16_semibold_100',
  color: '$white',
  flexType: 'verticalCenter',
  position: 'absolute',
  right: '$42',

  '@mobile': {
    fontAg: '12_semibold_100',
    right: '$20',
  },

  svg: {
    ml: '$8',
  },
});

const SEmptyText = styled('p', {
  flexType: 'center',
  width: '100%',
  height: '$280',
  color: '$gray80',
  fontAg: '18_semibold_100',

  '@mobile': {
    height: '$184',
    fontAg: '14_medium_100',
  },
});
