import {
  SIconBell,
  SIconChevronRight,
  SSelectedAlarm,
  SSettingButton,
} from '@domain/list/AlarmSetting/SettingButton/SettingButton.css';
import { useDisplay } from '@hook/useDisplay';

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
      </SSettingButton>
    );
  }

  if (isTablet) {
    return (
      <SSettingButton onClick={onClick}>
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
