import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { StatusType } from 'src/api/meeting';
import { styled } from 'stitches.config';

interface StatusProps {
  status: StatusType;
}

function parseStatusToString(status: StatusType) {
  switch (status) {
    case 0:
      return '대기';
    case 1:
      return '승인';
    case 2:
      return '거절';
  }
}

function Status({ status }: StatusProps) {
  return (
    <Flex align="center" css={{ fontAg: '16_bold_100', marginTop: '24px' }}>
      <SLabel>신청현황</SLabel>
      <span>{parseStatusToString(status)}</span>
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
