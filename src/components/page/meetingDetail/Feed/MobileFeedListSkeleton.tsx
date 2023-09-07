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
        <div key={i}>
          <FeedItemSkeleton />
          {i !== count - 1 && <SLine />}
        </div>
      ))}
    </SMobileFeedListSkeleton>
  );
};

export default MobileFeedListSkeleton;

const SMobileFeedListSkeleton = styled(Box, {
  margin: '0 auto',
  mt: '$24',
});

const SLine = styled(Box, {
  height: '8px',
  background: '$black80',

  '@tablet': {
    width: 'calc(100% + 40px)',
    marginLeft: '-20px',
  },

  '@mobile': {
    width: 'calc(100% + 32px)',
    marginLeft: '-16px',
  },
});
