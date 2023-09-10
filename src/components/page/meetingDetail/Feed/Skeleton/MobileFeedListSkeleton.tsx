import { styled } from 'stitches.config';
import FeedItemSkeleton from './FeedItemSkeleton';
import { Box } from '@components/box/Box';

interface MobileFeedListSkeletonProps {
  count: number;
}

const MobileFeedListSkeleton = ({ count }: MobileFeedListSkeletonProps) => {
  return (
    <SMobileFeedListSkeleton>
      {new Array(count).fill('').map((_, i) => (
        <SFeedItemWrapper key={i}>
          <FeedItemSkeleton />
        </SFeedItemWrapper>
      ))}
    </SMobileFeedListSkeleton>
  );
};

export default MobileFeedListSkeleton;

const SMobileFeedListSkeleton = styled(Box, {
  margin: '0 auto',
  mt: '$24',
});

const SFeedItemWrapper = styled('div', {
  '&:not(:last-child)': {
    borderBottom: '8px solid $black80',
  },

  width: 'calc(100% + 40px)',
  marginLeft: '-20px',

  '@mobile': {
    width: 'calc(100% + 32px)',
    marginLeft: '-16px',
  },
});
