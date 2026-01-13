import { mapData } from '@api/map/type';
import UtilityButton from '@common/button/UtilityButton';
import { Flex } from '@shared/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';
import { IconDotsVertical } from '@sopt-makers/icons';
import { Tag } from '@sopt-makers/ui';
import { styled } from 'stitches.config';
import { getTagVariant } from '../util';

interface MobileMapCardProps {
  onDelete: () => void;
  onLinkClick: () => void;
  onRecommendClick: (mapId: number) => void;
  mapData?: mapData;
}

const MobileMapCard = ({ onDelete, onLinkClick, onRecommendClick, mapData }: MobileMapCardProps) => {
  return (
    <SContainer>
      <Flex align="center" justify="between">
        <STagWrapper>
          <SPlaceNum>{mapData?.id}</SPlaceNum>
          {mapData?.mapTags?.map((tag, index) => (
            <Tag key={index} size="sm" variant={getTagVariant(tag)}>
              {tag}
            </Tag>
          ))}

          <SPlaceName>{mapData?.placeName}</SPlaceName>
        </STagWrapper>
        {mapData?.isCreator && <SMoreButton />}
      </Flex>
      <SSubwayStation>{mapData?.subwayStationNames?.join(', ')}</SSubwayStation>
      <SInfoWrapper>
        <p>{mapData?.creatorName}</p>
        <SSeparator>∙</SSeparator>
        <SDescription>{mapData?.description}</SDescription>
      </SInfoWrapper>

      <SRecommendButtonWrapper>
        <UtilityButton
          iconType="thumb"
          size="xs"
          onClick={() => onRecommendClick(mapData?.id ?? 0)}
          isActive={mapData?.isRecommended}
          activeNumber={mapData?.recommendCount}
        >
          나도 추천해요
        </UtilityButton>
        <UtilityButton iconType="link" onClick={onLinkClick} size="xs">
          바로가기
        </UtilityButton>
      </SRecommendButtonWrapper>
    </SContainer>
  );
};

const SContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  padding: '16px',
  borderRadius: '10px',
  border: '1px solid $gray800',

  variants: {
    isClicked: {
      true: {
        backgroundColor: '$gray900',
      },
    },
  },
});

const SPlaceNum = styled('p', {
  ...fontsObject.TITLE_7_14_SB,
});

const STagWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const SPlaceName = styled('p', {
  ...fontsObject.HEADING_7_16_B,
});

const SSubwayStation = styled('p', {
  ...fontsObject.BODY_3_14_R,
});

const SRecommendButtonWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginLeft: 'auto',
});

const SInfoWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  width: '100%',
  padding: '$10 $16',
  borderRadius: '8px',
  ...fontsObject.BODY_4_13_M,

  '& p': {
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },

  backgroundColor: '$gray900',

  variants: {
    isClicked: {
      true: {
        backgroundColor: 'transparent',
      },
    },
  },
});

const SSeparator = styled('span', {
  color: '$gray300',
  flexShrink: 0,
});

const SDescription = styled('p', {
  color: '$gray300',

  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  flex: 1,
  minWidth: 0,
});

const SMoreButton = styled(IconDotsVertical, {
  width: '$24',
  height: '$24',
  cursor: 'pointer',
});

export default MobileMapCard;
