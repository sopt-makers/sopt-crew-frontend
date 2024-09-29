import { Dispatch, SetStateAction, useEffect, useRef, useCallback, useState } from 'react';
import { styled } from 'stitches.config';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import ErrorMessage from '../ErrorMessage';
import { useDisplay } from '@hooks/useDisplay';
import BottomSheetDialog from '../Select/BottomSheetSelect/BottomSheetDialog';
import { fontsObject } from '@sopt-makers/fonts';
import CalendarIcon from '@assets/svg/calendar_big.svg';
interface Props {
  selectedDate: string | null;
  setSelectedDate: Dispatch<SetStateAction<string | null>>;
  error?: string;
}

const CalendarInputForm = ({ selectedDate, setSelectedDate, error }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const CalendarComponent = () => {
    return (
      <>
        <Calendar
          value={selectedDate ? dayjs(selectedDate, 'YYYY-MM-DD').toDate() : null}
          onClickDay={date => setSelectedDate(dayjs(date).format('YYYY.MM.DD'))}
          formatDay={(locale, date) => dayjs(date).format('D')}
          formatShortWeekday={(locale, date) => ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()]}
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="month"
          maxDetail="month"
          tileContent={({ date, view }) => {
            if (selectedDate == dayjs(date).format('YYYY.MM.DD')) {
              return (
                <SDotWrapper>
                  <SDot></SDot>
                </SDotWrapper>
              );
            }
          }}
        />
        {error && <SErrorMessage>{error}</SErrorMessage>}
      </>
    );
  };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isDesktop, isMobile, isTablet } = useDisplay();

  const handleOutsideClick = useCallback((event: any) => {
    if (!containerRef.current || !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isDesktop && !isMobile && !isTablet) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isDesktop, containerRef, setIsOpen, handleOutsideClick]);

  return (
    <>
      {!isDesktop && (isMobile || isTablet) ? (
        <>
          <SInputWrapper onClick={() => setIsOpen(true)}>
            <SInput value={selectedDate as string | number | readonly string[] | undefined} placeholder="YYYY.MM.DD" />
            <CalendarIcon />
          </SInputWrapper>
          {isOpen && (
            <div>
              <BottomSheetDialog label={''} handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                <CalendarComponent />
              </BottomSheetDialog>
            </div>
          )}
        </>
      ) : (
        <>
          <SInputWrapper onClick={() => setIsOpen(true)}>
            <SInput value={selectedDate as string | number | readonly string[] | undefined} placeholder="YYYY.MM.DD" />
            <CalendarIcon />
          </SInputWrapper>
          {isOpen && (
            <SCalendarWrapper ref={containerRef}>
              <CalendarComponent />
            </SCalendarWrapper>
          )}
        </>
      )}
    </>
  );
};

export default CalendarInputForm;

const SCalendarWrapper = styled('div', {
  backgroundColor: '$gray700',
  padding: '10px',
  width: '320px',
  borderRadius: '16px',
  position: 'absolute',
  zIndex: '9999',
  marginTop: '10px',
});

const SErrorMessage = styled(ErrorMessage, {
  marginTop: '12px',
});

const SDotWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'absolute',
  alignItems: 'center',
});

const SInputWrapper = styled('div', {
  display: 'flex',
  width: '100%',
  padding: '18px 20px',
  color: '$gray10',
  background: '$gray700',
  borderRadius: 10,
  justifyContent: 'space-between',
  cursor: 'pointer',

  '@tablet': {
    padding: '16px',
  },
});

const SDot = styled('div', {
  height: '5px',
  width: '5px',
  backgroundColor: '$gray400',
  borderRadius: '50%',
  position: 'absolute',
  top: '22px',
  display: 'flex',
});

const SInput = styled('input', {
  width: '80%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  ...fontsObject.BODY_2_16_M,
  color: '$gray10',
  caretColor: '$transparent',
  '&::placeholder': {
    color: '$gray500',
    '@tablet': {
      ...fontsObject.LABEL_5_11_SB,
    },
  },
});
