import { mapData } from '@api/map/type';
import UtilityButton from '@common/button/UtilityButton';
import { Flex } from '@shared/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';
import { Button, Tag } from '@sopt-makers/ui';
import { styled } from 'stitches.config';
import { getTagVariant } from '../util';

interface DesktopMapCardProps {
  onDelete: () => void;
  onLinkClick: () => void;
  onRecommendClick: (mapId: number) => void;
  mapData?: mapData;
}
const DesktopMapCard = ({ onDelete, onLinkClick, onRecommendClick, mapData }: DesktopMapCardProps) => {
  return (
    <SContainer>
      <SPlaceNum>{mapData?.id}</SPlaceNum>
      <SContentWrapper>
        <Flex align="center" justify="between">
          <SPlaceWrapper>
            <STagWrapper>
              {mapData?.mapTags?.map((tag, index) => (
                <Tag key={index} size="md" variant={getTagVariant(tag)}>
                  {tag}
                </Tag>
              ))}
              <SPlaceName>{mapData?.placeName}</SPlaceName>
            </STagWrapper>
            <SSubwayStation>{mapData?.subwayStationNames?.join(', ')}</SSubwayStation>
          </SPlaceWrapper>

          <SRecommendButtonWrapper>
            <UtilityButton
              iconType="thumb"
              onClick={() => onRecommendClick(mapData?.id ?? 0)}
              isActive={mapData?.isRecommended}
              activeNumber={mapData?.recommendCount}
            >
              나도 추천해요
            </UtilityButton>
            <UtilityButton iconType="link" onClick={onLinkClick}>
              바로가기
            </UtilityButton>
          </SRecommendButtonWrapper>
        </Flex>

        <SDivider />

        <Flex align="center" justify="between">
          <Flex align="center" css={{ gap: '8px', flex: 1, minWidth: 0 }}>
            {mapData?.isCreator && (
              <Tag variant="default" size="md">
                내가 등록한 장소
              </Tag>
            )}
            <SInfoWrapper>
              <p>{mapData?.creatorName}</p>
              <SSeparator>∙</SSeparator>
              <SDescription>{mapData?.description}</SDescription>
            </SInfoWrapper>
          </Flex>

          {mapData?.isCreator && (
            <SEditButtonWrapper>
              {/* TODO: mds varient 추가시 옵션 변경 */}
              <Button size="sm" theme="black" rounded="lg" onClick={onDelete}>
                삭제
              </Button>
              <Button size="sm" rounded="lg">
                수정
              </Button>
            </SEditButtonWrapper>
          )}
        </Flex>
      </SContentWrapper>
    </SContainer>
  );
};

const SContainer = styled('div', {
  display: 'flex',
  gap: '12px',
  width: '100%',
  padding: '16px',
  borderRadius: '10px',
  border: '1px solid $gray800',
  '&:hover': {
    backgroundColor: '$gray900',
    border: '1px solid $gray600',
  },
});

const SPlaceNum = styled('p', {
  ...fontsObject.BODY_3_14_M,
});

const SContentWrapper = styled('div', {
  flex: 1,
  minWidth: 0,

  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const SPlaceWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const STagWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const SPlaceName = styled('p', {
  ...fontsObject.HEADING_6_18_B,
});

const SSubwayStation = styled('p', {
  ...fontsObject.BODY_3_14_R,
});

const SRecommendButtonWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const SDivider = styled('div', {
  width: '100%',
  borderRadius: '1px',
  height: '1px',
  backgroundColor: '$gray700',
});

const SInfoWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  ...fontsObject.BODY_3_14_L,
  flex: 1,
  minWidth: 0,
  '& p': {
    whiteSpace: 'nowrap',
    flexShrink: 0,
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

const SEditButtonWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  flexShrink: 0,
  marginLeft: '12px',
});

export default DesktopMapCard;
