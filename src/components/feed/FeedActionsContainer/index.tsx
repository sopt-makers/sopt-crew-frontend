import FeedActionButton from '@components/feed/FeedActionButton/FeedActionButton';
import FeedEditModal from '@components/feed/Modal/FeedEditModal';
import ConfirmModal from '@components/modal/ConfirmModal';
import ReWriteIcon from '@assets/svg/comment-write.svg';
import TrashIcon from '@assets/svg/trash.svg';
import AlertIcon from '@assets/svg/alert-triangle.svg';
import { CreateOverlayElement } from '@hooks/useOverlay/types';
import React from 'react';

interface FeedActionsProps {
  postId: number;
  isMine: boolean;
  handleDelete: () => void;
  handleReport: () => void;
  overlay: {
    open: (overlayElement: CreateOverlayElement) => void;
    close: () => void;
  };
}

interface openOverlayProps {
  isOpen: boolean;
  close: () => void;
}

const FeedActionsContainer = ({
  postId,
  isMine,
  handleDelete,
  handleReport,
  overlay,
}: FeedActionsProps): React.ReactNode[] => {
  const openOverlay = (Component: (props: openOverlayProps) => JSX.Element) => {
    overlay.open(({ isOpen, close }) => <Component isOpen={isOpen} close={close} />);
  };

  if (isMine) {
    return [
      <FeedActionButton
        onClick={() =>
          openOverlay(({ isOpen, close }) => (
            <FeedEditModal postId={postId} isModalOpened={isOpen} handleModalClose={close} />
          ))
        }
      >
        <ReWriteIcon />
        수정
      </FeedActionButton>,
      <FeedActionButton
        onClick={() => {
          openOverlay(({ isOpen, close }) => (
            <ConfirmModal
              isModalOpened={isOpen}
              message="게시글을 삭제하시겠습니까?"
              cancelButton="돌아가기"
              confirmButton="삭제하기"
              handleModalClose={close}
              handleConfirm={handleDelete}
            />
          ));
        }}
      >
        <TrashIcon />
        삭제
      </FeedActionButton>,
    ];
  }

  return [
    <FeedActionButton
      onClick={() => {
        openOverlay(({ isOpen, close }) => (
          <ConfirmModal
            isModalOpened={isOpen}
            message="게시글을 신고하시겠습니까?"
            cancelButton="돌아가기"
            confirmButton="신고하기"
            handleModalClose={close}
            handleConfirm={handleReport}
          />
        ));
      }}
    >
      <AlertIcon />
      신고
    </FeedActionButton>,
  ];
};

export default FeedActionsContainer;
