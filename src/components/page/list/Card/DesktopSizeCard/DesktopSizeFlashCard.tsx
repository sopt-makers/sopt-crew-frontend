import { useFlashQueryOption } from '@api/flash/query';
import { MeetingData } from '@api/meeting/type';
import DesktopSizeCard from '@components/page/list/Card/DesktopSizeCard';
import { FlashInformation } from '@components/page/list/Card/DesktopSizeCard/constant';
import { useQuery } from '@tanstack/react-query';

type DesktopSizeFlashCardProps = {
  meetingData: MeetingData;
};
const DesktopSizeFlashCard = ({ meetingData }: DesktopSizeFlashCardProps) => {
  const { data: flashData } = useQuery(useFlashQueryOption({ meetingId: +meetingData.id }));

  if (!flashData) return null;

  const detailInfo = FlashInformation(flashData);
  const flashCount = `${flashData.approvedApplyCount} / ${flashData.minimumCapacity}~${flashData.maximumCapacity}명`;

  return <DesktopSizeCard meetingData={meetingData} isFlash flashDetailInfo={detailInfo} flashCount={flashCount} />;
};

export default DesktopSizeFlashCard;
