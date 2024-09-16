import CardType from './CardType';
import ListType from './ListType';
import { paths } from '@/__generated__/schema2';

export interface MobileSizeCardProps {
  meetingData: paths['/user/v2/meeting']['get']['responses']['200']['content']['application/json;charset=UTF-8']['meetings'][number];
  isAllParts: boolean;
  mobileType: 'list' | 'card';
}

function MobileSizeCard({ meetingData, isAllParts, mobileType }: MobileSizeCardProps) {
  switch (mobileType) {
    case 'list':
      return <ListType meetingData={meetingData} isAllParts={isAllParts} />;
    case 'card':
    default:
      return <CardType meetingData={meetingData} />;
  }
}

export default MobileSizeCard;
