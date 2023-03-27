export const getResizedImage = (src: string, width: number) => {
  return `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=${width}&output=webp`;
};
