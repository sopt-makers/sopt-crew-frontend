import { MeetingResponse } from '@api/meeting';
import CardType from './CardType';
import ListType from './ListType';

export interface MobileSizeCardProps {
  meetingData: MeetingResponse;
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
