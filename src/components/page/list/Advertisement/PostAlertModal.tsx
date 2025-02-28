import { paths } from '@/__generated__/schema2';
import { api } from '@api/index';
import ModalContainer from '@components/modal/ModalContainer';
import { Dialog } from '@headlessui/react';
import { useToast } from '@sopt-makers/ui';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { styled } from 'stitches.config';

interface PostAlertModal {
  isOpen: boolean;
  close: () => void;
  postId: number;
}

const PostAlertModal = ({ isOpen, close, postId }: PostAlertModal) => {
  const { open } = useToast();

  const { mutate: mutateReportPost } = useMutation({
    mutationFn: (postId: number) =>
      api.post<
        paths['/post/v2/{postId}/report']['post']['responses']['201']['content']['application/json;charset=UTF-8']
      >(`/post/v2/${postId}/report`, {}),
    onSuccess: () => {
      open({
        icon: 'success',
        content: '게시글을 신고했습니다.',
      });
    },
    onError: () => {
      open({
        icon: 'error',
        content: '이미 신고한 게시글입니다.',
      });
    },
  });

  return (
    <ModalContainer isModalOpened={isOpen} handleModalClose={() => {}}>
      <SDialogWrapper>
        <Dialog.Title className="title">게시글을 신고하시겠습니까?</Dialog.Title>
        <div>
          <button type="button" onClick={close}>
            돌아가기
          </button>
          <button
            type="button"
            onClick={() => {
              mutateReportPost(postId);
              close();
            }}
          >
            신고하기
          </button>
        </div>
      </SDialogWrapper>
    </ModalContainer>
  );
};

export default PostAlertModal;

const SDialogWrapper = styled('div', {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '$2',
  width: '$508',
  height: '$298',
  padding: '$48 $69',
  borderRadius: '20px',
  backgroundColor: '$gray800',
  boxShadow: '4px 4px 40px #181818',
  display: 'flex',
  flexDirection: 'column',

  '@media (max-width: 768px)': {
    width: 'calc(100% - 40px)',
    height: '$194',
    padding: '$32',
  },

  '.title': {
    fontAg: '24_bold_150',
    textAlign: 'center',
    color: '$gray10',
    whiteSpace: 'pre-wrap',
    flex: '1',
    flexType: 'center',

    '@media (max-width: 768px)': {
      fontAg: '16_bold_150',
    },
  },

  button: {
    width: '$175',
    padding: '$19 0',
    borderRadius: '10px',
    fontAg: '20_bold_100',
    textAlign: 'center',
    color: '$gray10',

    '@media (max-width: 768px)': {
      width: 'calc(50% - 10px)',
      padding: '$16 0',
      fontAg: '14_bold_100',
    },

    '&:disabled': {
      opacity: 0.35,
      cursor: 'not-allowed',
    },
  },

  'button:first-child': {
    backgroundColor: '$gray600',
    mr: '$20',
  },

  'button:last-child': {
    backgroundColor: '$gray10',
    color: '$gray950',
  },
});
