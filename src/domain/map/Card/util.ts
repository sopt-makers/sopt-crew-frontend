import type { mapData } from '@api/map/type';

export type MapTagType = NonNullable<mapData['mapTags']>[number];

export const getTagVariant = (tagName: MapTagType) => {
  switch (tagName) {
    case 'CAFE':
      return 'primary';
    case 'ETC':
      return 'secondary';
    case 'FOOD':
      return 'default';
    default:
      return 'primary';
  }
};
