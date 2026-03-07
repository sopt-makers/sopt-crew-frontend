import type { mapData } from '@api/map/type';

export type MapTagType = NonNullable<mapData['mapTags']>[number];

export const getTagVariant = (tagName: MapTagType) => {
  switch (tagName) {
    case 'CAFE':
      return 'primary';
    case 'ETC':
      return 'default';
    case 'FOOD':
      return 'secondary';
    default:
      return 'primary';
  }
};
