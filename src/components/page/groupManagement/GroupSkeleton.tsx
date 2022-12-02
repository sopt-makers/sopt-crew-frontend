import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

const GroupSkeleton = () => {
  return (
    <SGroupSkeleton>
      <SImage />
      <STextArea>
        <SCategory />
        <STitle />
      </STextArea>
    </SGroupSkeleton>
  );
};

export default GroupSkeleton;

const SGroupSkeleton = styled(Box, {
  background: '$black80',
  padding: '$32',
  borderRadius: '20px',
  mt: '$64',
  flexType: 'verticalCenter',
});

const SImage = styled(Box, {
  background: '$black40',
  borderRadius: '14px',
  width: '$167',
  height: '$109',
});

const STextArea = styled(Box, {
  ml: '$24',
});

const SLine = styled(Box, {
  height: '$27',
  background: '$black40',
  borderRadius: '6px',
});

const SCategory = styled(SLine, {
  mb: '$10',
  width: '$58',
});

const STitle = styled(SLine, {
  width: '$380',
});
