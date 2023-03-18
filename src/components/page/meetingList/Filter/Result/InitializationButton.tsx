import { Flex } from '@components/util/layout/Flex';
import ResetIcon from '@assets/svg/reset.svg?rect';
import { styled } from 'stitches.config';
import { useRouter } from 'next/router';
interface InitializationButtonProp {
  withText?: boolean;
  size?: number;
}
function InitializationButton({ withText = true, size = 16 }: InitializationButtonProp) {
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
      <ResetIcon width={size} height={size} />
      {withText && <InitializationText>초기화</InitializationText>}
    </Flex>
  );
}

export default InitializationButton;

const InitializationText = styled('span', {
  fontAg: '18_medium_100',
  color: '$white',
  ml: '$6',
  '@mobile': {
    display: 'none',
  },
});
