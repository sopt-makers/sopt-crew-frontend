import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AxiosError, AxiosResponse } from 'axios';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { styled } from 'stitches.config';
import { playgroundLink } from '@sopt-makers/playground-common';
import useModal from '@hooks/useModal';
import DefaultModal from '@components/modal/DefaultModal';
import ProfileConfirmModal from './Modal/Confirm/ProfileConfirmModal';
import ApplicationModalContent from './Modal/Content/ApplicationModalContent';
import RecruitmentStatusModalContent from './Modal/Content/RecruitmentStatusModalContent';
import { PostApplicationRequest, GetMeetingResponse } from '@api/API_LEGACY/meeting';
import { ERecruitmentStatus } from '@constants/option';
import ArrowSmallRightIcon from '@assets/svg/arrow_small_right.svg';
import { useQueryMyProfile } from '@api/API_LEGACY/user/hooks';
import { ampli } from '@/ampli';
import ButtonLoader from '@components/@common/loader/ButtonLoader';
import { useDialog } from '@sopt-makers/ui';
import { ReactNode } from 'react';
import { useMutationPostEventApplication } from '@api/API_LEGACY/meeting/hooks';
import { GetFlashByIdResponse } from '@api/flash';
import MeetingAbout from '@components/page/detail/MeetingController/MeetingAbout';
import FlashAbout from '@components/page/detail/MeetingController/FlashAbout';
import { CAPACITY } from '@components/page/detail/MeetingController/constant';

interface DetailHeaderProps {
  detailData: GetMeetingResponse | GetFlashByIdResponse;
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
  mutateApplicationDeletion: UseMutateFunction<
    {
      statusCode: number;
    },
    AxiosError,
    number
  >;
}

interface DialogOptionType {
  title: ReactNode;
  description: ReactNode;
  type?: 'default' | 'danger' | 'single' | undefined;
  typeOptions?: TypeOptionsProp;
}

interface TypeOptionsProp {
  cancelButtonText?: string;
  approveButtonText?: string;
  buttonFunction?: () => void;
}

const MeetingController = ({
  detailData,
  mutateMeetingDeletion,
  mutateApplication,
  mutateApplicationDeletion,
}: DetailHeaderProps) => {
  const isFlash = detailData.category === '번쩍';
  const { status, category, appliedInfo, approved, host: isHost, apply: isApplied, id: meetingId } = detailData;

  const { open: dialogOpen, close: dialogClose } = useDialog();
  const { data: me } = useQueryMyProfile();
  const queryClient = useQueryClient();
  const router = useRouter();
  const isRecruiting = status === ERecruitmentStatus.RECRUITING;
  const { mutate: mutateEventApplication } = useMutationPostEventApplication({});
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRecruitmentStatusModal = () => {
    ampli.clickMemberStatus({ crew_status: approved || isHost });
    handleDefaultModalOpen();
    setModalTitle(`모집 현황 (${CAPACITY(detailData)})`);
  };

  const handleHostModalOpen = () => {
    const dialogOption: DialogOptionType = {
      title: '모임을 삭제하시겠습니까?',
      description: '삭제한 모임은 되돌릴 수 없어요',
      type: 'default',
      typeOptions: {
        cancelButtonText: '취소',
        approveButtonText: '삭제하기',
        buttonFunction: handleDeleteMeeting,
      },
    };
    dialogOpen(dialogOption);
  };

  const handleDeleteMeeting = () => {
    queryClient.invalidateQueries({ queryKey: ['fetchMeetingList'] });
    mutateMeetingDeletion(Number(meetingId), {
      onSuccess: () => {
        dialogClose();
        router.push('/');
      },
    });
  };

  const handleApplicationModal = () => {
    if (!isApplied) {
      ampli.clickRegisterGroup({ user_id: Number(me?.orgId) });
      handleApplicationButton('No resolution');
      return;
    }

    if (!me?.hasActivities) {
      handleProfileModalOpen();
      return;
    }

    const dialogOption: DialogOptionType = {
      title: '신청을 취소하시겠습니까?',
      description: '',
      type: 'default',
      typeOptions: {
        cancelButtonText: '돌아가기',
        approveButtonText: '취소하기',
        buttonFunction: handleCancelApplication,
      },
    };
    dialogOpen(dialogOption);
  };

  const handleApplicationButton = (textareaValue: string) => {
    setIsSubmitting(true);
    if (category === '행사') {
      mutateEventApplication(
        { meetingId: Number(meetingId), content: textareaValue },
        {
          onSuccess: async () => {
            await queryClient.refetchQueries({
              queryKey: ['getMeeting', meetingId + ''],
            });
            dialogOpen({
              title: '신청 완료 되었습니다',
              description: '',
              type: 'single',
              typeOptions: { approveButtonText: '확인', buttonFunction: dialogClose },
            });

            setIsSubmitting(false);
            handleDefaultModalClose();
          },
          onError: async (error: AxiosError) => {
            await queryClient.refetchQueries({
              queryKey: ['getMeeting', meetingId + ''],
            });
            const errorResponse = error.response as AxiosResponse;
            dialogOpen({
              title: errorResponse.data.errorCode,
              description: '',
              type: 'single',
              typeOptions: { approveButtonText: '확인', buttonFunction: dialogClose },
            });
            setIsSubmitting(false);
            handleDefaultModalClose();
          },
        }
      );
    } else {
      mutateApplication(
        { meetingId: Number(meetingId), content: textareaValue },
        {
          onSuccess: async () => {
            await queryClient.refetchQueries({
              queryKey: ['getMeeting', meetingId + ''],
            });
            await queryClient.refetchQueries({
              queryKey: ['getFlash', meetingId],
            });
            dialogOpen({
              title: '신청 완료 되었습니다',
              description: '',
              type: 'single',
              typeOptions: { approveButtonText: '확인', buttonFunction: dialogClose },
            });

            setIsSubmitting(false);
            handleDefaultModalClose();
          },
          onError: async (error: AxiosError) => {
            await queryClient.refetchQueries({
              queryKey: ['getMeeting', meetingId + ''],
            });
            await queryClient.refetchQueries({
              queryKey: ['getFlash', meetingId],
            });
            const errorResponse = error.response as AxiosResponse;
            dialogOpen({
              title: errorResponse.data.errorCode,
              description: '',
              type: 'single',
              typeOptions: { approveButtonText: '확인', buttonFunction: dialogClose },
            });
            setIsSubmitting(false);
            handleDefaultModalClose();
          },
        }
      );
    }
  };

  const handleCancelApplication = () => {
    setIsSubmitting(true);
    mutateApplicationDeletion(Number(meetingId), {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['getMeeting', meetingId + ''],
        });
        await queryClient.refetchQueries({
          queryKey: ['getFlash', meetingId],
        });
        alert('신청이 취소됐습니다!');
        setIsSubmitting(false);
      },
      onError: async (error: AxiosError) => {
        await queryClient.refetchQueries({
          queryKey: ['getMeeting', meetingId + ''],
        });
        const errorResponse = error.response as AxiosResponse;
        alert(errorResponse.data.errorCode);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <>
      <SPanelWrapper>
        {isFlash ? (
          <FlashAbout detailData={detailData as GetFlashByIdResponse} />
        ) : (
          <MeetingAbout detailData={detailData as GetMeetingResponse} />
        )}
        <div>
          <SStatusButton onClick={handleRecruitmentStatusModal}>
            <div>
              <span>모집 현황</span>
              <span>{CAPACITY(detailData)}</span>
            </div>
            <ArrowSmallRightIcon />
          </SStatusButton>
          {!isHost && (
            <SGuestButton
              disabled={!isRecruiting || isSubmitting}
              isApplied={isApplied}
              onClick={handleApplicationModal}
            >
              {isSubmitting ? <ButtonLoader /> : `신청${isApplied ? '취소' : '하기'}`}
            </SGuestButton>
          )}
          {isHost && (
            <SHostButtonContainer>
              <button onClick={handleHostModalOpen}>삭제</button>
              <Link href={isFlash ? `/edit/flash?id=${meetingId}` : `/edit?id=${meetingId}`}>수정</Link>
            </SHostButtonContainer>
          )}
        </div>
      </SPanelWrapper>
      <ProfileConfirmModal
        isModalOpened={isProfileModalOpened}
        handleModalClose={handleProfileModalClose}
        handleConfirm={() => (window.location.href = `${playgroundLink.memberUpload()}`)}
      />
      <DefaultModal
        isModalOpened={isDefaultModalOpened}
        title={modalTitle}
        handleModalClose={handleDefaultModalClose}
        isSubmitting={isSubmitting}
      >
        {modalTitle === '모임 신청하기' && (
          <ApplicationModalContent handleApplicationButton={handleApplicationButton} disabled={isSubmitting} />
        )}
        {modalTitle.includes('모집 현황') && (
          <RecruitmentStatusModalContent
            meetingId={Number(meetingId)}
            appliedInfo={appliedInfo}
            isHost={isHost}
            isCoLeader={'isCoLeader' in detailData ? detailData.isCoLeader : false}
            isApplied={isApplied}
          />
        )}
      </DefaultModal>
    </>
  );
};

export default MeetingController;

const SPanelWrapper = styled('div', {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  pb: '$120',
  borderBottom: `2px solid $gray700`,
  mb: '$40',

  '@media (max-width: 768px)': {
    display: 'block',
    paddingBottom: '0',
    borderBottom: 'none',
    mb: '$64',
  },
});

const Button = styled('button', {
  width: '$300',
  height: '$60',
  borderRadius: '8px',
  color: '$gray10',
});

const SStatusButton = styled(Button, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  padding: '$21 $20',
  mb: '$16',
  backgroundColor: '$gray800',
  fontAg: '18_semibold_100',

  '@media (max-width: 768px)': {
    width: '100%',
    height: '$46',
    padding: '$13 0',
    mt: '$32',
    mb: '$10',
    textAlign: 'center',
    justifyContent: 'center',
    fontStyle: 'T5',

    svg: {
      ml: '$2',
    },
  },

  'span:first-child': {
    mr: '$6',
    color: '$gray400',
  },
});

const SGuestButton = styled(Button, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontAg: '20_bold_100',
  padding: '$20 0',
  textAlign: 'center',
  color: '$gray950',
  '@media (max-width: 768px)': {
    width: '100%',
    height: '$46',
    fontStyle: 'T5',
    padding: '$13 0',
  },

  '&:disabled': {
    opacity: '0.35',
    backgroundColor: '$gray600',
    color: '$gray100',
    cursor: 'not-allowed',
  },

  variants: {
    isApplied: {
      true: {
        border: `2px solid $gray600`,
        color: '$gray10',
      },
      false: {
        backgroundColor: '$gray10',
      },
    },
    isApproved: {
      true: {
        color: '$gray10',
        border: `2px solid $gray600`,
      },
    },
  },
});

const SHostButtonContainer = styled('div', {
  '& > *': {
    width: '$144',
    color: '$gray10',
    padding: '$20 0',
    textAlign: 'center',
    borderRadius: '$50',
    fontAg: '20_bold_100',

    '@media (max-width: 768px)': {
      width: 'calc(50% - 3.5px)',
      padding: '$16 0',
      fontAg: '14_bold_100',
    },
  },

  button: {
    border: `2px solid $gray600`,
    mr: '$12',

    '@media (max-width: 768px)': {
      mr: '$7',
    },
  },

  a: {
    display: 'inline-block',
    backgroundColor: '$gray10',
    color: '$gray950',
  },
});
