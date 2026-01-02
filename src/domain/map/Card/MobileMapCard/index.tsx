import UtilityButton from '@common/button/UtilityButton';
import { fontsObject } from '@sopt-makers/fonts';
import { Button, Tag } from '@sopt-makers/ui';
import { styled } from 'stitches.config';

interface MobileMapCardProps {
  onDelete: () => void;
  onLinkClick: () => void;
  onRecommendClick: () => void;
}

const MobileMapCard = ({ onDelete, onLinkClick, onRecommendClick }: MobileMapCardProps) => {
  const isMine = true;

  return (
    <SContainer>
      <STagWrapper>
        <SPlaceNum>999</SPlaceNum>
        <Tag size="sm" variant="primary">
          카페
        </Tag>
        <SPlaceName>카페온더플랜</SPlaceName>
      </STagWrapper>
      <SSubwayStation>건대입구역, 어린이대공원역</SSubwayStation>

      <SInfoWrapper>
        <p>이길동</p>
        <SSeparator>∙</SSeparator>
        <SDescription>
          바다를 바라보며 천천히 걷다 보면 마음속 잔잔한 파도가 조용히 일렁인다. 이 순간 모든 걱정이 사라지고 숨이
          편안해진다. 정말 행복하다 웃으며.
        </SDescription>
      </SInfoWrapper>

      <SButtonWrapper>
        {isMine && (
          <SEditButtonWrapper>
            {/* TODO: mds varient 추가시 옵션 변경 */}
            <SCustomButton size="sm" rounded="lg" theme="black" onClick={onDelete}>
              삭제
            </SCustomButton>
            <SCustomButton size="sm" rounded="lg">
              수정
            </SCustomButton>
          </SEditButtonWrapper>
        )}
        <SRecommendButtonWrapper>
          <UtilityButton iconType="thumb" size="xs" onClick={onRecommendClick}>
            나도 추천해요
          </UtilityButton>
          <UtilityButton iconType="link" onClick={onLinkClick} size="xs">
            바로가기
          </UtilityButton>
        </SRecommendButtonWrapper>
      </SButtonWrapper>
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

const SEditButtonWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

const SButtonWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const SCustomButton = styled(Button, {
  width: '$45',
  height: '$32',
});

export default MobileMapCard;
