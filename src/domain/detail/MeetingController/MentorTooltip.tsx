import { styled } from 'stitches.config';
import QuestionMarkIcon from '@assets/svg/question_mark.svg?rect';

const MentorTooltip = () => {
  return (
    <STooltip>
      <STooltipTitle>
        멘토 구해요 <SQuestionMarkIcon />
      </STooltipTitle>
      <STooltipDescription>
        <p>이 모임의 멘토로 참여할 의향이 있으신가요?</p>
        <p>개설자 프로필에서 쪽지를 보내주세요:)</p>
      </STooltipDescription>
    </STooltip>
  );
};

export default MentorTooltip;

const STooltip = styled('div', {
  position: 'absolute',
  top: '$13',
  left: '176px',
  backgroundColor: '$gray600',
  width: 'max-content',
  padding: '$12 $14',
  borderRadius: '10px',
  fontAg: '14_medium_100',
  cursor: 'default',

  '@media (max-width: 768px)': {
    top: '-2px',
    left: '109px',
    fontAg: '12_medium_100',
  },

  '&:hover': {
    'div:last-child': {
      display: 'block',
    },
  },

  '&::after': {
    content: '',
    position: 'absolute',
    top: '$14',
    right: '100%',
    border: 'solid transparent',
    borderWidth: '3.5px 9px',
    borderRightColor: '$gray600',
  },
});

const STooltipTitle = styled('div', {
  flexType: 'verticalCenter',
});

const STooltipDescription = styled('div', {
  display: 'none',
  mt: '$14',
  lineHeight: '140%',

  '& > p': {
    '@media (max-width: 768px)': {
      fontSize: '$10',
      lineHeight: '150%',
    },
  },
});

const SQuestionMarkIcon = styled(QuestionMarkIcon, {
  marginLeft: '$10',

  '@media (max-width: 768px)': {
    ml: '$6',
    width: '$12',
    height: '$12',
  },
});
