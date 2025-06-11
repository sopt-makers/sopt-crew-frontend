import { useDisplay } from '@hooks/useDisplay';
import {
  SIconBell,
  SIconChevronRight,
  SSelectedAlarm,
  SSettingButton,
} from '@components/page/list/AlarmSetting/SettingButton/SettingButton.css';

interface SettingButtonProps {
  onClick: () => void;
  selectedKeywords: string[];
}

const SettingButton = ({ onClick, selectedKeywords }: SettingButtonProps) => {
  const { isMobile, isTablet } = useDisplay();

  if (isMobile) {
    return (
      <SSettingButton onClick={onClick}>
        <SIconBell />
        키워드 알림 설정
      </SSettingButton>
    );
  }

  if (isTablet) {
    return (
      <SSettingButton onClick={onClick}>
        키워드 알림 설정
        <SIconBell />
      </SSettingButton>
    );
  }

  return (
    <SSettingButton onClick={onClick}>
      <SIconBell />
      키워드 알림 설정
      {selectedKeywords.length > 0 && <SSelectedAlarm>{selectedKeywords.join(', ')}</SSelectedAlarm>}
      <SIconChevronRight />
    </SSettingButton>
  );
};

export default SettingButton;
