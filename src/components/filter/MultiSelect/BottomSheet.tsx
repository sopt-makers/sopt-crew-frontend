import { Flex } from '@components/util/layout/Flex';
import { PropsWithChildren, ReactNode } from 'react';
import { styled } from 'stitches.config';
interface SelectBottomSheetProps {
  label: string;
  isVisible: boolean;
  handleClose?: () => void;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
}
function SelectBottomSheet({
  children,
  label,
  isVisible,
  handleClose,
  headerLeft,
  headerRight,
}: PropsWithChildren<SelectBottomSheetProps>) {
  return (
    <SLayout direction="column" justify="between" isVisible={isVisible}>
      <SelectSection>
        <Flex css={{ px: '$28' }} align="center" justify="between">
          <div>{headerLeft}</div>
          <SLabel as="p">{label}</SLabel>
          <div>{headerRight}</div>
        </Flex>
        <SListItemWrapper>{children}</SListItemWrapper>
      </SelectSection>
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
      true: { height: 'auto', minHeight: '306px' },
      false: { height: '0px' },
    },
  },
  transition: 'height 0.5s',
  color: '#fff',
  display: 'none',
  '@tablet': {
    display: 'flex',
  },
});

const SelectSection = styled('div', {
  width: '100%',
});

const SLabel = styled('div', {
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
  backgroundColor: '$white100',
  color: '$black100',
  fontAg: '16_bold_100',
  textAlign: 'center',
});
