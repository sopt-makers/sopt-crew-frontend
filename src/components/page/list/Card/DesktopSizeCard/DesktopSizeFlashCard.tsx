import { MeetingListResponse } from '@api/API_LEGACY/meeting';
import { useFlashByIdQuery } from '@api/flash/hook';
import DesktopSizeCard from '@components/page/list/Card/DesktopSizeCard';
import { FlashInformation } from '@components/page/list/Card/DesktopSizeCard/constant';

type DesktopSizeFlashCardProps = {
  meetingData: MeetingListResponse['meetings'][number];
};
const DesktopSizeFlashCard = ({ meetingData }: DesktopSizeFlashCardProps) => {
  const { data: flashData } = useFlashByIdQuery({ meetingId: +meetingData.id });

  if (!flashData) return null;

  const detailInfo = FlashInformation(flashData);
  const flashCount = `${flashData.approvedApplyCount} / ${flashData.minimumCapacity}~${flashData.maximumCapacity}명`;

  return <DesktopSizeCard meetingData={meetingData} isFlash flashDetailInfo={detailInfo} flashCount={flashCount} />;
};

export default DesktopSizeFlashCard;
