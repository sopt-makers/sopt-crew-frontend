import { MeetingData } from '@api/meeting/type';
import CardType from './CardType';
import ListType from './ListType';

export interface MobileSizeCardProps {
  meetingData: MeetingData;
  mobileType: 'list' | 'card';
}

function MobileSizeCard({ meetingData, mobileType }: Omit<MobileSizeCardProps, 'isAllParts'>) {
  switch (mobileType) {
    case 'list':
      return <ListType meetingData={meetingData} />;
    case 'card':
    default:
      return <CardType meetingData={meetingData} />;
  }
}

export default MobileSizeCard;
