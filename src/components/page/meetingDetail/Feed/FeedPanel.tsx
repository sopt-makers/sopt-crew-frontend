import { Box } from '@components/box/Box';
import React from 'react';
import { styled } from 'stitches.config';
import EmptyView from './EmptyView';
import { useRouter } from 'next/router';
import { useInfinitePosts } from '@api/post/hooks';
import FeedItem from './FeedItem';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { TAKE_COUNT } from '@constants/feed';

interface FeedPanelProps {
  isMember: boolean;
}

const FeedPanel = ({ isMember }: FeedPanelProps) => {
  const router = useRouter();
  const meetingId = router.query.id as string;
  const { data: postsData, fetchNextPage, hasNextPage } = useInfinitePosts(TAKE_COUNT, Number(meetingId));
  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });
  const isEmpty = !postsData?.pages[0];

  return (
    <>
      {isEmpty && (
        <SContainer>
          <EmptyView isMember={isMember} />
        </SContainer>
      )}

      <SFeedContainer>
        {postsData?.pages.map(post => {
          if (post) return <FeedItem key={post.id} {...post} />;
        })}
      </SFeedContainer>
      <div ref={setTarget} />
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
  marginTop: '$56',
  width: '100%',

  '@tablet': {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 0,
  },
});
