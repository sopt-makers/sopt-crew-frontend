import { Box } from '@components/box/Box';
import React, { useEffect, useState } from 'react';
import { styled } from 'stitches.config';
import ArrowSmallRightIcon from '@assets/svg/arrow_small_right.svg';
import useModal from '@hooks/useModal';
import DefaultModal from '@components/modal/DefaultModal';
import ConfirmModal from '@components/modal/ConfirmModal';
import { useRouter } from 'next/router';
import ApplicantList from './ApplicantList';
import Textarea from '@components/Form/Textarea';
import Link from 'next/link';
import { PostApplicationRequest, GroupResponse } from 'src/api/meeting';
import { dateFormat } from '@utils/date';
import { RECRUITMENT_STATUS } from '@constants/status';
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
  } = detailData;
  const queryClient = useQueryClient();
  const router = useRouter();
  const groupId = router.query.id;
  const hostId = user.id;
  const hostName = user.name;
  const isHost = host;
  const isApplied = apply;
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

  const handleApplicantListModal = () => {
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
          <SStatusButton onClick={handleApplicantListModal}>
            <div>
              <span>모집 현황</span>
              <span>
                {current}/{capacity}명
              </span>
            </div>
            <ArrowSmallRightIcon />
          </SStatusButton>
          {!isHost && (
            <SGuestButton
              isApplied={isApplied}
              onClick={handleApplicationModal}
            >
              신청{isApplied ? ' 취소' : '하기'}
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
            <SApplicantListWrapper>
              {appliedInfo.length > 0 ? (
                <ApplicantList applicantList={appliedInfo} />
              ) : (
                <SEmptyText>
                  {isHost ? '신청자' : '참여자'}가 없습니다.
                </SEmptyText>
              )}
              {isHost && (
                <Link href={`/mine/management?id=${groupId}`} passHref>
                  <SApplicantAnchor>
                    <p>신청자 관리</p>
                    <ArrowSmallRightIcon />
                  </SApplicantAnchor>
                </Link>
              )}
              {isApplied && (
                <Link href={`/mine/management?id=${groupId}`} passHref>
                  <SApplicantAnchor>
                    <p>참여자 리스트</p>
                    <ArrowSmallRightIcon />
                  </SApplicantAnchor>
                </Link>
              )}
            </SApplicantListWrapper>
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
});

const SAbout = styled(Box, {
  marginRight: '$90',

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
    mb: '$20',
  },
});

const SRecruitStatus = styled(Box, {
  width: 'fit-content',
  padding: '$7 $8',
  mr: '$12',
  borderRadius: '6px',
  fontAg: '16_bold_100',

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
});

const SProfileAnchor = styled('a', {
  flexType: 'verticalCenter',
  color: '$white',
  width: 'fit-content',

  '& > span': {
    mr: '$16',
  },
});

const SProfileImage = styled(Box, {
  width: '$60',
  height: '$60',
  borderRadius: '50%',
  objectFit: 'cover',
  mr: '$16',
  backgroundColor: '$black60',
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

  'span:first-child': {
    mr: '$12',
    color: '$gray80',
  },
});

const SGuestButton = styled(Button, {
  fontAg: '20_bold_100',
  padding: '$20 0',
  textAlign: 'center',

  variants: {
    isApplied: {
      true: {
        border: `2px solid $black40`,
      },
      false: {
        backgroundColor: '$purple100',
      },
    },
  },
});

const SHostButtonContainer = styled(Box, {
  button: {
    width: '$144',
    color: '$white',
    padding: '$20 0',
    textAlign: 'center',
    borderRadius: '$50',
    fontAg: '20_bold_100',
    border: `2px solid $black40`,
    mr: '12px',
  },

  a: {
    display: 'inline-block',
    width: '$144',
    color: '$white',
    padding: '$20 0',
    textAlign: 'center',
    borderRadius: '$50',
    fontAg: '20_bold_100',
    backgroundColor: '$purple100',
  },
});

const SApplicantListWrapper = styled(Box, {
  padding: '$28 $28 $88 $28',
});

const SApplicantAnchor = styled('a', {
  mt: '$24',
  fontAg: '16_semibold_100',
  color: '$white',
  float: 'right',
  flexType: 'verticalCenter',

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
});

const SApplicationForm = styled(Box, {
  padding: '$24 $24 $132 $24',
  borderBottomLeftRadius: '16px',
  borderBottomRightRadius: '16px',
  height: '$356',

  '& > p': {
    fontAg: '32_bold_100',
    textAlign: 'center',
    mt: '$32',
    mb: '$48',
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
  },

  'textarea:focus': {
    boxShadow: `0 0 0 1px #8040ff`,
  },

  button: {
    display: 'block',
    margin: '0 auto',
    mt: '$4',
    mb: '$48',
    padding: '$19 0',
    width: '$180',
    borderRadius: '12px',
    textAlign: 'center',
    fontAg: '18_bold_100',
    color: '$white',
    backgroundColor: '$purple100',
  },
});
