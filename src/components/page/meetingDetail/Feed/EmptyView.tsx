import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import { useOverlay } from '@hooks/useOverlay/Index';
import FeedCreateModal from '@components/page/meetingDetail/Feed/Modal/FeedCreateModal';
import ConfirmModal from '@components/modal/ConfirmModal';

interface EmptyViewProps {
  isMember: boolean;
}

const EmptyView = ({ isMember }: EmptyViewProps) => {
  const createFeedOverlay = useOverlay();
  const closeCreateFeedOverlay = useOverlay();

  const handleCreateFeedOpen = () =>
    createFeedOverlay.open(({ isOpen: isCreateModalOpen, close: closeCreateModal }) => (
      <FeedCreateModal
        isModalOpened={isCreateModalOpen}
        handleModalExit={() => {
          closeCreateModal();
        }}
        handleModalClose={() => {
          closeCreateFeedOverlay.open(({ isOpen: isConfirmModalOpen, close: closeConfirmModal }) => (
            <ConfirmModal
              isModalOpened={isConfirmModalOpen}
              message={`피드 작성을 그만두시겠어요?\n지금까지 쓴 내용이 지워져요.`}
              handleModalClose={closeConfirmModal}
              cancelButton="돌아가기"
              confirmButton="그만두기"
              handleConfirm={() => {
                closeConfirmModal();
                closeCreateModal();
              }}
            />
          ));
        }}
      />
    ));

  return (
    <SContent>
      <p>아직 작성된 피드가 없어요.</p>

      {isMember && (
        <>
          <p>첫번째 작성자가 되어볼까요?</p>
          <button onClick={handleCreateFeedOpen}>작성하러 가기</button>
        </>
      )}
    </SContent>
  );
};

export default EmptyView;

const SContent = styled(Box, {
  flexType: 'center',
  flexDirection: 'column',
  color: '$gray40',
  fontStyle: 'T1',

  '@tablet': {
    fontStyle: 'H4',
  },

  button: {
    background: '$black40',
    color: '$white',
    mt: '$48',
    padding: '16px 35.5px',
    borderRadius: '14px',
    fontStyle: 'H2',

    '@tablet': {
      mt: '$32',
      padding: '$10 $20',
      borderRadius: '8px',
      fontStyle: 'H4',
    },
  },
});
