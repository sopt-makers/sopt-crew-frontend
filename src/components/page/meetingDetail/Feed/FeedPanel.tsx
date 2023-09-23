import { Box } from '@components/box/Box';
import React from 'react';
import { styled } from 'stitches.config';
import EmptyView from './EmptyView';

// interface FeedPanelProps {
//   isMember: boolean;
// }

const FeedPanel = () => {
  return (
    <SContainer>
      <EmptyView />
    </SContainer>
  );
};

export default FeedPanel;

const SContainer = styled(Box, {
  flexType: 'center',
  height: '752px',

  '@tablet': {
    minHeight: '376px',
    height: '100%',
  },
});
