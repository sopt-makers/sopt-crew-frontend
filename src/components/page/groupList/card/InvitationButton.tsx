import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';
import ArrowSmallRight from '@assets/svg/arrow_small_right.svg';
import Link from 'next/link';

interface InvitationButtonProps {
  id: number;
}

function InvitationButton({ id }: InvitationButtonProps) {
  return (
    <Link href={`/invitation?id=${id}`} passHref>
      <SAnchor>
        <SButton align="center" justify="between">
          <p>신청자 리스트</p>
          <ArrowSmallRight />
        </SButton>
      </SAnchor>
    </Link>
  );
}

export default InvitationButton;

const SButton = styled(Flex, {
  width: '118px',
  padding: '10px 12px 10px 14px',
  border: '1px solid $gray100',
  borderRadius: '71px',
  fontAg: '18_bold_100',
});

const SAnchor = styled('a', {
  display: 'block',
  marginTop: '24px',
});
