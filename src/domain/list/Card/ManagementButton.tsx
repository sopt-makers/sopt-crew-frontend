import { ampli } from '@/ampli';
import ArrowMobileRight from '@assets/svg/arrow_mobile_right.svg';
import ArrowSmallRight from '@assets/svg/arrow_small_right.svg';
import { Flex } from '@shared/util/layout/Flex';
import Link from 'next/link';
import { styled } from 'stitches.config';

interface ManagementButtonProps {
  id: number;
}

function ManagementButton({ id }: ManagementButtonProps) {
  return (
    <Link href={`/mine/management?id=${id}`} passHref legacyBehavior>
      <SAnchor onClick={() => ampli.clickManageGroup()}>
        <SButton align="center" justify="between">
          <p>신청자 관리</p>
          <ArrowMobileRight className="mobile-only" />
          <ArrowSmallRight className="pc-only" />
        </SButton>
      </SAnchor>
    </Link>
  );
}

export default ManagementButton;

const SButton = styled(Flex, {
  width: '128px',
  padding: '12px 12px 13px 14px',
  borderRadius: '71px',
  fontAg: '16_bold_100',
  whiteSpace: 'nowrap',
  background: '$gray800',
  '@media (max-width: 768px)': {
    width: '91px',
    fontStyle: 'T6',
    padding: '6px 6px 6px 12px',
  },
});

const SAnchor = styled('a', {
  display: 'block',
  mt: '$16',
  width: 'fit-content',
});
