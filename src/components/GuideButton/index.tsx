import { styled } from 'stitches.config';
import { Tooltip } from '@components/ToolTip/Tooltip';
import { useState } from 'react';
import { Tag } from '@sopt-makers/ui';
import { useDisplay } from '@hooks/useDisplay';
import { IconBell, IconChevronRight } from '@sopt-makers/icons';
import AlarmSettingModal from '@components/modal/AlarmSettingModal';
import { useOverlay } from '@hooks/useOverlay/Index';

const GuideButton = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { isLaptop } = useDisplay();

  const overlay = useOverlay();

  const handleSettingClick = () => {
    overlay.open(({ isOpen, close }) => (
      <AlarmSettingModal
        isOpen={isOpen}
        close={close}
        onSuccess={() => {
          close();
        }}
      />
    ));
  };

  return (
    <Tooltip.Root isTooltipOpen={isOpen} onTooltipToggle={setIsOpen}>
      <Tooltip.Trigger>
        {isLaptop ? (
          <SSettingButton onClick={handleSettingClick}>
            키워드 알림 설정
            <IconBell style={{ width: '20px', height: '20px' }} />
          </SSettingButton>
        ) : (
          <SSettingButton onClick={handleSettingClick}>
            <IconBell style={{ width: '20px', height: '20px' }} />
            키워드 알림 설정
            <IconChevronRight style={{ width: '20px', height: '20px' }} />
          </SSettingButton>
        )}
      </Tooltip.Trigger>
      <Tooltip.Content
        TooltipClose={<Tooltip.Close />}
        title={'키워드 알림'}
        titleRightIcon={
          <Tag variant="primary" size="sm">
            NEW
          </Tag>
        }
      >
        관심 키워드 설정하고 <br />
        신규 모임 개설 알림을 받아보세요
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export default GuideButton;

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
