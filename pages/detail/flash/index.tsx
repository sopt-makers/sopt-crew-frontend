import { useFlashQueryOption } from '@api/flash/query';
import { GetFlash } from '@api/flash/type';
import CommonDetail from '@components/page/detail';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useRouter } from 'next/router';

dayjs.locale('ko');

const DetailFlashPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: flashData } = useQuery(useFlashQueryOption({ meetingId: +id }));

  return <CommonDetail detailData={flashData as GetFlash['response']} />;
};

export default DetailFlashPage;
