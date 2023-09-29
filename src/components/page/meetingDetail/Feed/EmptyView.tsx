import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import FeedCreateModal from '@components/page/meetingDetail/Feed/Modal/FeedCreateModal';
import useModal from '@hooks/useModal';

interface EmptyViewProps {
  isMember: boolean;
}

const EmptyView = ({ isMember }: EmptyViewProps) => {
  const feedCreateModal = useModal();

  return (
    <>
      <SContent>
        <SEmoji>👀</SEmoji>
        <p>아직 작성된 피드가 없어요.</p>

        {isMember && (
          <>
            <p>첫번째 작성자가 되어볼까요?</p>
            <button onClick={feedCreateModal.handleModalOpen}>작성하러 가기</button>
          </>
        )}
      </SContent>
      <FeedCreateModal
        isModalOpened={feedCreateModal.isModalOpened}
        handleModalClose={feedCreateModal.handleModalClose}
      />
    </>
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

const SEmoji = styled('p', {
  mb: '$20',

  '@tablet': {
    mb: '$12',
  },
});
