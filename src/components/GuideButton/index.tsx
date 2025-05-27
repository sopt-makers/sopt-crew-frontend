import { styled } from 'stitches.config';
import ArrowRightCircleIcon from '@assets/svg/arrow_right_circle.svg';

const GuideButton = () => {
  return (
    <SGuideButton
      target="_blank"
      href="https://www.notion.so/sopt-makers/eec46a4562ec48f0b0220153bb6ea68e"
      rel="noreferrer noopener"
    >
      모임 신청 가이드
      <ArrowRightCircleIcon />
    </SGuideButton>
  );

  // @TODO 다음 PR 에서 바로 적용 예정
  // const [isOpen, setIsOpen] = useState(true);
  // return (
  //   <ToolTip.Root isTooltipOpen={isOpen} onTooltipToggle={setIsOpen}>
  //     <ToolTip.Trigger>
  //       <SGuideButton>
  //         모임 신청 가이드
  //         <ArrowRightCircleIcon />
  //       </SGuideButton>
  //     </ToolTip.Trigger>
  //     <ToolTip.Content
  //       ToolTipClose={<ToolTip.Close icon={<IconXClose />} />}
  //       title={'키워드 알림'}
  //       titleRightIcon={
  //         <Tag variant="primary" size="sm">
  //           NEW
  //         </Tag>
  //       }
  //     >
  //       This is a tooltip
  //     </ToolTip.Content>
  //   </ToolTip.Root>
  // );
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
  '@media (max-width: 359px)': {
    display: 'none',
  },
});
