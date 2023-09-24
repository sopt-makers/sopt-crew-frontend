import { Box } from '@components/box/Box';
import React from 'react';
import { styled } from 'stitches.config';
import EmptyView from './EmptyView';
import { useRouter } from 'next/router';
import { useInfinitePosts } from '@api/post/hooks';
import FeedItem from './FeedItem';

interface FeedPanelProps {
  isMember: boolean;
}

const FeedPanel = ({ isMember }: FeedPanelProps) => {
  const router = useRouter();
  const meetingId = router.query.id as string;
  const take = 10;

  const { data } = useInfinitePosts(take, Number(meetingId));

  return (
    <>
      {data?.pages.map(post => {
        if (!post)
          return (
            <SContainer>
              <EmptyView isMember={isMember} />
            </SContainer>
          );
      })}

      <SFeedContainer>
        {data?.pages.map(post => {
          if (post) return <FeedItem key={post.id} {...post} />;
        })}
      </SFeedContainer>
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
  width: '100%',
  display: 'grid',
  gap: '30px',
  gridTemplateColumns: '1fr 1fr 1fr',

  '@tablet': {
    display: 'flex',
    flexDirection: 'column',
  },
});
