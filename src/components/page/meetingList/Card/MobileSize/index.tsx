import { MeetingResponse } from '@api/meeting';
import CardType from './CardType';
import ListType from './ListType';

export interface MobileSizeCardProps {
  meetingData: MeetingResponse;
  isAllParts: boolean;
  mobileCardType: 'list' | 'card';
}

function MobileSizeCard({ meetingData, isAllParts, mobileCardType }: MobileSizeCardProps) {
  switch (mobileCardType) {
    case 'list':
      return <ListType meetingData={meetingData} isAllParts={isAllParts} />;
    case 'card':
    default:
      return <CardType meetingData={meetingData} />;
  }
}

export default MobileSizeCard;
