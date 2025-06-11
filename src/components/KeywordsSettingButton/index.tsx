import { KeywordSettingOptionType } from '@api/user';
import { useMutationInterestedKeywords, useQueryGetInterestedKeywords } from '@api/user/hooks';
import AlarmSettingBottomSheet from '@components/page/list/Alarm/BottomSheet/AlarmSettingBottomSheet';
import AlarmSettingModal from '@components/page/list/Alarm/Modal/AlarmSettingModal';
import { Tooltip } from '@components/Tooltip/Tooltip';
import { useDisplay } from '@hooks/useDisplay';
import { useEffect, useState } from 'react';
import { TooltipContent } from '@components/page/list/AlarmSetting/TooltipContent/TooltipContent';
import SettingButton from '@components/page/list/AlarmSetting/SettingButton/SettingButton';

const KeywordsSettingButton = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);
  const { isDesktop } = useDisplay();

  const { mutate: mutateUserInterested } = useMutationInterestedKeywords();
  const { data: userInterested } = useQueryGetInterestedKeywords();

  const [selectedAlarm, setSelectedAlarm] = useState<KeywordSettingOptionType[]>(() => userInterested?.keywords ?? []);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const handleKeywordClick = (value: KeywordSettingOptionType) => {
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

  useEffect(() => {
    // 데이터가 로드 된 시점에 "이미 선택된 키워드" 세팅
    if (userInterested?.keywords) {
      setSelectedAlarm(userInterested.keywords);
    }
  }, [userInterested]);

  return (
    <>
      <Tooltip.Root isTooltipOpen={isTooltipOpen} onTooltipToggle={setIsTooltipOpen}>
        <Tooltip.Trigger>
          <SettingButton onClick={() => setIsSettingOpen(true)} selectedKeywords={selectedAlarm} />
        </Tooltip.Trigger>
        <TooltipContent />
      </Tooltip.Root>
      <AlarmSettingModal
        isOpen={isSettingOpen && isDesktop}
        close={() => setIsSettingOpen(false)}
        selectedAlarm={selectedAlarm}
        onKeywordClick={handleKeywordClick}
        onReset={handleReset}
      />
      <AlarmSettingBottomSheet
        isOpen={isSettingOpen && !isDesktop}
        close={() => setIsSettingOpen(false)}
        selectedAlarm={selectedAlarm}
        onKeywordClick={handleKeywordClick}
      />
    </>
  );
};

export default KeywordsSettingButton;
