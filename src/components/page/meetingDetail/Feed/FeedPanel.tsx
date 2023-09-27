import { Box } from '@components/box/Box';
import React from 'react';
import { styled } from 'stitches.config';
import EmptyView from './EmptyView';
import { useRouter } from 'next/router';
import { useInfinitePosts } from '@api/post/hooks';
import FeedItem from './FeedItem';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { TAKE_COUNT } from '@constants/feed';
import useModal from '@hooks/useModal';
import FeedCreateModal from './Modal/FeedCreateModal';
import { useDisplay } from '@hooks/useDisplay';

interface FeedPanelProps {
  isMember: boolean;
}

const FeedPanel = ({ isMember }: FeedPanelProps) => {
  const router = useRouter();
  const meetingId = router.query.id as string;
  const feedCreateModal = useModal();
  const { isTablet } = useDisplay();
  const { data: postsData, fetchNextPage, hasNextPage } = useInfinitePosts(TAKE_COUNT, Number(meetingId));
  const isEmpty = !postsData?.pages[0];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const count = postsData?.total;
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  return (
    <>
      {isEmpty && (
        <SContainer>
          <EmptyView isMember={isMember} />
        </SContainer>
      )}

      {count && (
        <SHeader>
          <p>
            🔥 지금까지 쌓인 피드 <SCount>{count}</SCount>개
          </p>
          {isMember && (
            <SButton onClick={feedCreateModal.handleModalOpen}>{isTablet ? '+ 작성' : '나도 작성하기'}</SButton>
          )}
        </SHeader>
      )}

      <SFeedContainer>
        {postsData?.pages.map(post => {
          if (post) return <FeedItem key={post.id} {...post} />;
        })}
      </SFeedContainer>
      <div ref={setTarget} />

      <FeedCreateModal
        isModalOpened={feedCreateModal.isModalOpened}
        handleModalClose={feedCreateModal.handleModalClose}
      />
    </>
  );
};

export default FeedPanel;

const SContainer = styled(Box, {
  flexType: 'center',
  minHeight: '752px',

  '@tablet': {
    minHeight: '376px',
    height: '100%',
  },
});

const SFeedContainer = styled(Box, {
  display: 'grid',
  gap: '30px',
  gridTemplateColumns: '1fr 1fr 1fr',
  marginTop: '$32',
  width: '100%',

  '@tablet': {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 0,
  },
});

const SHeader = styled('div', {
  flexType: 'center',
  padding: '$31 0',
  fontStyle: 'H1',

  '@tablet': {
    padding: '$16 $20',
    fontStyle: 'H5',
    backgroundColor: '$black80',
    mt: '$28',
    borderRadius: '12px',
    flexType: 'verticalCenter',
    justifyContent: 'space-between',
  },
});

const SCount = styled('span', {
  color: '$orange100',
});

const SButton = styled('button', {
  backgroundColor: '$black40',
  fontStyle: 'H2',
  ml: '$48',
  color: '$white',
  padding: '$16 $36',
  borderRadius: '14px',

  '@tablet': {
    backgroundColor: '$orange100',
    fontStyle: 'T5',
    ml: '$20',
    padding: '$6 $12',
    borderRadius: '8px',
  },
});
