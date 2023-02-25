export function dateFormat(dateString: string) {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(5, 7);
  const day = dateString.slice(8, 10);
  return {
    'YYYY.MM.DD': `${year}.${month}.${day}`,
    'YY.MM.DD': `${year.slice(2, 4)}.${month}.${day}`,
  };
}

export function timeFormat(dateString: string) {
  const hour = dateString.slice(11, 13);
  const minute = dateString.slice(14, 16);
  const second = dateString.slice(17, 19);
  return {
    'HH:MM:SS': `${hour}:${minute}:${second}`,
  };
}
