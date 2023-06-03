import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { APPROVAL_STATUS } from '@constants/option';
import { ApplicationStatusType } from '@api/user';
import { styled } from 'stitches.config';

interface StatusProps {
  status: ApplicationStatusType;
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
  '@tablet': {
    fontStyle: 'T6',
    marginTop: '12px',
  },
});
const SLabel = styled(Box, {
  flexType: 'center',
  padding: '10px 12px',
  borderRadius: '71px',
  marginRight: '8px',
  backgroundColor: '$black80',
  '@tablet': {
    padding: '8px 10px',
    marginRight: '6px',
  },
});

const SValue = styled('span', {
  variants: {
    status: {
      0: {
        color: '$purple40',
      },
      1: {
        color: '$purple100',
      },
      2: {
        color: '$gray80',
      },
    },
  },
});
