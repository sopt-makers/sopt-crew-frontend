import { Box } from '@components/box/Box';
import React, { useState } from 'react';
import { styled } from 'stitches.config';
import ArrowSmallRightIcon from '@assets/svg/arrow_small_right.svg';
import QuestionMarkIcon from '@assets/svg/question_mark.svg?rect';
import useModal from '@hooks/useModal';
import DefaultModal from '@components/modal/DefaultModal';
import ConfirmModal from '@components/modal/ConfirmModal';
import { useRouter } from 'next/router';
import RecruitmentStatusList from './RecruitmentStatusList';
import Textarea from '@components/form/Textarea';
import Link from 'next/link';
import { PostApplicationRequest, MeetingResponse, UpdateInvitationRequest } from 'src/api/meeting';
import { EApprovalStatus, ERecruitmentStatus, RECRUITMENT_STATUS } from '@constants/option';
import { AxiosError } from 'axios';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import dayjs from 'dayjs';
import { usePlaygroundLink } from '@hooks/usePlaygroundLink';
import { useGetMemberOfMe } from 'src/api/members/hooks';

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
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState<'default' | 'confirm'>('default');
  const isDefaultModalOpened = isModalOpened && modalType === 'default';
  const isConfirmModalOpened = isModalOpened && modalType === 'confirm';
  const modalMessage = isHost
    ? '모임을 삭제하시겠습니까?'
    : !me?.hasProfile
    ? '모임을 신청하려면\n프로필 작성이 필요해요'
    : isApproved
    ? '승인을 취소하시겠습니까?'
    : '신청을 취소하시겠습니까?';
  const modalConfirmButton = isHost ? '삭제하기' : !me?.hasProfile ? '작성하기' : '취소하기';
  const [textareaValue, setTextareaValue] = useState('');
  const { memberDetail, memberUpload } = usePlaygroundLink();

  const openConfirmModal = () => {
    setModalType('confirm');
    handleModalOpen();
  };

  const handleRecruitmentStatusListModal = () => {
    handleModalOpen();
    setModalTitle(`모집 현황 (${current}/${capacity}명)`);
    setModalType('default');
  };

  const handleApplicationModal = () => {
    if (!me?.hasProfile) {
      openConfirmModal();
      return;
    }
    if (!isApplied) {
      handleModalOpen();
      setModalTitle('모임 신청하기');
      setModalType('default');
      return;
    }
    openConfirmModal();
  };

  const handleApplicationButton = () => {
    mutateApplication(
      { id: Number(meetingId), content: textareaValue },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['getMeeting'],
          });
          handleModalClose();
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
          handleModalClose();
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
    handleModalClose();
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
          handleModalClose();
        },
      }
    );
  };

  const handleNoProfile = () => {
    const uploadHref = memberUpload();
    router.push(uploadHref);
  };

  const handleConfirm = () => {
    if (isHost) {
      return handleDeleteMeeting();
    }
    if (!me?.hasProfile) {
      return handleNoProfile();
    }
    return isApproved ? handleCancelInvitation() : handleCancelApplication();
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
            <SGuestButton isApproved={isApproved} onClick={openConfirmModal}>
              승인 취소
            </SGuestButton>
          )}
          {isHost && (
            <SHostButtonContainer>
              <button onClick={openConfirmModal}>삭제</button>
              <Link href={`/edit?id=${meetingId}`} passHref>
                <a>수정</a>
              </Link>
            </SHostButtonContainer>
          )}
        </div>
      </SDetailHeader>
      {isConfirmModalOpened && (
        <ConfirmModal
          isModalOpened={isConfirmModalOpened}
          message={modalMessage}
          cancelButton="돌아가기"
          confirmButton={modalConfirmButton}
          handleModalClose={handleModalClose}
          handleConfirm={handleConfirm}
        />
      )}
      {isDefaultModalOpened && (
        <DefaultModal isModalOpened={isDefaultModalOpened} title={modalTitle} handleModalClose={handleModalClose}>
          {modalTitle === '모임 신청하기' ? (
            <SApplicationForm>
              <Textarea
                value={textareaValue}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextareaValue(e.target.value)}
                placeholder="(선택사항) 모임에 임할 각오를 입력해주세요, 입력한 각오는 개설자에게 전달돼요"
                maxLength={150}
                error={textareaValue.length >= 150 ? '150자 까지 입력할 수 있습니다.' : ''}
              />
              <button onClick={handleApplicationButton}>신청하기</button>
            </SApplicationForm>
          ) : current > 0 ? (
            <SRecruitmentStatusListWrapper>
              <RecruitmentStatusList recruitmentStatusList={appliedInfo} />
            </SRecruitmentStatusListWrapper>
          ) : (
            <SEmptyText>{isHost ? '신청자' : '참여자'}가 없습니다.</SEmptyText>
          )}
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

const SApplicationForm = styled(Box, {
  padding: '$24 $24 $40 $24',
  borderBottomLeftRadius: '16px',
  borderBottomRightRadius: '16px',

  '@mobile': {
    padding: '0 $16',
  },

  '& > p': {
    fontAg: '32_bold_100',
    textAlign: 'center',
    mt: '$32',
    mb: '$48',
  },

  label: {
    margin: 0,
  },

  textarea: {
    width: '100%',
    height: '$200',
    fontAg: '16_medium_150',
    color: '$white',
    backgroundColor: '$black60',
    outline: 'none',
    borderRadius: '10px',

    '@mobile': {
      height: '$160',
      padding: '$12',
      fontAg: '16_medium_150',
    },
  },

  'textarea:focus': {
    boxShadow: `0 0 0 1px #8040ff`,
  },

  button: {
    display: 'block',
    margin: '0 auto',
    mt: '$4',
    padding: '$19 0',
    width: '$180',
    borderRadius: '12px',
    textAlign: 'center',
    fontAg: '18_bold_100',
    color: '$white',
    backgroundColor: '$purple100',

    '@mobile': {
      width: '$130',
      padding: '$16 0',
      mt: '$8',
      mb: '$24',
      fontAg: '14_bold_100',
    },
  },
});
