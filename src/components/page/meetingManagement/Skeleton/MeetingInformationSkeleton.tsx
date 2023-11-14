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

const SMeetingInformationSkeleton = styled('div', {
  background: '$gray800',
  padding: '$32',
  borderRadius: '20px',
  mt: '$64',
  flexType: 'verticalCenter',

  '@tablet': {
    padding: '$0',
    borderRadius: '8px',
    mt: '$48',
    height: '$99',
  },
});

const SImage = styled('div', {
  background: '$gray600',
  borderRadius: '14px',
  width: '$167',
  height: '$109',

  '@tablet': {
    display: 'none',
  },
});

const STextArea = styled('div', {
  ml: '$24',

  '@tablet': {
    display: 'none',
  },
});

const SLine = styled('div', {
  height: '$27',
  background: '$gray600',
  borderRadius: '6px',
});

const SCategory = styled(SLine, {
  mb: '$10',
  width: '$58',
});

const STitle = styled(SLine, {
  width: '$380',
});
