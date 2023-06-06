import { Box } from '@components/box/Box';
import { Divider } from '@components/util/Divider';
import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';
import { SBasicSkeleton, SDetailInfoSkeleton } from '..';

function ListType() {
  return (
    <SListLayout>
      <Flex align="center" css={{ mb: '$16' }}>
        <SBasicSkeleton
          css={{
            width: '120px',
            height: '82px',
            borderRadius: '$8',
          }}
        />
        <Box css={{ ml: '$12' }}>
          <SBasicSkeleton css={{ width: '190px', height: '14px', mb: '$8' }} />
          <SBasicSkeleton css={{ width: '150px', height: '12px', mb: '$10' }} />
          <Flex align="center">
            <SDetailInfoSkeleton css={{ width: '$20', height: '$20', borderRadius: '50%', mr: '$8', mb: '$0' }} />
            <SDetailInfoSkeleton css={{ width: '70px', height: '$18', mb: '$0' }} />
          </Flex>
        </Box>
      </Flex>
      <Divider />
    </SListLayout>
  );
}

export default ListType;

const SListLayout = styled(Box, {
  width: '100%',
});
