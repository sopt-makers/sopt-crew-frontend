import type { mapData } from '@api/map/type';

export type MapLinkKey = keyof Pick<mapData, 'naverLink' | 'kakaoLink'>;
