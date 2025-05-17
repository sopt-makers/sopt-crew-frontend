import { GetMeetingResponse } from '@api/API_LEGACY/meeting';
import { useQueryGetMeeting } from '@api/API_LEGACY/meeting/hooks';
import CommonDetail from '@components/page/detail';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useRouter } from 'next/router';

dayjs.locale('ko');

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: meetingData } = useQueryGetMeeting({ params: { id } });

  if (meetingData?.category === '번쩍') router.replace(`/detail/flash?id=${id}`);

  return <CommonDetail detailData={meetingData as GetMeetingResponse} />;
};

export default DetailPage;
