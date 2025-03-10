import { useQueryGetMeeting } from '@api/API_LEGACY/meeting/hooks';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import CommonDetail from '@components/page/detail';
import { GetMeetingResponse } from '@api/API_LEGACY/meeting';

dayjs.locale('ko');

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: meetingData } = useQueryGetMeeting({ params: { id } });

  return <CommonDetail detailData={meetingData as GetMeetingResponse} />;
};

export default DetailPage;
