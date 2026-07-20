import { useDisplay } from '@hook/useDisplay';
import { styled } from 'stitches.config';
import FeedItemSkeleton from './FeedItemSkeleton';

interface FeedListSkeletonProps {
  count: number;
}

const FeedListSkeleton = ({ count }: FeedListSkeletonProps) => {
  const { isTablet } = useDisplay();

  return isTablet ? (
    <SFeedListSkeleton>
      {new Array(count).fill('').map((_, i) => (
        <SFeedItemWrapper key={i}>
          <FeedItemSkeleton />
        </SFeedItemWrapper>
      ))}
    </SFeedListSkeleton>
  ) : (
    <SDesktopFeedListSkeleton style={{ gridTemplateRows: 'repeat(3, 1fr)', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {new Array(count * 3).fill('').map((_, i) => (
        <div key={i}>
          <FeedItemSkeleton />
        </div>
      ))}
    </SDesktopFeedListSkeleton>
  );
};

export default FeedListSkeleton;

const SFeedListSkeleton = styled('div', {
  margin: '0 auto',
  mt: '$24',
});

const SFeedItemWrapper = styled('div', {
  '&:not(:last-child)': {
    borderBottom: '8px solid $gray800',
  },

  width: 'calc(100% + 40px)',
  marginLeft: '-20px',

  '@media (max-width: 414px)': {
    width: 'calc(100% + 32px)',
    marginLeft: '-16px',
  },
});

const SDesktopFeedListSkeleton = styled('div', {
  display: 'grid',
  gap: '24px 30px',
  margin: '0 auto',
  mt: '$56',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});
