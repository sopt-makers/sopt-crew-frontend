import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { PropsWithChildren } from 'react';
import { styled } from 'stitches.config';
interface SelectBottomSheetProps {
  label: string;
  isVisible: boolean;
  handleClose?: () => void;
}
function SelectBottomSheet({ children, label, isVisible, handleClose }: PropsWithChildren<SelectBottomSheetProps>) {
  return (
    <SLayout direction="column" justify="between" isVisible={isVisible}>
      <Box css={{ width: '100%' }}>
        <SLabel as="p">{label}</SLabel>
        <SListItemWrapper>{children}</SListItemWrapper>
      </Box>
      <SCloseButton onClick={handleClose}>확인</SCloseButton>
    </SLayout>
  );
}

export default SelectBottomSheet;

const SLayout = styled(Flex, {
  position: 'fixed',
  bottom: 0,
  right: 0,
  left: 0,
  width: '100vw',
  height: '0px',
  backgroundColor: '$black80',
  boxShadow: '4px 4px 40px $black80',
  borderRadius: '20px 20px 0px 0px',
  zIndex: '$2',
  variants: {
    isVisible: {
      true: { height: '306px' },
      false: { height: '0px' },
    },
  },
  transition: 'height 0.5s',
  color: '#fff',
  display: 'none',
  '@mobile': {
    display: 'flex',
  },
});

const SLabel = styled(Box, {
  my: '$24',
  textAlign: 'center',
  fontAg: '16_bold_100',
});

const SListItemWrapper = styled('ul', {
  '& li': {
    height: '48px',
    px: '$16',
    borderBottom: '1px solid $black40',
  },
  '& li:last-child': {
    borderBottom: 'none',
  },
});

const SCloseButton = styled('button', {
  width: '100%',
  height: '50px',
  backgroundColor: '$purple100',
  color: '$white',
  fontAg: '16_bold_100',
  textAlign: 'center',
});
