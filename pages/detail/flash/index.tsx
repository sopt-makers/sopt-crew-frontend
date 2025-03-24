import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useFlashByIdQuery } from '@api/flash/hook';
import CommonDetail from '@components/page/detail';
import { GetFlashByIdResponse } from '@api/flash';

dayjs.locale('ko');

const DetailFlashPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: flashData } = useFlashByIdQuery({ meetingId: +id });

  return <CommonDetail detailData={flashData as GetFlashByIdResponse} />;
};

export default DetailFlashPage;
