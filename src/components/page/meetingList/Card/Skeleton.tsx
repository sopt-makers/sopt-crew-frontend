import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

function CardSkeleton() {
  return (
    <SLayout>
      <Box className="pc-only">
        <BasicSkeleton
          css={{
            width: '380px',
            height: '260px',
            borderRadius: '12px',
            mb: '$16',
          }}
        />
        <BasicSkeleton css={{ width: '58px', height: '27px', mb: '$12' }} />
        <BasicSkeleton css={{ width: '380px', height: '27px', mb: '$46' }} />
        <DetailInfoSkeleton css={{ width: '200px', height: '20px' }} />
        <DetailInfoSkeleton css={{ width: '160px', height: '20px' }} />
        <DetailInfoSkeleton css={{ width: '120px', height: '20px' }} />
      </Box>
      <Box className="mobile-only">
        <BasicSkeleton
          css={{
            width: '162px',
            height: '111px',
            borderRadius: '8px',
            mb: '$10',
          }}
        />
        <BasicSkeleton css={{ width: '162px', height: '16px', mb: '$6' }} />
        <BasicSkeleton css={{ width: '120px', height: '16px', mb: '$10' }} />
        <DetailInfoSkeleton css={{ width: '70px', height: '12px' }} />
      </Box>
    </SLayout>
  );
}

export default CardSkeleton;

const SLayout = styled(Box, {
  width: '380px',
  '@mobile': {
    width: '162px',
  },
});

const BasicSkeleton = styled(Box, {
  backgroundColor: '$black60',
  borderRadius: '6px',
  '@mobile': {
    borderRadius: '5px',
  },
});

const DetailInfoSkeleton = styled(BasicSkeleton, {
  backgroundColor: '$black80',
  mb: '$12',
});
