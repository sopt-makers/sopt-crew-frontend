export const getResizedImage = (src: string, width: number) => {
  return `https://image-proxy-worker.makers.workers.dev?url=${encodeURIComponent(src)}&width=${width}`;
};
