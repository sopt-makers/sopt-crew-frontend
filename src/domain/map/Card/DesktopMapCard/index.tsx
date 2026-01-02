import { Flex } from '@shared/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';
import { Button, Tag } from '@sopt-makers/ui';
import { styled } from 'stitches.config';

interface DesktopMapCardProps {
  onDelete: () => void;
}
const DesktopMapCard = ({ onDelete }: DesktopMapCardProps) => {
  const isMine = true;

  return (
    <SContainer>
      <SPlaceNum>999</SPlaceNum>
      <SContentWrapper>
        <Flex align="center" justify="between">
          <SPlaceWrapper>
            <STagWrapper>
              <Tag size="md" variant="primary">
                카페
              </Tag>
              <SPlaceName>카페온더플랜</SPlaceName>
            </STagWrapper>
            <SSubwayStation>건대입구역, 어린이대공원역</SSubwayStation>
          </SPlaceWrapper>

          <SRecommendButtonWrapper>
            <Button variant="outlined">나도 추천해요</Button>
            <Button>바로가기</Button>
          </SRecommendButtonWrapper>
        </Flex>

        <SDivider />

        <Flex align="center" justify="between">
          <SInfoWrapper>
            <p>이길동</p>
            <SSeparator>∙</SSeparator>
            <SDescription>
              바다를 바라보며 천천히 걷다 보면 마음속 잔잔한 파도가 조용히 일렁인다. 이 순간 모든 걱정이 사라지고 숨이
              편안해진다. 정말 행복하다 웃으며.
            </SDescription>
          </SInfoWrapper>

          {isMine && (
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
