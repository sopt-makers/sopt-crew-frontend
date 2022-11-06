import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';
import ArrowSmallRight from '@assets/svg/arrow_small_right.svg';

function InvitationButton() {
  return (
    <SButton>
      <p>신청자 리스트</p>
      <ArrowSmallRight />
    </SButton>
  );
}

export default InvitationButton;

const SButton = styled('div', {
  width: '138px',
  padding: '10px 12px 10px 14px',
  border: '1px solid $gray100',
  borderRadius: '71px',
});
