import CardType from './CardType';
import ListType from './ListType';

export interface MobileSizeSkeletonProps {
  mobileType: 'list' | 'card';
}

function MobileSizeSkeleton({ mobileType }: MobileSizeSkeletonProps) {
  switch (mobileType) {
    case 'list':
      return <ListType />;
    case 'card':
    default:
      return <CardType />;
  }
}

export default MobileSizeSkeleton;
