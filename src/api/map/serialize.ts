import { FormType } from '@domain/map/Form/type';
import { PostSoptMap } from './type';

const TAG_MAP: Record<string, PostSoptMap['request']['tags'][number]> = {
  카페: 'CAFE',
  음식점: 'FOOD',
  기타: 'ETC',
};

export const serializeSoptMapData = (formData: FormType): PostSoptMap['request'] => {
  const stationNames = (formData.subwayStations ?? [])
    .map(station => station?.name?.trim())
    .filter((name): name is string => Boolean(name));

  const tagValue = TAG_MAP[formData.category?.value];
  const tags = tagValue ? [tagValue] : [];

  const naverLink = formData.links?.naverMapLink?.trim() || undefined;
  const kakaoLink = formData.links?.kakaoMapLink?.trim() || undefined;

  return {
    placeName: formData.name,
    stationNames,
    description: formData.description,
    tags,
    ...(naverLink ? { naverLink } : {}),
    ...(kakaoLink ? { kakaoLink } : {}),
  };
};
