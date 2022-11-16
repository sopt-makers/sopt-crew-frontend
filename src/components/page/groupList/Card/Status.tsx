import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { APPLY_STATUS } from '@constants/status';
import { StatusType } from 'src/api/meeting';
import { styled } from 'stitches.config';

interface StatusProps {
  status: StatusType;
}

function Status({ status }: StatusProps) {
  return (
    <Flex align="center" css={{ fontAg: '16_bold_100', marginTop: '24px' }}>
      <SLabel>신청현황</SLabel>
      <span>{APPLY_STATUS[status]}</span>
    </Flex>
  );
}

export default Status;

const SLabel = styled(Box, {
  flexType: 'center',
  width: '85px',
  padding: '10px 12px',
  border: '1px solid $gray100',
  borderRadius: '71px',
  marginRight: '8px',
});
