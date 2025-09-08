import { useMeetingQueryOption } from '@api/meeting/query';
import { GetMeeting } from '@api/meeting/type';
import CommonDetail from '@domain/detail';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useRouter } from 'next/router';

dayjs.locale('ko');

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: meetingData } = useQuery(useMeetingQueryOption({ meetingId: Number(id) }));

  if (meetingData?.category === '번쩍') router.replace(`/detail/flash?id=${id}`);

  return <CommonDetail detailData={meetingData as GetMeeting['response']} />;
};

export default DetailPage;
