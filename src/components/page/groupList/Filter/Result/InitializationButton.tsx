import { Flex } from '@components/util/layout/Flex';
import ResetIcon from '@assets/svg/reset.svg';
import { styled } from 'stitches.config';
import { useRouter } from 'next/router';

function InitializationButton() {
  const router = useRouter();
  const onClickInitialization = () => {
    router.push(
      {
        query: {
          page: 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <Flex
      as="button"
      css={{
        '@mobile': {
          alignSelf: 'start',
          marginTop: '16px',
        },
      }}
      onClick={onClickInitialization}
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
  '@mobile': {
    display: 'none',
  },
});
