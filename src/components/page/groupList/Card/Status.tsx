import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { APPROVE_STATUS } from '@constants/option';
import { ApplicationStatusType } from 'src/api/user';
import { styled } from 'stitches.config';

interface StatusProps {
  status: ApplicationStatusType;
}

function Status({ status }: StatusProps) {
  return (
    <SLayout align="center">
      <SLabel>신청현황</SLabel>
      <span>{APPROVE_STATUS[status]}</span>
    </SLayout>
  );
}

export default Status;
const SLayout = styled(Flex, {
  fontAg: '16_bold_100',
  marginTop: '24px',
  '@mobile': {
    fontAg: '10_bold_100',
    marginTop: '12px',
  },
});
const SLabel = styled(Box, {
  flexType: 'center',
  padding: '10px 12px',
  border: '1px solid $gray100',
  borderRadius: '71px',
  marginRight: '8px',
  backgroundColor: '$black80',
  '@mobile': {
    padding: '8px 10px',
    marginRight: '6px',
  },
});
