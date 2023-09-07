import { Flex } from '@components/util/layout/Flex';
import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

const FeedItemSkeleton = () => {
  return (
    <SFeedItemSkeleton>
      <Flex align="center" justify="between" css={{ mb: '$17', '@tablet': { mb: '$12' } }}>
        <Flex align="center" justify="start">
          <SProfileImage />
          <SName />
        </Flex>
        <SMore />
      </Flex>

      <SContent />
      <SContent />

      <SBottom align="center" justify="between">
        <SComment />
        <SLike />
      </SBottom>
    </SFeedItemSkeleton>
  );
};

export default FeedItemSkeleton;

const SFeedItemSkeleton = styled(Box, {
  '@desktop': {
    padding: '$24 $20 $28 $20',
    background: '#171818',
    borderRadius: '12px',
  },

  '@tablet': {
    padding: '$20 0',
  },
});

const Item = styled(Box, {
  background: '$black60',
  borderRadius: '8px',
});

const SProfileImage = styled(Item, {
  width: '$32',
  height: '$32',
  borderRadius: '50%',
  mr: '$8',
});

const SName = styled(Item, {
  width: '$108',
  height: '$20',
});

const SMore = styled(Item, {
  width: '$32',
  height: '$32',
});

const SContent = styled(Item, {
  width: '100%',
  height: '$24',
  marginBottom: '8px',
});

const SBottom = styled(Flex, {
  mt: '$22',

  '@tablet': {
    '& > *': {
      background: '$black80',
    },
  },
});

const SComment = styled(Item, {
  width: '$85',
  height: '$20',
});

const SLike = styled(Item, {
  width: '$64',
  height: '$20',
});
