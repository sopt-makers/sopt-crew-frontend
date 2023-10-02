import { styled } from 'stitches.config';
import FeedItemSkeleton from './FeedItemSkeleton';

interface DesktopFeedListSkeletonProps {
  row: number;
  column: number;
}

const DesktopFeedListSkeleton = ({ row, column }: DesktopFeedListSkeletonProps) => {
  const count = row * column;
  const gridTemplateRows = `repeat(${row}, 1fr)`;
  const gridTemplateColumns = `repeat(${column}, 1fr)`;

  return (
    <SDesktopFeedListSkeleton style={{ gridTemplateRows, gridTemplateColumns }}>
      {new Array(count).fill('').map((_, i) => (
        <div key={i}>
          <FeedItemSkeleton />
        </div>
      ))}
    </SDesktopFeedListSkeleton>
  );
};

export default DesktopFeedListSkeleton;

const SDesktopFeedListSkeleton = styled('div', {
  display: 'grid',
  gap: '24px 30px',
  margin: '0 auto',
  mt: '$56',
});
