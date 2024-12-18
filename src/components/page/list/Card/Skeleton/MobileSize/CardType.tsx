import { SBasicSkeleton, SDetailInfoSkeleton, SLayout } from '..';

function CardType() {
  return (
    <SLayout>
      <SBasicSkeleton
        css={{
          width: '162px',
          height: '111px',
          borderRadius: '8px',
          mb: '$10',
        }}
      />
      <SBasicSkeleton css={{ width: '162px', height: '16px', mb: '$6' }} />
      <SBasicSkeleton css={{ width: '120px', height: '16px', mb: '$10' }} />
      <SDetailInfoSkeleton css={{ width: '70px', height: '12px' }} />
    </SLayout>
  );
}

export default CardType;
