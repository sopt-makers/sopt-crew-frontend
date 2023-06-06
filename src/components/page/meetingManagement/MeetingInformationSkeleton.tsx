import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

const MeetingInformationSkeleton = () => {
  return (
    <SMeetingInformationSkeleton>
      <SImage />
      <STextArea>
        <SCategory />
        <STitle />
      </STextArea>
    </SMeetingInformationSkeleton>
  );
};

export default MeetingInformationSkeleton;

const SMeetingInformationSkeleton = styled(Box, {
  background: '$black80',
  padding: '$32',
  borderRadius: '20px',
  mt: '$64',
  flexType: 'verticalCenter',

  '@tablet': {
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

  '@tablet': {
    display: 'none',
  },
});

const STextArea = styled(Box, {
  ml: '$24',

  '@tablet': {
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
