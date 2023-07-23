import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

interface EmptyViewProps {
  isMember: boolean;
}

const EmptyView = ({ isMember }: EmptyViewProps) => {
  return (
    <SContent>
      <p>아직 작성된 피드가 없어요.</p>

      {isMember && (
        <>
          <p>첫번째 작성자가 되어볼까요?</p>
          <button>작성하러 가기</button>
        </>
      )}
    </SContent>
  );
};

export default EmptyView;

const SContent = styled(Box, {
  flexType: 'center',
  flexDirection: 'column',
  color: '$gray40',
  fontStyle: 'T1',

  '@tablet': {
    fontStyle: 'H4',
  },

  button: {
    background: '$black40',
    color: '$white',
    mt: '$48',
    padding: '16px 35.5px',
    borderRadius: '14px',
    fontStyle: 'H2',

    '@tablet': {
      mt: '$32',
      padding: '$10 $20',
      borderRadius: '8px',
      fontStyle: 'H4',
    },
  },
});
