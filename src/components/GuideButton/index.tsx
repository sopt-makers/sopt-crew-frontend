import { styled } from 'stitches.config';
import { useEffect, useState } from 'react';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { Tag } from '@sopt-makers/ui';
import { useDisplay } from '@hooks/useDisplay';
import { IconBell, IconChevronRight } from '@sopt-makers/icons';
import { useMutationInterestedKeywards } from '@api/post/hooks';
import AlarmSettingBottomSheet from '@components/page/list/Alarm/BottomSheet/AlarmSettingBottomSheet';
import AlarmSettingModal from '@components/page/list/Alarm/Modal/AlarmSettingModal';
import { useQueryGetInterestedKeywords } from '@api/user/hooks';
import { fontsObject } from '@sopt-makers/fonts';

const GuideButton = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);
  const { isDesktop, isTablet } = useDisplay();

  const { mutate: mutateUserInterested } = useMutationInterestedKeywards();
  const { data: userInterested } = useQueryGetInterestedKeywords();

  const [selectedAlarm, setSelectedAlarm] = useState<string[]>(() => userInterested?.keywords ?? []);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const isModalOpened = isSettingOpen && isDesktop;
  const isBottomSheetOpen = isSettingOpen && !isDesktop;

  const handleKeywordClick = (value: string) => {
    setSelectedAlarm(prev => {
      const next = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
      mutateUserInterested(next);
      return next;
    });
  };

  const handleReset = () => {
    setSelectedAlarm([]);
    mutateUserInterested([]);
  };

  const handleSettingClick = () => {
    setIsSettingOpen(true);
  };

  return (
    <>
      <Tooltip.Root isTooltipOpen={isTooltipOpen} onTooltipToggle={setIsTooltipOpen}>
        <Tooltip.Trigger>
          {isTablet ? (
            <SSettingButton onClick={handleSettingClick}>
              키워드 알림 설정
              <IconBell style={{ width: '20px', height: '20px' }} />
            </SSettingButton>
          ) : (
            <SSettingButton onClick={handleSettingClick}>
              <IconBell style={{ width: '20px', height: '20px' }} />
              키워드 알림 설정
              {selectedAlarm.length > 0 && <SSelectedAlarm>{selectedAlarm.join(', ')}</SSelectedAlarm>}
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
      {isModalOpened && (
        <AlarmSettingModal
          isOpen={isSettingOpen && isDesktop}
          close={() => setIsSettingOpen(false)}
          selectedAlarm={selectedAlarm}
          onKeywordClick={handleKeywordClick}
          onReset={handleReset}
        />
      )}
      {isBottomSheetOpen && (
        <AlarmSettingBottomSheet
          isOpen={isBottomSheetOpen}
          close={() => setIsSettingOpen(false)}
          selectedAlarm={selectedAlarm}
          onKeywordClick={handleKeywordClick}
        />
      )}
    </>
  );
};

export default GuideButton;

const SSelectedAlarm = styled('span', {
  ...fontsObject.BODY_3_14_M,
  color: '$blue400',
});

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
