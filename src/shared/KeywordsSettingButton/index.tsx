import { KeywordSettingOptionType } from '@api/user';
import { useMutationInterestedKeywords } from '@api/user/mutation';
import { useGetInterestedKeywordsQueryOption } from '@api/user/query';
import AlarmSettingBottomSheet from '@domain/list/Alarm/BottomSheet/AlarmSettingBottomSheet';
import AlarmSettingModal from '@domain/list/Alarm/Modal/AlarmSettingModal';
import SettingButton from '@domain/list/AlarmSetting/SettingButton/SettingButton';
import { TooltipContent } from '@domain/list/AlarmSetting/TooltipContent/TooltipContent';
import { useDisplay } from '@hook/useDisplay';
import { Tooltip } from '@shared/Tooltip/Tooltip';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const KeywordsSettingButton = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);
  const { isDesktop } = useDisplay();

  const { mutate: mutateUserInterested } = useMutationInterestedKeywords();
  const { data: userInterested } = useQuery(useGetInterestedKeywordsQueryOption());

  const [selectedAlarm, setSelectedAlarm] = useState<KeywordSettingOptionType[]>([]);
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
      setSelectedAlarm(userInterested.keywords as KeywordSettingOptionType[]);
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
