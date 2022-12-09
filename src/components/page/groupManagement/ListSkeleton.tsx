import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

const ListSkeleton = () => {
  return (
    <>
      <SFilterArea>
        <SFilter />
      </SFilterArea>
      {new Array(9).fill('').map((_, i) => (
        <SItemSkeleton key={i} />
      ))}
    </>
  );
};

export default ListSkeleton;

const SFilterArea = styled(Box, {
  display: 'flex',
  justifyContent: 'flex-end',
  mt: '$64',
});

const SFilter = styled(Box, {
  width: '$151',
  height: '$54',
  borderRadius: '14px',
  background: '$black80',
  mb: '$36',
});

const SItemSkeleton = styled(Box, {
  height: '$80',
  borderRadius: '20px',
  background: '$black80',
  mb: '$16',
});
