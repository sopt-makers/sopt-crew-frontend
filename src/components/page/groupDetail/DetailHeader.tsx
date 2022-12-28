import { Box } from '@components/box/Box';
import React, { useEffect, useState } from 'react';
import { styled } from 'stitches.config';
import ArrowSmallRightIcon from '@assets/svg/arrow_small_right.svg';
import useModal from '@hooks/useModal';
import DefaultModal from '@components/modal/DefaultModal';
import ConfirmModal from '@components/modal/ConfirmModal';
import { useRouter } from 'next/router';
import RecruitmentStatusList from './RecruitmentStatusList';
import Textarea from '@components/Form/Textarea';
import Link from 'next/link';
import { PostApplicationRequest, GroupResponse } from 'src/api/meeting';
import { dateFormat } from '@utils/date';
import { APPLY_STATUS, RECRUITMENT_STATUS } from '@constants/status';
import { AxiosError } from 'axios';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';

interface DetailHeaderProps {
  detailData: GroupResponse;
  mutateGroupDeletion: UseMutateFunction<
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
}

const DetailHeader = ({
  detailData,
  mutateGroupDeletion,
  mutateApplication,
}: DetailHeaderProps) => {
  const {
    status,
    startDate,
    endDate,
    category,
    title,
    user,
    appliedInfo,
    capacity,
    host,
    apply,
    approved,
    invite,
  } = detailData;
  const queryClient = useQueryClient();
  const router = useRouter();
  const groupId = router.query.id;
  const hostId = user.id;
  const hostName = user.name;
  const isHost = host;
  const isApplied = apply;
  const isApproved = approved;
  const isInvited = invite;
  const current = appliedInfo.length;
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState<'default' | 'confirm'>('default');
  const isDefaultModalOpened = isModalOpened && modalType === 'default';
  const isConfirmModalOpened = isModalOpened && modalType === 'confirm';
  const modalMessage = isHost
    ? '모임을 삭제하시겠습니까?'
    : '신청을 취소하시겠습니까?';
  const modalConfirmButton = isHost ? '삭제하기' : '취소하기';
  const [textareaValue, setTextareaValue] = useState('');
  const [origin, setOrigin] = useState('');

  const handleRecruitmentStatusListModal = () => {
    handleModalOpen();
    setModalTitle(`모집 현황 (${current}/${capacity}명)`);
    setModalType('default');
  };

  const handleApplicationModal = () => {
    if (!isApplied) {
      handleModalOpen();
      setModalTitle('모임 신청하기');
      setModalType('default');
    } else {
      setModalType('confirm');
      handleModalOpen();
    }
  };

  const handleApplicationButton = () => {
    mutateApplication(
      { id: Number(groupId), content: textareaValue },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['getGroup'],
          });
          handleModalClose();
        },
      }
    );
  };

  const handleCancel = () => {
    mutateApplication(
      { id: Number(groupId), content: '' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['getGroup'],
          });
          handleModalClose();
        },
      }
    );
  };

  const handleGroupDeletionModal = () => {
    setModalType('confirm');
    handleModalOpen();
  };

  const handleDelete = () => {
    queryClient.invalidateQueries({ queryKey: ['fetchGroupList'] });
    mutateGroupDeletion(Number(groupId), {
      onSuccess: () => {
        router.push('/');
      },
    });
    handleModalClose();
  };

  const handleInvitation = () => {
    console.log('초대 승인하기');
  };

  const handleApprovalModal = () => {
    console.log('승인 취소');
  };

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <>
      <SDetailHeader>
        <SAbout>
          <div>
            <SRecruitStatus status={status}>
              {RECRUITMENT_STATUS[status]}
            </SRecruitStatus>
            <SPeriod>
              {dateFormat(startDate)['YY.MM.DD']} -{' '}
              {dateFormat(endDate)['YY.MM.DD']}
            </SPeriod>
          </div>
          <h1>
            <span>{category}</span>
            {title}
          </h1>
          <Link href={`${origin}/members?id=${hostId}`} passHref>
            <SProfileAnchor>
              <SProfileImage />
              <span>{hostName}</span>
              <ArrowSmallRightIcon />
            </SProfileAnchor>
          </Link>
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
              isApplied={isApplied}
              onClick={handleApplicationModal}
            >
              신청{isApplied ? ' 취소' : '하기'}
            </SGuestButton>
          )}
          {!isHost && isInvited && (
            <SGuestButton isInvited={isInvited} onClick={handleInvitation}>
              초대 승인하기
            </SGuestButton>
          )}
          {!isHost && isApproved && (
            <SGuestButton isApproved={isApproved} onClick={handleApprovalModal}>
              승인 취소
            </SGuestButton>
          )}
          {isHost && (
            <SHostButtonContainer>
              <button onClick={handleGroupDeletionModal}>삭제</button>
              <Link href={`/edit?id=${groupId}`} passHref>
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
          handleConfirm={isHost ? handleDelete : handleCancel}
        />
      )}
      {isDefaultModalOpened && (
        <DefaultModal
          isModalOpened={isDefaultModalOpened}
          title={modalTitle}
          handleModalClose={handleModalClose}
        >
          {modalTitle === '모임 신청하기' ? (
            <SApplicationForm>
              <Textarea
                value={textareaValue}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setTextareaValue(e.target.value)
                }
                placeholder="(선택사항) 모임에 임할 각오를 입력해주세요!"
                maxLength={150}
                error={
                  textareaValue.length >= 150
                    ? '150자 까지 입력할 수 있습니다.'
                    : ''
                }
              />
              <button onClick={handleApplicationButton}>신청하기</button>
            </SApplicationForm>
          ) : (
            <SRecruitmentStatusListWrapper>
              {appliedInfo.length > 0 ? (
                <RecruitmentStatusList recruitmentStatusList={appliedInfo} />
              ) : (
                <SEmptyText>
                  {isHost ? '신청자' : '참여자'}가 없습니다.
                </SEmptyText>
              )}
              {isHost && (
                <Link href={`/mine/management?id=${groupId}`} passHref>
                  <SManagementAnchor>
                    <p>신청자 관리</p>
                    <ArrowSmallRightIcon />
                  </SManagementAnchor>
                </Link>
              )}
              {isApplied && (
                <Link href={`/mine/management?id=${groupId}`} passHref>
                  <SManagementAnchor>
                    <p>참여자 리스트</p>
                    <ArrowSmallRightIcon />
                  </SManagementAnchor>
                </Link>
              )}
            </SRecruitmentStatusListWrapper>
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

  '& > span': {
    mr: '$16',

    '@mobile': {
      fontAg: '12_semibold_100',
      mr: '$8',
    },
  },
});

const SProfileImage = styled(Box, {
  width: '$60',
  height: '$60',
  borderRadius: '50%',
  objectFit: 'cover',
  mr: '$16',
  backgroundColor: '$black60',

  '@mobile': {
    width: '$30',
    height: '$30',
    mr: '$8',
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
  padding: '$28 $28 $88 $28',

  '@mobile': {
    padding: '$0',
  },
});

const SManagementAnchor = styled('a', {
  mt: '$24',
  fontAg: '16_semibold_100',
  color: '$white',
  float: 'right',
  flexType: 'verticalCenter',

  '@mobile': {
    mt: '$16',
    fontAg: '12_semibold_100',
    pb: '$24',
    pr: '$20',
  },

  svg: {
    ml: '$8',
  },
});

const SEmptyText = styled('p', {
  flexType: 'verticalCenter',
  justifyContent: 'center',
  width: '100%',
  padding: '$125 0',
  color: '$gray80',
  fontAg: '18_semibold_100',

  '@mobile': {
    padding: '$74 0 $100 0',
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
    fontFamily: 'SUIT',
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
