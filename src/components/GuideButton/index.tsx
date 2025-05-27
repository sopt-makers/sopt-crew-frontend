import { styled } from 'stitches.config';
import { useState } from 'react';
import { ToolTip } from '@components/ToolTip/ToolTip';
import { Tag } from '@sopt-makers/ui';
import { IconArrowLeft, IconBell, IconChevronRight, IconXClose } from '@sopt-makers/icons';

const AlarmSettingButton = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <ToolTip.Root isTooltipOpen={isOpen} onTooltipToggle={setIsOpen}>
      <ToolTip.Trigger>
        <SSettingButton>
          <IconBell style={{ width: '20px', height: '20px' }} />
          키워드 알림 설정
          <IconChevronRight style={{ width: '20px', height: '20px' }} />
        </SSettingButton>
      </ToolTip.Trigger>
      <ToolTip.Content
        ToolTipClose={<ToolTip.Close icon={<IconXClose />} />}
        title={'키워드 알림'}
        titleRightIcon={
          <Tag variant="primary" size="sm">
            NEW
          </Tag>
        }
      >
        This is a tooltip
      </ToolTip.Content>
    </ToolTip.Root>
  );
};

export default AlarmSettingButton;

const SSettingButton = styled('a', {
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
