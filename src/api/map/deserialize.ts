import { FormType } from '@domain/map/Form/type';
import { GetMapDetail } from './type';

const TAG_LABEL_MAP: Record<string, string> = {
  CAFE: '카페',
  FOOD: '음식점',
  ETC: '기타',
};

export const deserializeSoptMapData = (data: GetMapDetail['response']): FormType => {
  const code = data.tags?.[0];
  const label = code ? TAG_LABEL_MAP[code] ?? '' : '';

  return {
    name: data.placeName ?? '',
    subwayStations: data.stationNames?.map(station => ({ name: station })) ?? [],
    description: data.description ?? '',
    category: {
      label,
      value: label,
    },
    links: {
      naverMapLink: data.naverLink ?? '',
      kakaoMapLink: data.kakaoLink ?? '',
    },
  };
};
