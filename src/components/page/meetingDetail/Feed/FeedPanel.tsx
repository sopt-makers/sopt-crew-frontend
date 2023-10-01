import { Box } from '@components/box/Box';
import React from 'react';
import { styled } from 'stitches.config';
import EmptyView from './EmptyView';
import { useRouter } from 'next/router';
import { useInfinitePosts } from '@api/post/hooks';
import FeedItem from './FeedItem';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { POST_MAX_COUNT, TAKE_COUNT } from '@constants/feed';
import { useDisplay } from '@hooks/useDisplay';
import MobileFeedListSkeleton from './Skeleton/MobileFeedListSkeleton';
import Link from 'next/link';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import FeedCreateModal from '@components/feed/Modal/FeedCreateModal';
import { useOverlay } from '@hooks/useOverlay/Index';

interface FeedPanelProps {
  isMember: boolean;
}

const FeedPanel = ({ isMember }: FeedPanelProps) => {
  const router = useRouter();
  const meetingId = router.query.id as string;
  const feedCreateOverlay = useOverlay();

  const { isTablet } = useDisplay();
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts(TAKE_COUNT, Number(meetingId));
  const isEmpty = !postsData?.pages[0];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const postCount = postsData?.total;
  const formattedPostCount = postCount > POST_MAX_COUNT ? `${POST_MAX_COUNT}+` : postCount;
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  const handleModalOpen = () => {
    feedCreateOverlay.open(({ isOpen, close }) => {
      return <FeedCreateModal meetingId={meetingId} isModalOpened={isOpen} handleModalClose={close} />;
    });
  };

  const renderedPosts = postsData?.pages.map(post => (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <Link href={`/post?id=${post!.id}`} key={post!.id}>
      <a>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <FeedItem {...post!} />
      </a>
    </Link>
  ));

  return (
    <>
      {isEmpty && (
        <SContainer>
          <EmptyView isMember={isMember} />
        </SContainer>
      )}

      {postCount > 0 && (
        <SHeader>
          <p>
            🔥 지금까지 쌓인 피드 <SCount>{formattedPostCount}</SCount>개
          </p>
          {isMember && <SButton onClick={handleModalOpen}>{isTablet ? '+ 작성' : '나도 작성하기'}</SButton>}
        </SHeader>
      )}

      {isTablet ? (
        <SMobileContainer>{renderedPosts}</SMobileContainer>
      ) : (
        <SDesktopContainer align="left" gap={30}>
          {renderedPosts}
        </SDesktopContainer>
      )}
      <div ref={setTarget} />

      {isFetchingNextPage && isTablet && <MobileFeedListSkeleton count={3} />}
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

const SDesktopContainer = styled(MasonryInfiniteGrid, {
  marginTop: '$32',
  a: {
    width: 'calc(calc(100% - 60px) / 3)',
  },
});

const SMobileContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 0,
});

const SHeader = styled('div', {
  flexType: 'center',
  padding: '$31 0',
  fontStyle: 'H1',
  color: '$gray40',

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
  color: '$white100',
});

const SButton = styled('button', {
  backgroundColor: '$orange100',
  fontStyle: 'H2',
  ml: '$48',
  color: '$white',
  padding: '$16 $36',
  borderRadius: '14px',

  '@tablet': {
    fontStyle: 'T5',
    ml: '$20',
    padding: '$6 $12',
    borderRadius: '8px',
  },
});
