import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';
import ArrowSmallRight from '@assets/svg/arrow_small_right.svg';
import Link from 'next/link';

interface ManagementButtonProps {
  id: number;
}

function ManagementButton({ id }: ManagementButtonProps) {
  return (
    <Link href={`/mine/management?id=${id}`} passHref>
      <SAnchor>
        <SButton align="center" justify="between">
          <p>신청자 관리</p>
          <ArrowSmallRight />
        </SButton>
      </SAnchor>
    </Link>
  );
}

export default ManagementButton;

const SButton = styled(Flex, {
  width: '102px',
  padding: '12px 12px 13px 14px',
  border: '1px solid $gray100',
  borderRadius: '71px',
  fontAg: '16_bold_100',
  whiteSpace: 'nowrap',
  background: '$black80',
});

const SAnchor = styled('a', {
  display: 'block',
  mt: '$16',
});
