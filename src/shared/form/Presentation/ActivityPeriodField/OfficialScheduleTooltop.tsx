import BubblePointIcon from '@assets/svg/bubble_point.svg';
import { fontsObject } from '@sopt-makers/fonts';
import { IconAlertCircle } from '@sopt-makers/icons';
import { DialogOptionType, useDialog } from '@sopt-makers/ui';
import { useEffect, useRef, useState } from 'react';
import { styled } from 'stitches.config';

const schedule: React.ReactNode = (
  <>
    • 1~8차 세미나 <br />
    &nbsp;&nbsp;&nbsp;2025.04.05 ~ 2025.06.21 <br />
    • 솝커톤 <br />
    &nbsp;&nbsp;&nbsp;2025.05.17 ~ 2025.05.18 <br />
    • 네트워킹 행사 <br />
    &nbsp;&nbsp;&nbsp;2025.05.31 <br />
    • 기획 경선 <br />
    &nbsp;&nbsp;&nbsp;2025.06.07 <br />
    • 앱잼 <br />
    &nbsp;&nbsp;&nbsp;2025.06.14 ~ 2025.07.19 <br />
    • 종무식 <br />
    &nbsp;&nbsp;&nbsp;2025.07.26
  </>
);

const soptScheduleDialogOption: DialogOptionType = {
  title: 'SOPT 공식 일정',
  description: schedule,
  type: 'default',
};

const OfficialScheduleTooltip = () => {
  const [isSoptScheduleOpen, setIsSoptScheduleOpen] = useState(false);
  const soptScheduleRef = useRef<HTMLDivElement | null>(null);
  const { open } = useDialog();

  const handleSoptScheduleOpen = (isOpen: boolean) => {
    window.innerWidth <= 768 ? open(soptScheduleDialogOption) : setIsSoptScheduleOpen(isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (soptScheduleRef.current && !soptScheduleRef.current.contains(event.target as Node)) {
        setIsSoptScheduleOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [soptScheduleRef]);

  return (
    <div
      ref={soptScheduleRef}
      style={{ display: 'flex', gap: '4px', position: 'relative', zIndex: 1 }}
      onMouseEnter={() => handleSoptScheduleOpen(true)}
      onMouseLeave={() => handleSoptScheduleOpen(false)}
    >
      <div style={{ display: 'flex', gap: '4px', marginRight: '16px' }}>
        <SoptNotice>SOPT 공식 일정 확인하기</SoptNotice>
        <IconAlertCircle style={{ width: '16px', height: '16px', color: 'gray', cursor: 'pointer' }} />
      </div>
      {isSoptScheduleOpen && (
        <ToolTipDiv>
          <PointDiv>
            <BubblePointIcon />
          </PointDiv>
          <TextDiv>
            <TextStyle>• 1~8차 세미나: 2025.10.11 ~ 2025.12.27</TextStyle>
            <TextStyle>• 솝커톤: 2025.11.22 ~ 2025.11.23</TextStyle>
            <TextStyle>• 네트워킹 행사: 2025.12.06</TextStyle>
            <TextStyle>• 기획 경선: 2025.12.13</TextStyle>
            <TextStyle>• 앱잼: 2025.12.20 ~ 2025.01.24</TextStyle>
            <TextStyle>• 종무식: 2025.01.31</TextStyle>
          </TextDiv>
        </ToolTipDiv>
      )}
    </div>
  );
};

export default OfficialScheduleTooltip;

const SoptNotice = styled('span', {
  cursor: 'pointer',
  display: 'inline-block',
  minWidth: '$125',
  ...fontsObject.LABEL_4_12_SB,
  color: '$gray300',
});

const ToolTipDiv = styled('div', {
  width: '252px',
  height: '162px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',

  position: 'absolute',
  top: '$20',
  right: '$0',
  isolate: 'isolation',
});

const PointDiv = styled('div', {
  display: 'inline-flex',
  paddingRight: '16px',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const TextDiv = styled('div', {
  display: 'inline-flex',
  padding: '16px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '4px',

  width: '255px',

  borderRadius: '10px',
  backgroundColor: '$gray600',

  color: '$gray50',
});

const TextStyle = styled('p', {
  ...fontsObject.LABEL_4_12_SB,
  letterSpacing: '-0.24px',
});
