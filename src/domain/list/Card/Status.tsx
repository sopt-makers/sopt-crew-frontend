import { APPROVAL_STATUS } from '@constant/option';
import { Flex } from '@shared/util/layout/Flex';
import { styled } from 'stitches.config';

interface StatusProps {
  status: 0 | 1 | 2;
}

function Status({ status }: StatusProps) {
  return (
    <SLayout align="center">
      <SLabel>신청현황</SLabel>
      <SValue status={status}>{APPROVAL_STATUS[status]}</SValue>
    </SLayout>
  );
}

export default Status;
const SLayout = styled(Flex, {
  fontAg: '16_bold_100',
  marginTop: '24px',
  '@media (max-width: 768px)': {
    fontStyle: 'T6',
    marginTop: '12px',
  },
});
const SLabel = styled('div', {
  flexType: 'center',
  padding: '10px 12px',
  borderRadius: '71px',
  marginRight: '8px',
  backgroundColor: '$gray800',
  '@media (max-width: 768px)': {
    padding: '8px 10px',
    marginRight: '6px',
  },
});

const SValue = styled('span', {
  variants: {
    status: {
      0: {
        color: '$gray400',
      },
      1: {
        color: '$success',
      },
      2: {
        color: '$gray500',
      },
    },
  },
});
