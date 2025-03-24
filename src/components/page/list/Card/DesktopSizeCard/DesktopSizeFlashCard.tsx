import { MeetingListOfFilterResponse } from '@api/API_LEGACY/meeting';
import { useFlashByIdQuery } from '@api/flash/hook';
import DesktopSizeCard from '@components/page/list/Card/DesktopSizeCard';
import { FlashInformation } from '@components/page/list/Card/DesktopSizeCard/constant';

type DesktopSizeFlashCardProps = {
  meetingData: MeetingListOfFilterResponse['meetings'][number];
};
const DesktopSizeFlashCard = ({ meetingData }: DesktopSizeFlashCardProps) => {
  const { data: flashData } = useFlashByIdQuery({ meetingId: +meetingData.id });

  const detailInfo = flashData ? FlashInformation(flashData) : undefined;

  return <DesktopSizeCard meetingData={meetingData} />;
};

export default DesktopSizeFlashCard;
