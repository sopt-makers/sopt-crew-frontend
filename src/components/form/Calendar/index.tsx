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
import CalendarMobileIcon from '@assets/svg/calendar_small.svg';
import { useFormContext } from 'react-hook-form';

interface Props {
  selectedDate: string[] | null;
  setSelectedDate: Dispatch<SetStateAction<string[] | null>>;
  error?: string;
  type?: 'start' | 'end';
}

const CalendarInputForm = ({ selectedDate, setSelectedDate, error, type }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getValues, setValue } = useFormContext();

  const handleDateChange = (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY.MM.DD');

    const currentDates = getValues('detail.mStartDate') ?? [];
    const [start, end] = Array.isArray(currentDates) ? currentDates : ['', ''];

    // prev 의미와 같음. 이전에 선택된 날짜
    if (currentDates.length === 0) {
      setSelectedDate([formattedDate, '']);
    }

    // start 만 선택된 상태, end 을 누르지 않은 상태, 에서 신규날짜를 누를 때
    if (start && !end) {
      setSelectedDate([start, formattedDate]);
    }
    // start 만 선택 된 상태, 신규날짜가 start 보다 이전일 때
    if (start && formattedDate < start) {
      setSelectedDate([formattedDate, '']);
    }

    // end 만 선택된 상태, 신규날짜가 end 보다 이후일 때
    if (end && formattedDate > end) {
      setSelectedDate(['', formattedDate]);
    }
    // end 만 선택된 상태, start 를 누르지 않은 상태, 에서 신규날짜를 누를 때
    if (!start && end) {
      setSelectedDate([formattedDate, end]);
    }

    // start 와 end 가 모두 선택된 상태에서
    if (start && end) {
      // start 와 end 사이를 눌렀을 때
      if (formattedDate > start && formattedDate < end) {
        // 근데 캘린더 type 이 start 일 때
        if (type === 'start') {
          setSelectedDate([formattedDate, end]);
        } else {
          setSelectedDate([start, formattedDate]);
        }
      }
      // start 보다 이전을 눌렀을 때
      if (formattedDate < start) {
        setSelectedDate([formattedDate, end]);
      }
      // end 보다 이후를 눌렀을 때
      if (formattedDate > end) {
        setSelectedDate([start, formattedDate]);
      }
    }
  };

  const CalendarComponent = () => {
    return (
      <>
        <Calendar
          value={
            selectedDate && selectedDate.length === 2
              ? [dayjs(selectedDate[0], 'YYYY.MM.DD').toDate(), dayjs(selectedDate[1], 'YYYY.MM.DD').toDate()]
              : null
          }
          selectRange={true}
          onClickDay={handleDateChange}
          formatDay={(locale, date) => dayjs(date).format('D')}
          formatShortWeekday={(locale, date) => ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()] ?? ''}
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="month"
          maxDetail="month"
          calendarType="US"
          tileContent={({ date, view }) => {
            if (selectedDate?.includes(dayjs(date).format('YYYY.MM.DD'))) {
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
            <SInput value={type === 'start' ? selectedDate?.[0] : selectedDate?.[1]} placeholder="YYYY.MM.DD" />
            {isMobile ? <CalendarMobileIcon /> : <CalendarIcon />}
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
            <SInput value={type === 'start' ? selectedDate?.[0] : selectedDate?.[1]} placeholder="YYYY.MM.DD" />
            <SCalendarIcon />
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
  '& > react-calendar__tile--range': {},
});

const SInputWrapper = styled('div', {
  display: 'flex',
  width: '100%',
  padding: '18px 20px',
  color: '$gray10',
  background: '$gray800',
  borderRadius: 10,
  justifyContent: 'space-between',
  cursor: 'pointer',

  '@media (max-width: 768px)': {
    padding: '16px',
  },
});

const SCalendarIcon = styled(CalendarIcon, {
  width: '24px',
  height: '24px',

  '@media (max-width: 430px)': {
    width: '20px',
    height: '20px',
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
    '@media (max-width: 768px)': {
      ...fontsObject.LABEL_5_11_SB,
    },
  },
});
