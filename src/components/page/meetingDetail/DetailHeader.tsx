import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { styled } from 'stitches.config';
import dayjs from 'dayjs';
import { playgroundLink } from '@sopt-makers/playground-common';
import useModal from '@hooks/useModal';
import { Box } from '@components/box/Box';
import DefaultModal from '@components/modal/DefaultModal';
import HostConfirmModal from './HostConfirmModal';
import GuestConfirmModal from './GuestConfirmModal';
import ProfileConfirmModal from './ProfileConfirmModal';
import ApplicationModalContent from './ApplicationModalContent';
import RecruitmentStatusModalContent from './RecruitmentStatusModalContent';
import { useGetMemberOfMe } from 'src/api/members/hooks';
import { PostApplicationRequest, MeetingResponse, UpdateInvitationRequest } from 'src/api/meeting';
import { EApprovalStatus, ERecruitmentStatus, RECRUITMENT_STATUS } from '@constants/option';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import ArrowSmallRightIcon from '@assets/svg/arrow_small_right.svg';
import MentorTooltip from './MentorTooltip';

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
  const playgroundURL = `https://playground.sopt.org/`;

  const handleRecruitmentStatusModal = () => {
    handleDefaultModalOpen();
    setModalTitle(`모집 현황 (${current}/${capacity}명)`);
  };

  const handleApplicationModal = () => {
    if (!me?.hasProfile) {
      handleProfileModalOpen();
      return;
    }
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
    const memberUploadHref = `${playgroundURL}${playgroundLink.memberUpload()}`;
    router.push(memberUploadHref);
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
            <SProfileAnchor href={`${playgroundURL}${playgroundLink.memberDetail(hostId)}`}>
              {hostProfileImage ? <img src={hostProfileImage} alt="" /> : <ProfileDefaultIcon />}
              <span>{hostName}</span>
              <ArrowSmallRightIcon />
            </SProfileAnchor>
            {!hasMentor && <MentorTooltip />}
          </SHostWrapper>
        </SAbout>
        <div>
          <SStatusButton onClick={handleRecruitmentStatusModal}>
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
          {modalTitle.includes('모집 현황') && (
            <RecruitmentStatusModalContent
              current={current}
              total={total}
              meetingId={Number(meetingId)}
              appliedInfo={appliedInfo}
              isHost={isHost}
              isApplied={isApplied}
            />
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
  pb: '$120',
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
  mr: '$90',

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
