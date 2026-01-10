export const getTagVariant = (tagName: string) => {
  switch (tagName) {
    case 'CAFE':
      return 'primary';
    case '기타':
      return 'secondary';
    case '음식점':
      return 'default';
    default:
      return 'primary';
  }
};
