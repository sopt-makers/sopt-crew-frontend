import { Flex } from '@components/util/layout/Flex';
import { useCategoryParams, useStatusParams } from '@hooks/queryString/custom';
import ResetIcon from '@assets/svg/reset.svg';
import { styled } from 'stitches.config';

function InitializationButton() {
  const { deleteKey: resetCategory } = useCategoryParams();
  const { deleteKey: resetStatus } = useStatusParams();
  return (
    <Flex
      as="button"
      onClick={() => {
        resetCategory(), resetStatus();
      }}
    >
      <ResetIcon />
      <InitializationText>초기화</InitializationText>
    </Flex>
  );
}

export default InitializationButton;

const InitializationText = styled('span', {
  //   fontAg: '18_medium_100',
  color: '$white',
  fontSize: '18px',
  fontWeight: '$medium',
  marginLeft: '6px',
});
