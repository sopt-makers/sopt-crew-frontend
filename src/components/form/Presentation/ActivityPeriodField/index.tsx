import BubblePointIcon from '@assets/svg/bubble_point.svg';
import CalendarInputForm from '@components/form/Calendar';
import FormController from '@components/form/FormController';
import Label from '@components/form/Label';
import { fontsObject } from '@sopt-makers/fonts';
import { IconAlertCircle } from '@sopt-makers/icons';
import { DialogOptionType, useDialog } from '@sopt-makers/ui';
import { useEffect, useRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
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

const soptScheduledialogOption: DialogOptionType = {
  title: 'SOPT 공식 일정',
  description: schedule,
  type: 'default',
};

const ActivityPeriodField = () => {
  const [isSoptScheduleOpen, setIsSoptScheduleOpen] = useState(false);
  const soptScheduleRef = useRef<HTMLDivElement | null>(null);
  const { open } = useDialog();

  const handleSoptScheduleOpen = (isOpen: boolean) => {
    window.innerWidth <= 768 ? open(soptScheduledialogOption) : setIsSoptScheduleOpen(isOpen);
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Label required={true} size="small">
          활동 기간
        </Label>
        <div
          ref={soptScheduleRef}
          style={{ display: 'flex', gap: '4px', position: 'relative' }}
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
                <TextStyle>• 1~8차 세미나: 2025.04.05 ~ 2025.06.21</TextStyle>
                <TextStyle>• 솝커톤: 2025.05.17 ~ 2025.05.18</TextStyle>
                <TextStyle>• 네트워킹 행사: 2025.05.31</TextStyle>
                <TextStyle>• 기획 경선: 2025.06.07</TextStyle>
                <TextStyle>• 앱잼: 2025.06.14 ~ 2025.07.19</TextStyle>
                <TextStyle>• 종무식: 2025.07.26</TextStyle>
              </TextDiv>
            </ToolTipDiv>
          )}
        </div>
      </div>
      <SApplicationFieldWrapper>
        <SApplicationField>
          <FormController
            name="detail.mDateRange"
            render={({ field, formState: { errors } }) => {
              const dateError = errors.detail as
                | (FieldError & {
                    mDateRange?: FieldError[];
                  })
                | undefined;
              return (
                <CalendarInputForm
                  selectedDate={field.value}
                  setSelectedDate={field.onChange}
                  selectedDateFieldName={field.name}
                  error={
                    (dateError?.mDateRange as FieldError[])?.[0]?.message ||
                    (dateError?.mDateRange as FieldError[])?.[1]?.message
                  }
                  dateType="startDate"
                />
              );
            }}
          ></FormController>
        </SApplicationField>
        <span style={{ marginTop: '14px' }}>-</span>
        <SApplicationField>
          <FormController
            name="detail.mDateRange"
            render={({ field, formState: { errors } }) => {
              const dateError = errors.detail as
                | (FieldError & {
                    mDateRange?: FieldError[];
                  })
                | undefined;

              return (
                <CalendarInputForm
                  selectedDate={field.value}
                  setSelectedDate={field.onChange}
                  dateType="endDate"
                  error={
                    (dateError?.mDateRange as FieldError[])?.[0]?.message ||
                    (dateError?.mDateRange as FieldError[])?.[1]?.message
                  }
                  selectedDateFieldName={field.name}
                />
              );
            }}
          ></FormController>
        </SApplicationField>
      </SApplicationFieldWrapper>
    </div>
  );
};

export default ActivityPeriodField;

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

const SApplicationFieldWrapper = styled('div', {
  display: 'flex',
  color: '$gray500',
  gap: '12px',
});

const SApplicationField = styled('div', {
  width: '100%',
  maxWidth: '205px',

  '@media (max-width: 768px)': {
    maxWidth: '151px',
  },
});
