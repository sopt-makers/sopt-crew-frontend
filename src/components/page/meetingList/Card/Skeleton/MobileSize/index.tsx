import CardType from './CardType';
import ListType from './ListType';

export interface MobileSizeSkeletonProps {
  mobileCardType: 'list' | 'card';
}

function MobileSizeSkeleton({ mobileCardType }: MobileSizeSkeletonProps) {
  switch (mobileCardType) {
    case 'list':
      return <ListType />;
    case 'card':
    default:
      return <CardType />;
  }
}

export default MobileSizeSkeleton;
