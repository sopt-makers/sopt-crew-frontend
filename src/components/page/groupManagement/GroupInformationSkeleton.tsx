import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

const GroupInformationSkeleton = () => {
  return (
    <SGroupInformationSkeleton>
      <SImage />
      <STextArea>
        <SCategory />
        <STitle />
      </STextArea>
    </SGroupInformationSkeleton>
  );
};

export default GroupInformationSkeleton;

const SGroupInformationSkeleton = styled(Box, {
  background: '$black80',
  padding: '$32',
  borderRadius: '20px',
  mt: '$64',
  flexType: 'verticalCenter',

  '@mobile': {
    background: '$black90',
    padding: '$0',
    borderRadius: '8px',
    mt: '$48',
    height: '$99',
  },
});

const SImage = styled(Box, {
  background: '$black40',
  borderRadius: '14px',
  width: '$167',
  height: '$109',

  '@mobile': {
    display: 'none',
  },
});

const STextArea = styled(Box, {
  ml: '$24',

  '@mobile': {
    display: 'none',
  },
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
