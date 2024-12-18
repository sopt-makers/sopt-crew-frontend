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

const SItemSkeleton = styled('div', {
  height: '$80',
  borderRadius: '20px',
  background: '$gray800',
  mb: '$16',

  '@tablet': {
    height: '$56',
    borderRadius: '10px',
    mb: '$10',
  },
});
