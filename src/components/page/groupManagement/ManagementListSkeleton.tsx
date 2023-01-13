import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

const ManagementListSkeleton = () => {
  return (
    <>
      {new Array(9).fill('').map((_, i) => (
        <SItemSkeleton key={i} />
      ))}
    </>
  );
};

export default ManagementListSkeleton;

const SItemSkeleton = styled(Box, {
  height: '$80',
  borderRadius: '20px',
  background: '$black80',
  mb: '$16',

  '@mobile': {
    height: '$56',
    borderRadius: '10px',
    mb: '$10',
  },
});
