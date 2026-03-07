import ArrowRightCircleIcon from '@assets/svg/arrow_right_circle.svg';
import { useDisplay } from '@hook/useDisplay';
import { IconInfoCircle } from '@sopt-makers/icons';
import { styled } from 'stitches.config';

const GuideButton = () => {
  const { isTablet } = useDisplay();
  return (
    <SGuideButton
      target="_blank"
      href="https://www.notion.so/sopt-makers/eec46a4562ec48f0b0220153bb6ea68e"
      rel="noreferrer noopener"
    >
      {isTablet ? (
        <InfoIcon />
      ) : (
        <>
          모임 신청 가이드
          <ArrowRightCircleIcon />
        </>
      )}
    </SGuideButton>
  );
};
export default GuideButton;

const SGuideButton = styled('a', {
  flexType: 'verticalCenter',
  gap: '$8',
  color: '$gray10',
  padding: '$8 $6 0 0',
  fontAg: '18_semibold_100',

  '@tablet': {
    padding: '0',
    fontAg: '14_semibold_100',
  },

  path: {
    stroke: '$gray10',
  },
  '@media (max-width: 320px)': {
    display: 'none',
  },
});

const InfoIcon = styled(IconInfoCircle, {
  width: '24px',
  height: '24px',
  '& path': {
    stroke: '$gray100',
  },
});
