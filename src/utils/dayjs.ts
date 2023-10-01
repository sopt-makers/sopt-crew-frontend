import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ko';
const localeList = dayjs.Ls;

dayjs.extend(relativeTime);
dayjs.locale('ko');
dayjs.extend(updateLocale);
dayjs.updateLocale('ko', {
  relativeTime: {
    ...localeList['ko'].relativeTime,
    s: '방금',
    h: '1시간',
    d: '1일',
  },
});

// NOTE: 댓글 작성 후 간헐적으로 작성 시간이 현재 시간보다 이후 시간으로 표기되는 이슈가 있어서 1초를 뺴준다.
export const fromNow = (date: string) => dayjs(date).subtract(1, 's').fromNow();
