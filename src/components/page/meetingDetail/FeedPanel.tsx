import { Box } from '@components/box/Box';
import React from 'react';
import { styled } from 'stitches.config';

const FeedPanel = () => {
  return (
    // TODO: empty view를 별도 컴포넌트로 추출해야 댐
    <SContainer>
      <SContent>
        <span>👀</span>
        <span>아직 작성된 피드가 없어요</span>
      </SContent>
    </SContainer>
  );
};

const SContainer = styled(Box, {
  flexType: 'center',
  height: '752px',
  color: '$gray40',
  fontStyle: 'T1',
  '@tablet': {
    height: '376px',
    fontStyle: 'H4',
  },
});
const SContent = styled(Box, {
  flexType: 'center',
  flexDirection: 'column',
  gap: '20px',
  '@tablet': {
    gap: '12px',
  },
});

export default FeedPanel;
