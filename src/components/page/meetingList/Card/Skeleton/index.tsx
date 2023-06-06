import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import MobileSizeSkeleton, { MobileSizeSkeletonProps } from './MobileSize';

function CardSkeleton({ mobileType }: MobileSizeSkeletonProps) {
  return (
    <>
      <Box className="pc-only">
        <SLayout>
          <SBasicSkeleton
            css={{
              width: '380px',
              height: '260px',
              borderRadius: '12px',
              mb: '$16',
            }}
          />
          <SBasicSkeleton css={{ width: '58px', height: '27px', mb: '$12' }} />
          <SBasicSkeleton css={{ width: '380px', height: '27px', mb: '$46' }} />
          <SDetailInfoSkeleton css={{ width: '200px', height: '20px' }} />
          <SDetailInfoSkeleton css={{ width: '160px', height: '20px' }} />
          <SDetailInfoSkeleton css={{ width: '120px', height: '20px' }} />
        </SLayout>
      </Box>
      <Box className="mobile-only">
        <MobileSizeSkeleton mobileType={mobileType} />
      </Box>
    </>
  );
}

export default CardSkeleton;

export const SLayout = styled(Box, {
  width: '380px',
  '@tablet': {
    width: '162px',
  },
});

export const SBasicSkeleton = styled(Box, {
  backgroundColor: '$black60',
  borderRadius: '6px',
  '@tablet': {
    borderRadius: '5px',
  },
});

export const SDetailInfoSkeleton = styled(SBasicSkeleton, {
  backgroundColor: '$black80',
  mb: '$12',
});
