export function dateFormat(dateString: string) {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(5, 7);
  const day = dateString.slice(8, 10);
  return {
    'YYYY.MM.DD': `${year}.${month}.${day}`,
    'YY.MM.DD': `${year.slice(2, 4)}.${month}.${day}`,
  };
}
